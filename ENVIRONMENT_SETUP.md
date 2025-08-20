# DocumentWave Environment Setup

## Required Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# ============================================
# DOCUMENTWAVE ENVIRONMENT VARIABLES
# ============================================

# ============================================
# CORE APPLICATION (REQUIRED)
# ============================================

# Next.js Environment
NODE_ENV=development
NEXT_PUBLIC_VERCEL_ENV=development

# Domain URLs
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_MARKETING_URL=http://localhost:3000

# NextAuth Secret (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=your-super-secret-nextauth-secret-here

# ============================================
# DATABASE (REQUIRED)
# ============================================

# PostgreSQL Database URL
DATABASE_URL=postgresql://username:password@localhost:5432/documentwave?schema=public

# ============================================
# AUTHENTICATION PROVIDERS (REQUIRED)
# ============================================

# Google OAuth (Get from: https://console.developers.google.com/)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# LinkedIn OAuth (Get from: https://www.linkedin.com/developers/)
LINKEDIN_CLIENT_ID=your-linkedin-client-id
LINKEDIN_CLIENT_SECRET=your-linkedin-client-secret

# Hanko Passkeys (Get from: https://cloud.hanko.io/)
HANKO_API_KEY=your-hanko-api-key
NEXT_PUBLIC_HANKO_TENANT_ID=your-hanko-tenant-id

# ============================================
# EMAIL SERVICE (REQUIRED)
# ============================================

# Resend API (Get from: https://resend.com/api-keys)
RESEND_API_KEY=re_your-resend-api-key

# ============================================
# FILE STORAGE (REQUIRED - Choose One)
# ============================================

# Option 1: AWS S3 Configuration (EU Region - Default)
NEXT_PRIVATE_UPLOAD_BUCKET=your-s3-bucket-name
NEXT_PRIVATE_UPLOAD_ACCESS_KEY_ID=your-aws-access-key-id
NEXT_PRIVATE_UPLOAD_SECRET_ACCESS_KEY=your-aws-secret-access-key
NEXT_PRIVATE_UPLOAD_REGION=eu-central-1

# Option 2: Vercel Blob Storage (Alternative)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_your-token

# ============================================
# ANALYTICS (OPTIONAL BUT RECOMMENDED)
# ============================================

# Tinybird Analytics (Get from: https://www.tinybird.co/)
TINYBIRD_TOKEN=p.your-tinybird-token

# ============================================
# PAYMENTS (OPTIONAL - FOR MONETIZATION)
# ============================================

# Stripe Configuration (Get from: https://dashboard.stripe.com/)
STRIPE_PUBLISHABLE_KEY=pk_test_your-stripe-publishable-key
STRIPE_SECRET_KEY=sk_test_your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=whsec_your-stripe-webhook-secret

# ============================================
# OPTIONAL SERVICES
# ============================================

# OpenAI API (for AI features)
OPENAI_API_KEY=sk-your-openai-api-key

# Upstash Redis (for caching)
UPSTASH_REDIS_REST_URL=https://your-redis-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-token

# Revalidation Token (generate random string)
REVALIDATE_TOKEN=your-random-revalidation-token
```

## Quick Start Setup (Minimal)

For a quick local development setup, you need at minimum:

1. **Database**: PostgreSQL instance
2. **Authentication**: Google OAuth credentials
3. **Email**: Resend API key
4. **Storage**: Either AWS S3 or Vercel Blob
5. **Secrets**: NextAuth secret

## Service Setup Instructions

### 1. Database Setup

```bash
# Install PostgreSQL locally or use a cloud service
# Create database
createdb documentwave

# Update DATABASE_URL with your credentials
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/documentwave?schema=public
```

### 2. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

### 3. Resend Email Setup

1. Go to [Resend](https://resend.com/)
2. Sign up and get API key
3. Add your domain for production use

### 4. File Storage Setup

**Option A: Vercel Blob (Easiest)**
1. Go to [Vercel](https://vercel.com/)
2. Create project and enable Blob storage
3. Get read/write token

**Option B: AWS S3**
1. Create S3 bucket
2. Create IAM user with S3 permissions
3. Get access key and secret

### 5. Generate Secrets

```bash
# Generate NextAuth secret
openssl rand -base64 32

# Generate revalidation token
openssl rand -hex 32
```

## Optional Services Setup

### Tinybird Analytics
1. Sign up at [Tinybird](https://www.tinybird.co/)
2. Get API token
3. Set up data sources (see README.md)

### Stripe Payments
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get test keys for development
3. Set up webhooks for `/api/stripe/webhook`

### Hanko Passkeys
1. Sign up at [Hanko Cloud](https://cloud.hanko.io/)
2. Create project and get credentials

## Development Commands

```bash
# Copy this file to .env and fill in values
cp ENVIRONMENT_SETUP.md .env

# Install dependencies
npm install

# Set up database
npm run dev:prisma

# Start development server
npm run dev
```

## Production Considerations

- Use production database
- Set NODE_ENV=production
- Use production API keys
- Set up proper CORS origins
- Configure proper domain in NEXTAUTH_URL
- Set up monitoring and logging

## Troubleshooting

**Common Issues:**

1. **Database connection errors**: Check DATABASE_URL format
2. **Auth errors**: Verify OAuth redirect URIs
3. **File upload errors**: Check storage credentials
4. **Email errors**: Verify Resend API key and domain

**Debug Mode:**
```bash
DEBUG=* npm run dev
```

For more help, check the [original Papermark docs](https://github.com/mfts/papermark) or open an issue.

