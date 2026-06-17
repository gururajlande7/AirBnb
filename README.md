# 🏡 Bhurr - Airbnb Style Stay Booking App

Bhurr is a full-stack web application inspired by Airbnb. Users can explore stays, view listing details, create their own listings, upload images, leave reviews, and manage their posted properties through a clean and responsive interface.

## ✨ Features

- 🔍 Search listings by title, location, country, or description
- 🧭 Explore listings using category filters
- 🏠 Create, edit, and delete property listings
- 📸 Upload listing images with Cloudinary
- 🔐 User authentication with signup, login, and logout
- 👤 Owner-only listing controls
- ⭐ Add and delete reviews
- 💬 Flash messages for success and error feedback
- 🧾 Toggle prices with taxes on the listing page
- 📱 Responsive UI built with Bootstrap and custom CSS
- ⚠️ Custom error handling pages

## 🛠️ Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Backend web framework
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **EJS** - Server-side templating
- **EJS Mate** - Layout support for EJS
- **Bootstrap 5** - Responsive UI components
- **Font Awesome** - Icons
- **Passport.js** - Authentication
- **Passport Local Mongoose** - Username/password auth helper
- **Express Session** - Session management
- **Connect Flash** - Flash messages
- **Joi** - Server-side validation
- **Multer** - File upload handling
- **Cloudinary** - Image storage
- **Method Override** - Support for PUT and DELETE requests from forms

## 📁 Project Structure

```text
AirBNB/
├── controller/       # Route controller logic
├── init/             # Seed data and database initializer
├── models/           # Mongoose models
├── public/           # CSS and client-side JavaScript
├── routes/           # Express routes
├── utils/            # Utility helpers
├── views/            # EJS templates
├── app.js            # Main Express app
├── cloudConfig.js    # Cloudinary storage config
├── middleware.js     # Auth, validation, and ownership middleware
├── schema.js         # Joi validation schemas
└── package.json
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd AirBNB
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

> `--legacy-peer-deps` may be needed because the current Cloudinary upload packages have a peer dependency version mismatch.

### 3. Create a `.env` file

Add your Cloudinary credentials:

```env
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
```

### 4. Start MongoDB

Make sure MongoDB is running locally on:

```text
mongodb://127.0.0.1:27017/bhurr
```

### 5. Seed the database

```bash
node init/index.js
```

### 6. Run the app

```bash
npm start
```

Open the app in your browser:

```text
http://localhost:8080/listing
```

## 🔐 Authentication

Users can:

- Create an account
- Log in and log out
- Add listings only when logged in
- Edit or delete only their own listings
- Add reviews when logged in
- Delete only their own reviews

## 🌄 Listing Experience

The listing page includes:

- Category icons
- Search bar
- Tax price toggle
- Responsive listing cards
- Image hover effects
- Ratings and location details

## 🧪 Useful Commands

```bash
npm start
```

Starts the Express server.

```bash
node init/index.js
```

Clears and inserts sample listing data into MongoDB.

## 📌 Notes

- The app currently uses a local MongoDB database named `bhurr`.
- Listing images are uploaded through Cloudinary.
- Seed listings use sample image URLs.
- The default server port is `8080`.

## 👨‍💻 Author

Made with ❤️ by Gururaj
