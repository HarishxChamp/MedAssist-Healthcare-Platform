# MedAssist Healthcare Platform - Deployment Instructions

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
2. Create a free account
3. Create a new project named "MedAssist"
4. Build a free tier cluster (M0)
5. Set up database access:
   - Create a database user with password
   - Note down the username and password
6. Set up network access:
   - Add IP Access List Entry: 0.0.0.0/0 (Allow access from anywhere)
7. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (it will look like: `mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
   - Replace `<password>` with your database user's password

## Step 2: Deploy Backend to Render

1. Go to [Render](https://render.com/) and sign up
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - Name: medassist-api
   - Root Directory: backend
   - Environment: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free
5. Add environment variables:
   - MONGO_URI: Your MongoDB Atlas connection string
   - JWT_SECRET: A random string (you can generate one at [randomkeygen.com](https://randomkeygen.com/))
   - NODE_ENV: production
   - PORT: 8080
6. Click "Create Web Service"
7. Wait for deployment to complete (this may take a few minutes)
8. Note down your service URL (e.g., https://medassist-api.onrender.com)

## Step 3: Deploy Frontend to Netlify

1. Go to [Netlify](https://www.netlify.com/) and sign up
2. Click "Add new site" > "Import an existing project"
3. Connect to your GitHub repository
4. Configure the build:
   - Base directory: frontend
   - Build command: `npm run build`
   - Publish directory: frontend/build
5. Add environment variables:
   - REACT_APP_API_URL: Your Render backend URL + '/api' (e.g., https://medassist-api.onrender.com/api)
6. Click "Deploy site"
7. Wait for deployment to complete
8. Your site will be available at a Netlify URL (e.g., https://medassist-healthcare.netlify.app)

## Step 4: Set Up Custom Domain (Optional)

1. Purchase a domain from a provider like Namecheap, GoDaddy, or Google Domains
2. In Netlify:
   - Go to "Domain settings" > "Add custom domain"
   - Enter your domain name
   - Follow the instructions to configure DNS settings

## Step 5: Final Testing

1. Visit your deployed frontend
2. Test all features:
   - User registration and login
   - Appointment booking
   - Doctor search
   - Other platform features
3. Check that the UI matches the design requirements:
   - Primary color: Deep purple (#4A148C)
   - Secondary color: Teal (#00897B)
   - Background color: Light gray (#f4f4f4)

## Troubleshooting

If you encounter issues:

1. Check Render logs for backend errors
2. Check Netlify deploy logs for frontend errors
3. Verify environment variables are set correctly
4. Ensure MongoDB Atlas IP access list includes 0.0.0.0/0
5. Test API endpoints using a tool like Postman

## For Your Interview

When showcasing the project:

1. Highlight the tech stack: MERN (MongoDB, Express, React, Node.js)
2. Demonstrate the appointment booking flow
3. Show the responsive design on different device sizes
4. Explain the authentication system
5. Discuss future enhancements you'd like to implement
