/**
 * Cloudflare Turnstile verification utilities
 */

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

/**
 * Verify a Turnstile token with Cloudflare's API
 */
export async function verifyTurnstile(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // Skip verification in development if no secret key is set
  if (!secretKey) {
    console.warn('TURNSTILE_SECRET_KEY not set, skipping verification');
    return true;
  }

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

/**
 * Middleware helper to require Turnstile verification
 * Returns an error object if verification fails, null if successful
 */
export async function requireTurnstile(
  turnstileToken: string | undefined
): Promise<{ error: string; status: 400 } | null> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // Skip verification in development if no secret key is set
  if (!secretKey) {
    return null;
  }

  if (!turnstileToken) {
    return { error: 'Please complete the verification', status: 400 };
  }

  const isValid = await verifyTurnstile(turnstileToken);
  if (!isValid) {
    return { error: 'Verification failed. Please try again.', status: 400 };
  }

  return null;
}
