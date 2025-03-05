# MedAssist Healthcare Platform

![MedAssist Logo](./frontend/public/logo.png)

## Overview

MedAssist is a comprehensive healthcare platform designed to bridge the gap between patients and healthcare providers. This full-stack application streamlines the appointment booking process, provides easy access to medical services, and creates a seamless experience for all users.

## Features

- **User Authentication System**
  - Secure login/signup with JWT authentication
  - Role-based access (patients, doctors, administrators)

- **Appointment Booking System**
  - Interactive calendar for date selection
  - Real-time availability of time slots
  - Confirmation emails for appointments
  - Appointment history and management

- **Doctor/Service Directory**
  - Searchable directory of healthcare providers
  - Filtering by specialty, location, and availability
  - Doctor profiles with credentials and reviews

- **User Dashboard**
  - Personalized dashboard for patients
  - Upcoming appointment reminders
  - Medical history access
  - Prescription management

- **Admin Panel**
  - Hospital and doctor management
  - Appointment oversight
  - Analytics and reporting tools

## Tech Stack

### Frontend
- React.js
- Material-UI
- React Router
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication

## Project Structure

```
PROJECT/
├── frontend/                # React frontend application
│   ├── public/              # Static assets
│   └── src/
│       ├── components/      # Reusable UI components
│       ├── pages/           # Page components
│       ├── styles/          # Theme and global styles
│       ├── context/         # React context
│       └── utils/           # Utility functions
│
├── backend/                 # Node.js backend application
│   ├── models/              # MongoDB data models
│   ├── routes/              # API route definitions
│   ├── controllers/         # Business logic
│   └── middleware/          # Custom middleware
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with the following variables
# PORT=5000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# EMAIL_SERVICE=your_email_service
# EMAIL_USER=your_email_username
# EMAIL_PASS=your_email_password

# Start the server
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create .env file with the following variables
# REACT_APP_API_URL=http://localhost:5000/api

# Start the development server
npm start
```

## Deployment

### Option 1: Automated Deployment Preparation

We've created a helper script to prepare your project for deployment:

```bash
# Run the deployment preparation script
node prepare_for_deployment.js
```

This script will:
1. Guide you through setting up MongoDB Atlas
2. Create necessary environment files
3. Build the frontend for production
4. Provide next steps for deployment

### Option 2: Manual Deployment

#### Frontend Deployment (Vercel or Netlify)

##### Vercel Deployment
1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
4. Deploy to Vercel:
   ```bash
   vercel
   ```
5. Follow the prompts to complete deployment
6. For production deployment:
   ```bash
   vercel --prod
   ```

##### Netlify Deployment
1. Create a Netlify account at [netlify.com](https://netlify.com)
2. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
3. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
4. Deploy to Netlify:
   ```bash
   netlify deploy
   ```
5. For production deployment:
   ```bash
   netlify deploy --prod
   ```

#### Backend Deployment (Render)

1. Create a Render account at [render.com](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: medassist-api
   - **Environment**: Node
   - **Build Command**: npm install
   - **Start Command**: npm start
   - **Plan**: Free (or select appropriate plan)
5. Add environment variables from your `.env` file
6. Click "Create Web Service"

### Connecting Frontend to Backend

After deploying both services, update the frontend environment variable:

```
REACT_APP_API_URL=https://your-render-service-url.onrender.com/api
```

Then redeploy the frontend:
```bash
cd frontend
vercel --prod
# or for Netlify
netlify deploy --prod
```

### Running Locally

For local development and testing before deployment, use:

```bash
# Windows
run_local.bat

# macOS/Linux
# Start backend
cd backend && npm start
# In a new terminal
cd frontend && npm start
```

## Design Elements

### Color Scheme
- Primary color: Deep navy blue (#0A2342)
- Secondary color: Soft teal (#2D6E7E)
- Accent colors: Muted sage (#5C8D89) and soft coral (#E76F51)

### Typography
- Primary font: Poppins - Modern, professional, and highly readable
- Consistent hierarchy with clear heading styles

## Screenshots

![Dashboard](./screenshots/dashboard.png)
![Appointment Booking](./screenshots/appointment.png)
![Doctor Directory](./screenshots/doctors.png)

## Security Measures

- HTTPS for all communications
- Input validation and sanitization
- Protection against common vulnerabilities (XSS, CSRF)
- Rate limiting to prevent abuse
- Environment variables for sensitive information
- JWT token expiration and refresh mechanism
- Password hashing with bcrypt

## Future Enhancements

- Telemedicine video consultation integration
- Electronic health records (EHR) system
- Mobile app development (React Native)
- AI-powered symptom checker
- Integration with wearable health devices
- Multi-language support

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

- **Harish Yarra** - [GitHub](https://github.com/HarishxChamp)

## Acknowledgements

- Special thanks to all the healthcare professionals who provided insights for this project
- Icons from [FontAwesome](https://fontawesome.com/)
- UI inspiration from leading healthcare platforms
