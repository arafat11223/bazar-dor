# 🛒 BazarDor (বাজার দর)

**BazarDor** is a responsive Bangla-based grocery price tracking web application that helps users explore essential daily products, compare market prices, and stay updated with price changes.

## 🌐 Project Overview

BazarDor provides an easy way to explore the prices of essential grocery products in one place. Users can browse products by category, view price details, compare bazar-wise prices, and manage their profiles through authentication.

## ✨ Key Features

1. **Responsive Design** – Optimized for desktop, tablet, and mobile devices.
2. **Product Categories** – Browse essential products through different categories.
3. **Price Tracking** – View products with today's prices and daily price changes.
4. **Price Increase & Decrease Sections** – Explore products with the highest price increases and decreases.
5. **Product Details** – View minimum, maximum, average, and bazar-wise prices.
6. **Product Sorting** – Sort products by price from low to high or high to low.
7. **User Authentication** – Sign in and sign up using email/password, Google, and GitHub.
8. **Protected Routes** – Product details are accessible to authenticated users.
9. **User Profile** – View and update profile information.
10. **Toast Notifications** – Receive feedback for important user actions.
11. **Loading Skeletons** – Improve the user experience while content loads.
12. **Custom Error Pages** – Handle invalid routes and unavailable content.

## 🛠️ Technologies Used

- **Next.js** – React framework
- **React** – User interface development
- **TypeScript** – Type safety
- **Tailwind CSS** – Styling and responsive layouts
- **HeroUI** – UI components
- **Better Auth** – Authentication
- **MongoDB** – Database
- **Sonner** – Toast notifications
- **Hind Siliguri** – Bangla typography

## 📁 Project Structure

```text
bazardor/
├── public/
│   └── assets/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── category/
│   │   ├── product/
│   │   ├── profile/
│   │   ├── signin/
│   │   ├── signup/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── auth/
│   │   ├── categories/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── products/
│   │   └── shared/
│   ├── context/
│   ├── hooks/
│   ├── lib/
│   └── types/
├── .env.local
├── .gitignore
├── package.json
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the Project

```bash
cd bazardor
```

### 3. Install Dependencies

```bash
npm install
```


### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Production Build

To create a production build:

```bash
npm run build
```

To run the production server:

```bash
npm run start
```

## 🔐 Authentication

BazarDor uses Better Auth for authentication.

Supported authentication methods:

- Email and Password
- Google OAuth
- GitHub OAuth

MongoDB is used to store authentication-related data.

## 📱 Responsive Design

The application is designed to provide a consistent experience across:

- Desktop
- Tablet
- Mobile

## 👨‍💻 Developer

**Arafat Hossain**

GitHub:https://github.com/arafat11223
---

*BazarDor — প্রয়োজনীয় পণ্যের দাম এক নজরে।*