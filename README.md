# Scylax AI Newsletter

A Substack-like newsletter platform built with Next.js, deployed on Azure Container Apps, and powered by Resend for email delivery.

## Features

- 📝 MDX-powered blog posts
- 📧 Email newsletter signup with SendGrid integration
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
   SENDGRID_API_KEY=your_sendgrid_api_key_here
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

### Azure Container Apps

Deployed via GitHub Actions to Azure Container Apps.

- **Container Registry:** `agentboxacr.azurecr.io`
- **Image:** `scylax-newsletter`
- **Resource Group:** `agentbox-rg`

Push to `main` branch triggers automatic build and deployment.

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
- Sends welcome emails via SendGrid
- Handles unsubscribe requests

## Project Structure

```
├── components/          # React components
├── content/posts/       # MDX blog posts
├── lib/                # Utility functions
├── pages/              # Next.js pages
├── styles/             # CSS styles
├── data/               # Subscriber data (auto-created)
└── Dockerfile          # Container configuration
```

## Environment Variables

- `SENDGRID_API_KEY`: Your SendGrid API key for email delivery
- `NODE_ENV`: Environment (development/production)

## License

MIT License