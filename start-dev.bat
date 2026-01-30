@echo off
echo Starting Book My Film Development Server...
echo.
echo Starting backend server...
start "Backend Server" cmd /k "npm run dev"
echo.
echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul
echo.
echo Starting frontend client...
start "Frontend Client" cmd /k "cd client && npm start"
echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause