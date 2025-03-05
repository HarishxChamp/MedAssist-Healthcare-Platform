/**
 * This script prepares your MedAssist project for deployment
 * Run with: node prepare_for_deployment.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { execSync } = require('child_process');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

console.log(`${colors.bright}${colors.magenta}
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   MedAssist Healthcare Platform - Deployment Preparation  ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
${colors.reset}`);

// Function to ask questions
const ask = (question) => {
  return new Promise((resolve) => {
    rl.question(`${colors.cyan}${question}${colors.reset}`, (answer) => {
      resolve(answer);
    });
  });
};

// Main function
async function main() {
  try {
    // Step 1: Get MongoDB connection string
    console.log(`${colors.bright}${colors.yellow}Step 1: MongoDB Atlas Configuration${colors.reset}`);
    console.log(`Please create a MongoDB Atlas account and cluster as described in DEPLOYMENT_INSTRUCTIONS.md`);
    const mongoUri = await ask('Enter your MongoDB Atlas connection string: ');
    
    // Step 2: Create backend .env file
    console.log(`\n${colors.bright}${colors.yellow}Step 2: Creating Backend Environment File${colors.reset}`);
    const jwtSecret = generateRandomString(32);
    
    const backendEnvContent = `# Server Configuration
PORT=8080
NODE_ENV=production

# MongoDB Connection
MONGO_URI=${mongoUri}

# JWT Configuration
JWT_SECRET=${jwtSecret}
JWT_EXPIRE=30d

# Email Configuration (if needed)
# EMAIL_SERVICE=gmail
# EMAIL_USERNAME=your-email@gmail.com
# EMAIL_PASSWORD=your-app-password

# Stripe Configuration (if needed)
# STRIPE_SECRET_KEY=your_stripe_secret_key
# STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
`;
    
    fs.writeFileSync(path.join(__dirname, 'backend', '.env'), backendEnvContent);
    console.log(`${colors.green}Backend .env file created successfully!${colors.reset}`);
    
    // Step 3: Build the frontend
    console.log(`\n${colors.bright}${colors.yellow}Step 3: Building Frontend${colors.reset}`);
    const backendUrl = await ask('Enter your Render backend URL (or leave blank if not deployed yet): ');
    
    const frontendEnvContent = `REACT_APP_API_URL=${backendUrl ? backendUrl + '/api' : 'http://localhost:8080/api'}`;
    fs.writeFileSync(path.join(__dirname, 'frontend', '.env'), frontendEnvContent);
    
    console.log(`${colors.green}Frontend .env file created successfully!${colors.reset}`);
    console.log(`${colors.blue}Building frontend...${colors.reset}`);
    
    try {
      process.chdir(path.join(__dirname, 'frontend'));
      execSync('npm run build', { stdio: 'inherit' });
      console.log(`${colors.green}Frontend built successfully!${colors.reset}`);
    } catch (error) {
      console.error(`${colors.red}Error building frontend: ${error.message}${colors.reset}`);
    }
    
    // Step 4: Final instructions
    console.log(`\n${colors.bright}${colors.magenta}Deployment Preparation Complete!${colors.reset}`);
    console.log(`\n${colors.bright}Next Steps:${colors.reset}`);
    console.log(`1. Deploy your backend to Render`);
    console.log(`2. Deploy your frontend to Netlify`);
    console.log(`3. Follow the detailed instructions in DEPLOYMENT_INSTRUCTIONS.md`);
    
    console.log(`\n${colors.bright}${colors.green}Good luck with your interview! Your MedAssist platform is ready to showcase.${colors.reset}`);
    
  } catch (error) {
    console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
  } finally {
    rl.close();
  }
}

// Helper function to generate random string for JWT secret
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Run the main function
main();
