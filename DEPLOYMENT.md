# Vercel Deployment Guide for Neon Vault Drops

This guide provides step-by-step instructions for deploying the Neon Vault Drops application to Vercel.

## Prerequisites

- Vercel account (free tier available)
- GitHub account with access to the repository
- Node.js installed locally (for testing)

## Step-by-Step Deployment

### 1. Prepare the Repository

Ensure your code is pushed to GitHub:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "New Project"
4. Import the `patrick55schmidt/neon-vault-drops` repository

### 3. Configure Project Settings

#### Build Settings
- **Framework Preset**: Vite
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Environment Variables
Add the following environment variables in Vercel dashboard:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

### 4. Deploy

1. Click "Deploy" button
2. Wait for the build process to complete (usually 2-3 minutes)
3. Your application will be available at the provided Vercel URL

### 5. Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed by Vercel
4. Wait for SSL certificate to be issued

## Build Configuration

### vercel.json (Optional)
Create a `vercel.json` file in the root directory for advanced configuration:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CHAIN_ID` | Ethereum chain ID (11155111 for Sepolia) | Yes |
| `NEXT_PUBLIC_RPC_URL` | RPC endpoint URL | Yes |
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID | Yes |
| `NEXT_PUBLIC_INFURA_API_KEY` | Infura API key | Yes |

## Troubleshooting

### Common Issues

1. **Build Fails**
   - Check that all dependencies are in `package.json`
   - Ensure TypeScript compilation passes locally
   - Verify environment variables are set correctly

2. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check RPC URL is accessible
   - Ensure chain ID matches your target network

3. **Asset Loading Issues**
   - Check that all assets are in the `public` directory
   - Verify file paths in components are correct
   - Ensure favicon and other static assets are properly referenced

### Build Logs

Access build logs in Vercel dashboard:
1. Go to your project
2. Click on the deployment
3. View "Build Logs" tab for detailed error information

## Performance Optimization

### Recommended Settings

1. **Enable Edge Functions** (if using Vercel Pro)
2. **Configure CDN** for static assets
3. **Enable Compression** for better loading times
4. **Set up Analytics** to monitor performance

### Bundle Analysis

To analyze bundle size:
```bash
npm run build
npx vite-bundle-analyzer dist
```

## Security Considerations

1. **Environment Variables**: Never commit sensitive keys to repository
2. **CORS**: Configure CORS settings for API calls
3. **HTTPS**: Vercel automatically provides SSL certificates
4. **Rate Limiting**: Consider implementing rate limiting for API calls

## Monitoring and Analytics

1. **Vercel Analytics**: Enable in project settings
2. **Error Tracking**: Consider integrating Sentry or similar
3. **Performance Monitoring**: Use Vercel's built-in performance insights

## Updates and Maintenance

### Automatic Deployments
- Vercel automatically deploys on every push to main branch
- Preview deployments are created for pull requests

### Manual Deployments
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from local directory
vercel

# Deploy to production
vercel --prod
```

## Support

For deployment issues:
1. Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
2. Review build logs in Vercel dashboard
3. Test build locally: `npm run build && npm run preview`

## Post-Deployment Checklist

- [ ] Application loads correctly
- [ ] Wallet connection works
- [ ] All pages are accessible
- [ ] Environment variables are set
- [ ] Custom domain is configured (if applicable)
- [ ] SSL certificate is active
- [ ] Analytics are working
- [ ] Performance is acceptable
