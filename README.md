<div align="center">
  <h1 align="center">DocumentWave</h1>
  <h3>The intelligent document sharing platform.</h3>
</div>

<div align="center">
  <a href="https://www.documentwave.app">documentwave.app</a>
</div>

<br/>

<div align="center">
  <a href="https://github.com/yourusername/documentwave/stargazers"><img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/yourusername/documentwave"></a>
  <a href="https://twitter.com/documentwave"><img alt="Twitter Follow" src="https://img.shields.io/twitter/follow/documentwave"></a>
  <a href="https://github.com/yourusername/documentwave/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/badge/license-AGPLv3-blue"></a>
</div>

<br/>

DocumentWave is a powerful, intelligent document-sharing platform that revolutionizes how teams collaborate and share sensitive documents. Built for modern businesses, it combines enterprise-grade security with intuitive analytics and seamless workflows.

## Features

- **🔗 Smart Document Sharing:** Create secure, trackable links with advanced permissions and access controls.
- **📊 Intelligent Analytics:** Deep insights into document engagement, viewer behavior, and performance metrics.
- **🎨 Custom Branding:** Complete white-label experience with custom domains, logos, and brand colors.
- **🏢 Enterprise Data Rooms:** Secure virtual data rooms for due diligence, M&A, and sensitive document sharing.
- **🔒 Advanced Security:** Email verification, password protection, dynamic watermarks, and NDA agreements.
- **👥 Team Collaboration:** Multi-user workspaces with granular role-based permissions and access controls.
- **🚀 Self-hosted & Open-source:** Full control over your data with enterprise-grade hosting options.

## Demo

![DocumentWave Welcome GIF](.github/images/documentwave-welcome.gif)

## Tech Stack

- [Next.js](https://nextjs.org/) – Framework
- [TypeScript](https://www.typescriptlang.org/) – Language
- [Tailwind](https://tailwindcss.com/) – CSS
- [shadcn/ui](https://ui.shadcn.com) - UI Components
- [Prisma](https://prisma.io) - ORM [![Made with Prisma](https://made-with.prisma.io/dark.svg)](https://prisma.io)
- [PostgreSQL](https://www.postgresql.org/) - Database
- [NextAuth.js](https://next-auth.js.org/) – Authentication
- [Tinybird](https://tinybird.co) – Analytics
- [Resend](https://resend.com) – Email
- [Stripe](https://stripe.com) – Payments
- [Vercel](https://vercel.com/) – Hosting

## Getting Started

### Prerequisites

Here's what you need to run DocumentWave:

- Node.js (version >= 18.17.0)
- PostgreSQL Database
- Blob storage (currently [AWS S3](https://aws.amazon.com/s3/) or [Vercel Blob](https://vercel.com/storage/blob))
- [Resend](https://resend.com) (for sending emails)

### 1. Clone the repository

```shell
git clone https://github.com/yourusername/documentwave.git
cd documentwave
```

### 2. Install npm dependencies

```shell
npm install
```

### 3. Copy the environment variables to `.env` and change the values

```shell
cp .env.example .env
```

### 4. Initialize the database

```shell
npm run dev:prisma
```

### 5. Run the dev server

```shell
npm run dev
```

### 6. Open the app in your browser

Visit [http://localhost:3000](http://localhost:3000) in your browser.

## Tinybird Instructions

To prepare the Tinybird database, follow these steps:

0. We use `pipenv` to manage our Python dependencies. If you don't have it installed, you can install it using the following command:
   ```sh
   pkgx pipenv
   ```
1. Download the Tinybird CLI from [here](https://www.tinybird.co/docs/cli.html) and install it on your system.
2. After authenticating with the Tinybird CLI, navigate to the `lib/tinybird` directory:
   ```sh
   cd lib/tinybird
   ```
3. Push the necessary data sources using the following command:
   ```sh
   tb push datasources/*
   tb push endpoints/get_*
   ```
4. Don't forget to set the `TINYBIRD_TOKEN` with the appropriate rights in your `.env` file.

#### Updating Tinybird

```sh
pipenv shell
## start: pkgx-specific
cd ..
cd documentwave
## end: pkgx-specific
pipenv update tinybird-cli
```

## Contributing

DocumentWave is an open-source project, and we welcome contributions from the community.

If you'd like to contribute, please fork the repository and make any changes you'd like. Pull requests are warmly welcome.

## Attribution

DocumentWave is built upon the solid foundation of [Papermark](https://github.com/mfts/papermark), an excellent open-source DocSend alternative. We extend our gratitude to the original creators and contributors for their innovative work.

### Our Contributors ✨

<a href="https://github.com/mfts/papermark/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=mfts/papermark" />
</a>
