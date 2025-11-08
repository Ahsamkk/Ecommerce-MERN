📖 Overview

A full-stack e-commerce web application built with the MERN stack (MongoDB, Express.js, React, Node.js).
Users can browse products, add items to their cart, make purchases, and manage their profiles.
Admins can manage inventory, view orders, and update product details.

🚀 Features

✅ User authentication (JWT or cookies-based)
✅ Add/remove items from cart
✅ Product search & filtering
✅ Order placement & checkout flow
✅ Admin dashboard for product management
✅ Responsive design (mobile-friendly)
✅ Secure routes (protected backend APIs)

🧰 Tech Stack

Frontend: React, React Router, Axios, Redux, CSS / Tailwind
Backend: Node.js, Express.js, MongoDB, Mongoose
Authentication: JWT / HTTP-only Cookies
Hosting: Vercel
Version Control: Git + GitHub

⚙️ Installation & Setup

1. Clone the repository
   git clone https://github.com/Ahsamkk/Ecommerce-MERN>.git
   cd Ecommerce-MERN

2. Install dependencies

Backend:

cd backend
npm install

Frontend:

cd frontend
npm install

3. Create environment files

In /backend/.env:

PORT=
MONGO_URI=
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

In /frontend/.env :

VITE_BACKEND_URL=

4. Run the app

# In one terminal

cd backend
npm run dev

# In another terminal

cd backend
npm run dev
