# Deployment Guide for Scylax Newsletter

This guide explains how to deploy the Scylax Newsletter to Netlify at newsletter.scylax.ai.

## Prerequisites

1. Netlify account
2. Access to Scylax.ai domain DNS settings
3. Resend API key for production emails

## Step 1: Environment Variables

Create these environment variables in Netlify:

```
RESEND_API_KEY=your_production_resend_api_key
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://newsletter.scylax.ai
```

## Step 2: Deploy to Netlify

### Option A: Git-based deployment

1. Push your code to GitHub/GitLab/Bitbucket
2. In Netlify, click "New site from Git"
3. Connect your repository
4. Build settings:
   - Build command: `npm run build`
   - Publish directory: `out`
5. Deploy site

### Option B: Manual deployment

1. Build locally:
   ```bash
   npm run build
   ```
2. Drag the `out` folder to Netlify

## Step 3: Configure Subdomain

### In Netlify:

1. Go to Site settings > Domain management
2. Add custom domain: `newsletter.scylax.ai`
3. Netlify will provide DNS records

### In your DNS provider:

Add a CNAME record:
```
Type: CNAME
Name: newsletter
Value: [your-netlify-site].netlify.app
TTL: 3600
```

## Step 4: Set up Netlify Functions

Since API routes don't work with static export, create Netlify Functions:

1. Already created in `/netlify/functions/`
2. Functions will automatically deploy with your site
3. Update frontend to use function endpoints:
   - Development: `http://localhost:3000/api/subscribe`
   - Production: `https://newsletter.scylax.ai/.netlify/functions/subscribe`

## Step 5: Database Setup

For production, set up a proper database:

### Option 1: Supabase (Recommended)
1. Create a Supabase project
2. Create subscribers table:
   ```sql
   CREATE TABLE subscribers (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     email TEXT UNIQUE NOT NULL,
     subscribed_at TIMESTAMP DEFAULT NOW(),
     unsubscribed_at TIMESTAMP
   );
   ```
3. Add Supabase credentials to Netlify env vars

### Option 2: Airtable
1. Create an Airtable base
2. Add table with email field
3. Add Airtable API key to Netlify

## Step 6: Post-Deployment

1. Test subscription flow
2. Verify emails are being sent
3. Check that unsubscribe works
4. Monitor Netlify Functions logs

## Build Configuration

The `next.config.js` is already configured to:
- Use static export for production
- Skip API routes in production
- Handle MDX content

## Troubleshooting

### Build fails
- Check Node version (use 18.x or higher)
- Verify all dependencies are installed
- Check for TypeScript errors

### Functions not working
- Check function logs in Netlify
- Verify environment variables are set
- Test with Netlify CLI locally:
  ```bash
  npm install -g netlify-cli
  netlify dev
  ```

### Domain not working
- Wait for DNS propagation (up to 48 hours)
- Verify CNAME record is correct
- Check SSL certificate in Netlify

## Security Checklist

- [ ] Environment variables set in Netlify (not in code)
- [ ] CORS configured for your domain only
- [ ] Rate limiting on subscription endpoint
- [ ] Email validation on server side
- [ ] HTTPS enabled (automatic with Netlify)
- [ ] Content Security Policy headers configured

## Maintenance

- Monitor Netlify Analytics for traffic
- Check Function logs for errors
- Keep dependencies updated
- Regular security audits