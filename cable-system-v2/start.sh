#!/bin/bash

echo "============================================"
echo "  Система подбора кабеля DKC"
echo "  Автор: Никитин А.Ю."
echo "============================================"
echo ""

# Проверка наличия Node.js
if ! command -v node &> /dev/null; then
    echo "[ОШИБКА] Node.js не установлен!"
    echo "Пожалуйста, установите Node.js с https://nodejs.org/"
    exit 1
fi

# Проверка наличия node_modules
if [ ! -d "node_modules" ]; then
    echo "Установка зависимостей..."
    npm install
    if [ $? -ne 0 ]; then
        echo "[ОШИБКА] Не удалось установить зависимости!"
        exit 1
    fi
    echo ""
fi

# Запуск сервера
echo "Запуск сервера..."
echo ""
echo "Откройте браузер и перейдите по адресу:"
echo "http://localhost:3000"
echo ""
echo "Для остановки сервера нажмите Ctrl+C"
echo ""

node server.js
