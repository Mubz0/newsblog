# 🛠️ AI Security Blog + Newsletter Setup (Next.js + Netlify + Resend)

This guide walks you through creating a professional blog and newsletter workflow using your existing stack: **Next.js** (for frontend and SSR), **Netlify** (for hosting and serverless functions), and **Resend** (for email delivery).

---

## ✅ Overview

| Feature             | Stack / Tool         |
|---------------------|----------------------|
| Blog content        | MDX or Markdown in Next.js |
| Hosting             | Netlify (static + serverless) |
| Email signup        | Custom React form + API route |
| Email delivery      | Resend (https://resend.com) |
| Newsletter content  | Same as blog posts, or custom emails |
| Domain              | Custom domain/subdomain via Netlify |
| Optional CMS        | Sanity, Contentlayer, or Markdown + Git |

---

## 1. ✍️ Create Blog with MDX

Install MDX support:

```bash
npm install @next/mdx @mdx-js/loader