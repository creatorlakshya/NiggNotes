@echo off
echo Starting NiggNote PDF Dark Mode Converter...

:: Start Backend
start cmd /k "cd backend && .\venv\Scripts\python main.py"

:: Start Frontend
start cmd /k "cd frontend && npm run dev"

echo Application is starting!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit this launcher...
pause > nul
