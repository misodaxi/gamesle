@echo off
title Namele - Servidor Local
echo ========================================================
echo        Iniciando Namele en tu navegador local
echo ========================================================
echo.

set "PATH=%LOCALAPPDATA%\nodejs;%PATH%"

where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] No se encontro Node.js en el sistema.
    echo Asegurate de que Node.js esta instalado en %LOCALAPPDATA%\nodejs
    pause
    exit /b 1
)

echo [OK] Node.js detectado correctamente.
echo [INFO] Iniciando servidor de desarrollo Vite...
echo.
echo La aplicacion estara disponible en: http://localhost:3000
echo.

start http://localhost:3000
call npm run dev -- --open --port 3000

pause
