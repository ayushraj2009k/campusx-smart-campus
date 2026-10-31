@echo off
title CAMPUSX - Smart Campus Management Platform
echo ==========================================================
echo        CAMPUSX - SMART CAMPUS MANAGEMENT PLATFORM
echo          ONE CAMPUS. ONE CONNECTED EXPERIENCE.
echo              IIT Bhubaneswar - CrunchWeek 2026
echo ==========================================================
echo.
echo Starting FastAPI Backend & Production Frontend at http://127.0.0.1:8000 ...
echo.

set PYTHONPATH=%~dp0.venv\Lib\site-packages;%~dp0backend
"%USERPROFILE%\AppData\Roaming\uv\python\cpython-3.11-windows-x86_64-none\python.exe" backend\main.py

pause
