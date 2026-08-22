@echo off
cd /d "%~dp0"
title Gamesle - Servidor Local
echo ========================================================
echo        Iniciando Gamesle en tu navegador local
echo ========================================================
echo.

set "PATH=%LOCALAPPDATA%\nodejs;%ProgramFiles%\nodejs;%ProgramFiles(x86)%\nodejs;%APPDATA%\npm;%PATH%"

where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] No se encontro Node.js en el sistema.
    echo Asegurate de que Node.js esta instalado.
    pause
    exit /b 1
)

echo [OK] Node.js detectado correctamente.
echo [INFO] Iniciando servidor Vite y abriendo el navegador...
echo.

call npm run dev -- --open

pause
