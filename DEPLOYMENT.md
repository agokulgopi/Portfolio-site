# Deployment Guide - Portfolio Website

This guide will help you deploy your portfolio website to **Netlify** or **Vercel** with a custom domain.

## 🚀 Quick Start

Both platforms offer free hosting with:
- ✅ Free SSL certificates
- ✅ Custom domain support
- ✅ Automatic deployments from Git
- ✅ CDN (Content Delivery Network)
- ✅ Generous free tier

---

## Option 1: Deploy to Netlify

### Step 1: Prepare Your Code
1. Make sure all your changes are committed to Git
2. Push your code to GitHub, GitLab, or Bitbucket

### Step 2: Deploy to Netlify
1. Go to [netlify.com](https://www.netlify.com) and sign up/login (free)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your Git provider (GitHub/GitLab/Bitbucket)
4. Select your repository
5. Netlify will auto-detect:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. Click **"Deploy site"**

### Step 3: Add Custom Domain
1. In your Netlify dashboard, go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `yourname.com` or `www.yourname.com`)
4. Follow Netlify's instructions to update your DNS records:
   - **Option A (Recommended):** Use Netlify DNS
     - Change your domain's nameservers to Netlify's
   - **Option B:** Keep your current DNS provider
     - Add an A record pointing to Netlify's IP
     - Or add a CNAME record pointing to your Netlify site URL

### Step 4: SSL Certificate
- Netlify automatically provisions free SSL certificates (HTTPS)
- Usually takes 1-5 minutes after DNS is configured

---

## Option 2: Deploy to Vercel

### Step 1: Prepare Your Code
1. Make sure all your changes are committed to Git
2. Push your code to GitHub, GitLab, or Bitbucket

### Step 2: Deploy to Vercel
1. Go to [vercel.com](https://www.vercel.com) and sign up/login (free)
2. Click **"Add New Project"**
3. Import your Git repository
4. Vercel will auto-detect Vite settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **"Deploy"**

### Step 3: Add Custom Domain
1. In your Vercel project dashboard, go to **Settings** → **Domains**
2. Enter your domain name
3. Follow Vercel's DNS configuration instructions:
   - **Option A:** Use Vercel DNS (change nameservers)
   - **Option B:** Add DNS records to your current provider:
     - Add an A record or CNAME as instructed

### Step 4: SSL Certificate
- Vercel automatically provides free SSL certificates
- Usually takes a few minutes after DNS is configured

---

## 📝 Domain Setup Details

### If you DON'T have a domain yet:
1. **Buy a domain** from:
   - [Namecheap](https://www.namecheap.com) (~$10-15/year)
   - [Google Domains](https://domains.google) (~$12/year)
   - [Cloudflare](https://www.cloudflare.com/products/registrar) (~$8-10/year)
   - [GoDaddy](https://www.godaddy.com) (~$12-15/year)

2. After purchasing, follow the domain setup steps above

### DNS Record Types Explained:
- **A Record:** Points to an IP address (Netlify/Vercel will provide this)
- **CNAME Record:** Points to another domain name (easier, recommended)
- **Nameservers:** Delegates DNS management to Netlify/Vercel (easiest)

---

## 🔄 Continuous Deployment

Both platforms automatically deploy when you push to your repository:
- Push to `main`/`master` branch → Production deployment
- Create a pull request → Preview deployment

---

## 🎯 Which Platform to Choose?

### Choose **Netlify** if:
- You want more control over build settings
- You prefer their dashboard interface
- You need form handling (Netlify Forms)

### Choose **Vercel** if:
- You want faster deployments
- You prefer a simpler interface
- You're already using Next.js or other Vercel-optimized frameworks

**Both are excellent choices!** For a Vite React app, both work perfectly.

---

## 🐛 Troubleshooting

### Build fails:
- Check the build logs in your platform's dashboard
- Make sure `npm run build` works locally
- Verify all dependencies are in `package.json`

### Domain not working:
- Wait 24-48 hours for DNS propagation
- Check DNS records are correct (use [whatsmydns.net](https://www.whatsmydns.net))
- Clear browser cache
- Try accessing via HTTPS

### Images not loading:
- Make sure images in `/public` folder are committed to Git
- Check image paths are correct (should start with `/`)

---

## 📚 Additional Resources

- [Netlify Documentation](https://docs.netlify.com)
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

## ✅ Pre-Deployment Checklist

- [ ] Code is committed and pushed to Git
- [ ] `npm run build` works locally
- [ ] All images are in the `public` folder
- [ ] No hardcoded localhost URLs
- [ ] Test the preview build before going live

Good luck with your deployment! 🎉

