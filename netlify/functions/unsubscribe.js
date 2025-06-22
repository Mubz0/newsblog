exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    }
  }

  try {
    const { email } = JSON.parse(event.body)

    if (!email || !email.includes('@')) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Valid email is required' }),
      }
    }

    // In production, you would:
    // 1. Update database to mark user as unsubscribed
    // 2. Remove from Resend contact list
    // 3. Send confirmation email

    // For now, just return success
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'You have been unsubscribed successfully',
        email 
      }),
    }
  } catch (error) {
    console.error('Unsubscribe error:', error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process unsubscribe request' }),
    }
  }
}