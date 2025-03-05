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

I've set up deployment configurations for both the frontend and backend:

### Frontend Deployment (Vercel or Netlify)

I chose to deploy the frontend using Netlify for its simplicity and reliability:

1. Connected my GitHub repository to Netlify
2. Set up the build configuration:
   - Build command: `npm run build`
   - Publish directory: `build`
3. Added environment variables to connect to the backend

### Backend Deployment (Render)

For the backend, I selected Render as it provides a reliable Node.js hosting environment:

1. Created a Web Service on Render connected to my repository
2. Configured the service with:
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
3. Set up environment variables for database connection and JWT authentication

### Running Locally

To run the project locally:

```bash
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

## About Me

I'm a passionate developer with a strong interest in healthcare technology. This project was born out of my desire to create a platform that makes healthcare services more accessible to everyone. As someone who has experienced the challenges of navigating healthcare systems, I wanted to build a solution that simplifies the process.

Throughout the development of MedAssist, I focused on creating an intuitive user experience with a clean, professional design. I implemented a custom appointment booking system with real-time availability checking and integrated various healthcare services into a unified platform.

## Technical Challenges Overcome

During development, I faced and solved several technical challenges:

1. **Real-time Appointment Scheduling**: Implemented an efficient algorithm to calculate available time slots based on doctor schedules and existing appointments.

2. **Secure Authentication System**: Created a JWT-based authentication with proper role-based access control to protect sensitive patient information.

3. **Responsive UI Design**: Developed a fully responsive interface that works seamlessly across all device sizes, using Material-UI's grid system and custom breakpoints.

4. **State Management**: Implemented a context-based state management solution to handle complex application state across multiple components.

5. **Database Schema Design**: Designed a MongoDB schema that efficiently represents the relationships between patients, doctors, appointments, and medical services.

## What I Learned

This project helped me grow as a developer in several ways:

- Deepened my understanding of React hooks and context API
- Improved my skills in designing RESTful APIs
- Gained experience with MongoDB schema design
- Enhanced my UI/UX design capabilities
- Strengthened my understanding of authentication and security best practices

## Contact

If you're interested in discussing this project or potential opportunities, feel free to reach out to me at (madeforcisco115@gmail.com)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

- **Harish Yarra** - [GitHub](https://github.com/HarishxChamp)

## Acknowledgements

- Special thanks to all the healthcare professionals who provided insights for this project
- Icons from [FontAwesome](https://fontawesome.com/)
- UI inspiration from leading healthcare platforms
