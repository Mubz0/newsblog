'use client';

import { Turnstile as TurnstileWidget } from '@marsidev/react-turnstile';

interface TurnstileProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  className?: string;
}

export default function Turnstile({ onVerify, onError, onExpire, className }: TurnstileProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  // In development without site key, auto-verify for testing
  if (!siteKey) {
    console.warn('NEXT_PUBLIC_TURNSTILE_SITE_KEY not set, Turnstile widget disabled');
    // Auto-verify in dev mode
    if (typeof window !== 'undefined') {
      setTimeout(() => onVerify('dev-mode-token'), 100);
    }
    return null;
  }

  return (
    <div className={className}>
      <TurnstileWidget
        siteKey={siteKey}
        onSuccess={onVerify}
        onError={() => {
          onError?.();
        }}
        onExpire={() => {
          onExpire?.();
        }}
        options={{
          theme: 'dark',
          size: 'normal',
        }}
      />
    </div>
  );
}
