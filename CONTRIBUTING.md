# Contributing to MedAssist

Thank you for considering contributing to MedAssist! This document outlines the process for contributing to this project.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with the following information:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Any additional context that might be helpful

### Suggesting Features

If you have an idea for a new feature, please create an issue with:
- A clear, descriptive title
- A detailed description of the proposed feature
- Any relevant mockups or examples
- Why this feature would be beneficial to the project

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Make your changes
4. Run tests to ensure your changes don't break existing functionality
5. Commit your changes (`git commit -m 'Add some feature'`)
6. Push to the branch (`git push origin feature/your-feature-name`)
7. Open a Pull Request

## Development Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/MedAssist-Healthcare-Platform.git
   cd MedAssist-Healthcare-Platform
   ```

2. Install dependencies
   ```
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables
   - Create `.env` files in both frontend and backend directories based on the provided `.env.example` files

4. Start the development servers
   ```
   # Start backend server
   cd backend
   npm run dev

   # In a new terminal, start frontend server
   cd frontend
   npm start
   ```

## Code Style Guidelines

- Use meaningful variable and function names
- Write comments for complex logic
- Follow the existing code style and patterns
- Include JSDoc comments for functions
- Keep functions small and focused on a single responsibility
- Write tests for new functionality

## Commit Message Guidelines

- Use clear, descriptive commit messages
- Start with a verb in the present tense (e.g., "Add", "Fix", "Update")
- Reference issue numbers when applicable
- Keep the first line under 72 characters
- Use the body of the commit message to explain the "why" behind the change

Example:
```
Fix appointment booking validation error

Resolves the issue where users could book appointments outside of doctor's working hours.
Adds additional validation in the appointment creation process.

Fixes #123
```

## License

By contributing to MedAssist, you agree that your contributions will be licensed under the project's MIT license.

## Questions?

If you have any questions about contributing, please feel free to reach out to the project maintainer at madeforcisco115@gmail.com.

Thank you for helping improve MedAssist!
