@echo off
echo Starting MedAssist Healthcare Platform locally...
echo.
echo Starting Backend...
start cmd /k "cd backend && npm start"
echo.
echo Starting Frontend...
start cmd /k "cd frontend && npm start"
echo.
echo MedAssist is starting up! The frontend will be available at http://localhost:3000
echo.
