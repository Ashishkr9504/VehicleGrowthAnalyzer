# Financially Free Vehicle Analytics Dashboard

## 📌 Overview
This project is a **full-stack analytics dashboard** that visualizes **vehicle registration data** with an investor-friendly perspective.  
The dashboard provides insights such as **Year-on-Year (YoY)** and **Quarter-on-Quarter (QoQ)** growth, market share, and manufacturer performance.

The backend is built with **Node.js, Express, and MongoDB**, and the frontend is powered by **React + Tailwind CSS + Recharts**.

---

## 🎯 Features
- **User Authentication** (Signup, Login, JWT-based auth)
- **Vehicle Data Management**
  - Manufacturer-wise & category-wise records
  - YoY and QoQ growth metrics
  - Market share calculation
- **Interactive Dashboard**
  - Date range and filter controls
  - Trend charts (Line, Bar, Pie)
  - Quick insights & summary view
- **Database Seeding**
  - Sample dataset seeded via `seedVehicle.js`
  - Easily replaceable with real datasets (Kaggle, Data.gov.in, etc.)

## 🗂 Project Structure

backend/
├── models/
│ ├── User.js # User schema
│ └── Vehicle.js # Vehicle schema
├── routes/
│ ├── authRoutes.js # Authentication routes
│ └── vehicleRoutes.js # Vehicle data API
├── seedVehicle.js # Seeder script
├── server.js # Main backend entry point
├── .env # Environment variables
└── package.json

frontend/
├── src/
│ ├── components/ # UI components
│ ├── pages/ # Dashboard, Analytics pages
│ ├── utils/ # API helper
│ └── App.js
├── tailwind.config.js
├── package.json
└── public/

2️⃣ Install dependencies
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

3️⃣ Environment variables

MONGODB_URI="mongodb+srv://hajipur9473:Vqm3YBNzt2qjzNHn@cluster0.jdkyr8a.mongodb.net/"
PORT=5000
TOKEN_SECRET_KEY="your_secret_key_here"
JWT_EXPIRATION="1h"
CORS_ORIGIN="http://localhost:3000"
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your email id.
SMTP_PASS=your app password

💾 Seeding the Database
cd backend
npm run seed:vehicle

## 📊 Data Source & Preparation

Initially, the plan was to fetch real-time data from the **Vahan Parivahan** portal.  
However, since no official API was available for automated access, I adopted an alternative approach:

1. **Kaggle Dataset**  
   - Sourced vehicle registration datasets from Kaggle containing manufacturer, category, and date-wise records.

2. **Sample Data Creation**  
   - Generated additional realistic sample data using ChatGPT to fill gaps and meet the analytics requirements.

3. **Data Seeding**  
   - Formatted all datasets to match the `Vehicle` schema.
   - Seeded them into MongoDB using the `seedVehicle.js` script.