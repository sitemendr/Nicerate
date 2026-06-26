# Nicerate — Electronics Store
 b nb
A clean, modern electronics store built with Next.js + Supabase. No backend to manage. Orders via WhatsApp and Email.

---

## 🚀 Quick Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Set up Supabase
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to **SQL Editor** and run the contents of `supabase-setup.sql`
4. Go to **Project Settings → API** and copy your:
   - Project URL
   - Anon/public key

### 3. Set environment variables
Copy `.env.local.example` to `.env.local` and fill in:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_WHATSAPP_NUMBER=254700000000   # no + sign
NEXT_PUBLIC_STORE_EMAIL=info@nicerate.com
NEXT_PUBLIC_PRODUCT_LIMIT=20
NEXT_PUBLIC_ADMIN_PASSWORD=your_password
```

### 4. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 5. Deploy to Vercel
1. Push to GitHub
2. Import project on [vercel.com](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Point the client's domain to Vercel

---

## 📄 Pages
| Page | Route |
|------|-------|
| Home | `/` |
| Products | `/products` |
| About | `/about` |
| Contact | `/contact` |
| Admin Panel | `/admin` |

---

## 🛠 Admin Panel
Go to `/admin` → enter your admin password → manage products.

- Add products with name, price, category, image URL, description
- Mark products as **featured** (shows on homepage)
- Edit or delete products
- Product limit enforced (default: 20)

---

## 🔁 Reusing for Other Clients
1. Clone/copy this project
2. Create a new Supabase project for the new client
3. Update `.env.local` with new client details
4. Update store name in `app/layout.js` and `components/Navbar.js`
5. Update colors in `tailwind.config.js` and `app/globals.css`
6. Deploy to Vercel under a new project

---

## 🎨 Brand Colors (Nicerate)
- Background: `#000000`
- Primary Green: `#006B35`
- Text: `#ffffff`
- Muted: `#a0a0a0`
- Cards: `#111111`
