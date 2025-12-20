# 🌿 SukhSanchaar
### *Bringing Ancient Ayurvedic Wisdom to the Modern World*

SukhSanchaar is a premium Ayurvedic e-commerce platform designed to bridge the gap between traditional heritage and modern convenience. Experience the essence of wellness through a seamless shopping journey, backed by robust technology.

---

## 🎨 Aesthetic & Vision
The platform is crafted with a "Modern Heritage" design system, utilizing a palette of **Aged Paper**, **Vintage Beige**, and **Ayurveda Textures** to evoke a sense of trust and tranquility.

---

## 🚀 Key Features

- **🌿 Heritage Catalog**: A curated selection of Ayurvedic products with a seamless browsing experience.
- **🧾 Professional Invoices**: Amazon India-style PDF tax invoices generated instantly for orders (powered by `jsPDF`).
- **💳 Secure Payments**: Integrated with **Razorpay** for a safe and smooth checkout experience.
- **🛡️ Admin Suite**: A dedicated dashboard for managing products, tracking orders, and overseeing the ecosystem.
- **📧 Automated Communication**: Setup for transactional emails via SendGrid and Gmail.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: Radix UI + Lucide Icons
- **PDF Generation**: jsPDF & jspdf-autotable

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) + [Express](https://expressjs.com/)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Payments**: [Razorpay](https://razorpay.com/)
- **Email**: [SendGrid](https://sendgrid.com/) / [Nodemailer](https://nodemailer.com/)
- **Validation**: Joi
- **Security**: Helmet, Express-rate-limit

---

## 📂 Project Structure

```text
.
├── client/                 # React frontend (Vite)
│   ├── src/components/     # Reusable UI components
│   ├── src/pages/          # Application views (Home, Admin, Products)
│   └── src/utils/          # Helpers (Invoice generation logic)
├── server/                 # Node.js backend
│   ├── src/index.ts        # API entry point
│   └── src/routes/         # Endpoint definitions
├── package.json            # Workspace configuration
└── DOCUMENTS/              # Setup guides & summaries
```

---

## 🏁 Getting Started

### Prerequisites
- Node.js >= 18.0.0
- npm >= 8.0.0

### Installation
1. Clone the repository.
2. Run the master install:
   ```bash
   npm run install:all
   ```
3. Set up environment variables in both `client/.env` and `server/.env` (Refer to `env.example` in each directory).

### Development
Start both client and server concurrently:
```bash
npm run dev
```

---

## 📖 Documentation
Detailed guides are available for various modules:
- [🚀 Deployment Guide](file:///Users/saar/dev/Freelance/SukhSanchaar/DEPLOYMENT_GUIDE.md)
- [💳 Razorpay Setup](file:///Users/saar/dev/Freelance/SukhSanchaar/RAZORPAY_SETUP.md)
- [📧 Gmail/Email Setup](file:///Users/saar/dev/Freelance/SukhSanchaar/GMAIL_SETUP.md)
- [🧾 Invoice Feature Details](file:///Users/saar/dev/Freelance/SukhSanchaar/IMPLEMENTATION_SUMMARY.md)

---

## ⚖️ License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

*Developed with ❤️ for the SukhSanchaar Team.*
