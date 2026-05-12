# 🛠️ TechFinder - India's Premier Technician Discovery Platform

TechFinder is a high-end, full-stack MERN application designed to connect skilled Indian technicians with customers in need of reliable repair services. From electrical fixes in Lucknow to plumbing in Patna, TechFinder bridges the gap with a premium, user-centric experience.

![Dashboard Preview](client/public/images/user_dash_bg.png)

## 🌟 Key Features

### 🇮🇳 Localized for India
- **Regional Experts**: Pre-populated with 10 professional technicians from Delhi, UP, Bihar, Maharashtra, and more.
- **INR Currency**: All pricing and transactions are displayed in Indian Rupees (₹).
- **Localized Content**: About and Contact pages tailored for the Indian market with local office details.

### 💎 Premium User Experience
- **Stunning UI/UX**: Modern design with glassmorphism, smooth animations (Framer Motion), and professional icons (Lucide-React).
- **Role-Based Dashboards**: 
    - **Customers**: Browse services, book experts, and track booking history.
    - **Technicians**: Manage incoming requests, accept/decline bookings, and track earnings.
- **Dynamic Banners**: Custom-generated high-resolution UI banners for a professional dashboard feel.

### 🔒 Secure Workflow
- **Forced Authentication**: Strict registration-then-login flow ensures secure access to private dashboards.
- **JWT Auth**: Secure token-based authentication for all API interactions.
- **Verified Status**: Visual badges for background-checked professionals.

---

## 🚀 Tech Stack

- **Frontend**: React.js, Vite, Framer Motion, Lucide Icons, Vanilla CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **State Management**: React Hooks (useState, useEffect)
- **API**: Axios for seamless frontend-backend communication

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16+)
- MongoDB (Running locally or Atlas)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd local-technician-finder
```

### 2. Backend Setup
```bash
cd server
npm install
# Create a .env file
# PORT=5000
# MONGO_URI=mongodb://localhost:27017/techfinder
# JWT_SECRET=your_secret_key
npm run seed  # To populate the 10 Indian technician profiles
npm start
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```

---

## 📸 Screenshots

### 👨‍🔧 Technician Discovery
Explore a grid of verified experts with professional profile photos and real ratings.

### 📊 Professional Dashboards
Custom banners and glassmorphism elements provide a state-of-the-art management experience.

---

## 📂 Project Structure

```text
├── client/              # React Frontend (Vite)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page-level components
│   │   └── App.jsx      # Main routing and structure
├── server/              # Express Backend
│   ├── models/          # Mongoose Schemas
│   ├── controllers/     # Business logic
│   ├── routes/          # API Endpoints
│   ├── public/          # Static assets (Technician images, UI banners)
│   └── seed.js          # Database seeder with Indian tech data
```

---

## 📝 License
Copyright © 2026 TechFinder. All rights reserved.
