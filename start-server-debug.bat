@echo off
echo ========================================
echo   Book My Film - Debug Server Startup
echo ========================================
echo.
echo Checking Node.js version...
node --version
echo.
echo Checking npm version...
npm --version
echo.
echo Starting server with debug info...
echo Server will run on: http://localhost:5000
echo.
echo ========================================
echo   Press Ctrl+C to stop the server
echo ========================================
echo.
node server.js
echo.
echo Server stopped.
pause