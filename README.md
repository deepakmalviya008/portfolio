# Deepak Malviya Portfolio

A dynamic, multi-persona portfolio website built with Next.js 14, featuring a custom CMS for content management.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: PostgreSQL (Supabase)
- **ORM**: Prisma
- **Authentication**: Clerk
- **Media Storage**: Cloudinary
- **Hosting**: Vercel
- **Animations**: Framer Motion

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel routes
│   ├── api/               # API routes
│   ├── personas/          # Persona pages
│   └── ...
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── layout/           # Header, Footer, etc.
│   ├── home/             # Homepage components
│   └── personas/         # Persona-specific components
├── lib/                   # Utilities and configurations
├── hooks/                # Custom React hooks
└── types/                # TypeScript types
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn
- Git

### 1. Clone & Install

```bash
git clone https://github.com/deepakmalviya008/portfolio.git
cd portfolio
npm install
```

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL` - Supabase PostgreSQL connection string
- `DIRECT_URL` - Supabase direct connection string
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` - Clerk publishable key
- `CLERK_SECRET_KEY` - Clerk secret key
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Cloudinary API key
- `CLOUDINARY_API_SECRET` - Cloudinary API secret

### 3. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed initial data
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment to Vercel

### Option 1: Vercel CLI

```bash
npm i -g vercel
vercel
```

### Option 2: GitHub Integration

1. Push code to GitHub
2. Import project in Vercel Dashboard
3. Add environment variables
4. Deploy

### Domain Setup

1. In Vercel Dashboard → Project Settings → Domains
2. Add `deepakmalviya.com`
3. Configure DNS in GoDaddy:
   - Type: A, Name: @, Value: 76.76.21.21
   - Type: CNAME, Name: www, Value: cname.vercel-dns.com

## 📝 Content Management

Access admin panel at `/admin` (requires authentication)

### Adding Content
1. Sign in with your email
2. Navigate to Content → Add New
3. Select content type (Blog, Project, Poem, Recipe, Travel)
4. Fill in details and publish

### Managing Personas
1. Go to Admin → Personas
2. Edit existing or add new personas
3. Configure SEO settings

## 🎨 Customization

### Colors
Edit `tailwind.config.ts` to change:
- Primary color (currently Teal)
- Persona-specific colors
- Dark mode colors

### Content
All content is stored in the database and managed through the admin panel.

## 📄 License

MIT License - feel free to use for your own portfolio!

---

Built with ❤️ by Deepak Malviya
