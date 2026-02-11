@echo off
echo ============================================
echo   Система подбора кабеля DKC
echo   Автор: Никитин А.Ю.
echo ============================================
echo.

REM Проверка наличия Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ОШИБКА] Node.js не установлен!
    echo Пожалуйста, установите Node.js с https://nodejs.org/
    pause
    exit /b 1
)

REM Проверка наличия node_modules
if not exist "node_modules\" (
    echo Установка зависимостей...
    call npm install
    if %errorlevel% neq 0 (
        echo [ОШИБКА] Не удалось установить зависимости!
        pause
        exit /b 1
    )
    echo.
)

REM Запуск сервера
echo Запуск сервера...
echo.
echo Откройте браузер и перейдите по адресу:
echo http://localhost:3000
echo.
echo Для остановки сервера нажмите Ctrl+C
echo.
node server.js

pause
