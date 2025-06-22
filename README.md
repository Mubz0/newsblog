# Scylax AI Newsletter

A Substack-like newsletter platform built with Next.js, deployed on Netlify, and powered by Resend for email delivery.

## Features

- 📝 MDX-powered blog posts
- 📧 Email newsletter signup with Resend integration
- 📱 Responsive design similar to Substack
- 🚀 Static site generation for optimal performance
- 🔒 Subscriber management system
- 📊 Archive page for all posts

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Add environment variables:**
   Create a `.env.local` file:
   ```
   RESEND_API_KEY=your_resend_api_key_here
   ```

3. **Development:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm run export
   ```

## Deployment

### Netlify Setup

1. Connect your repository to Netlify
2. Set build command: `npm run build && npm run export`
3. Set publish directory: `out`
4. Add environment variable: `RESEND_API_KEY`

### Custom Domain

To set up newsletter.scylax.ai:

1. In Netlify dashboard, go to Domain settings
2. Add custom domain: `newsletter.scylax.ai`
3. Configure DNS with your domain provider:
   - Type: CNAME
   - Name: newsletter
   - Value: your-netlify-site.netlify.app

## Content Management

### Adding New Posts

1. Create a new `.mdx` file in `content/posts/`
2. Add frontmatter:
   ```yaml
   ---
   title: "Your Post Title"
   excerpt: "Brief description of the post"
   date: "2024-01-15"
   ---
   ```
3. Write your content in MDX format

### Email Integration

The newsletter signup form automatically:
- Validates email addresses
- Stores subscribers in `data/subscribers.json`
- Sends welcome emails via Resend
- Handles unsubscribe requests

## Project Structure

```
├── components/          # React components
├── content/posts/       # MDX blog posts
├── lib/                # Utility functions
├── pages/              # Next.js pages
├── styles/             # CSS styles
├── data/               # Subscriber data (auto-created)
└── netlify.toml        # Netlify configuration
```

## Environment Variables

- `RESEND_API_KEY`: Your Resend API key for email delivery
- `NODE_ENV`: Environment (development/production)

## License

MIT License