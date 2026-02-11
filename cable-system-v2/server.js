const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Путь к папке с данными
const DATA_DIR = path.join(__dirname, 'data');

// Создание папки data если её нет
async function ensureDataDir() {
    try {
        await fs.access(DATA_DIR);
    } catch {
        await fs.mkdir(DATA_DIR, { recursive: true });
        console.log('📁 Создана папка data для хранения данных');
    }
}

// Функция для чтения JSON файла
async function readJsonFile(filename) {
    try {
        const filePath = path.join(DATA_DIR, filename);
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return null;
    }
}

// Функция для записи JSON файла
async function writeJsonFile(filename, data) {
    const filePath = path.join(DATA_DIR, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

// API endpoints

// Получить все кабели
app.get('/api/cables', async (req, res) => {
    try {
        const cables = await readJsonFile('cables.json') || [];
        res.json(cables);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка чтения данных' });
    }
});

// Сохранить кабели
app.post('/api/cables', async (req, res) => {
    try {
        await writeJsonFile('cables.json', req.body);
        res.json({ success: true, message: 'Кабели сохранены' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сохранения данных' });
    }
});

// Получить избранное
app.get('/api/favorites', async (req, res) => {
    try {
        const favorites = await readJsonFile('favorites.json') || [];
        res.json(favorites);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка чтения избранного' });
    }
});

// Сохранить избранное
app.post('/api/favorites', async (req, res) => {
    try {
        await writeJsonFile('favorites.json', req.body);
        res.json({ success: true, message: 'Избранное сохранено' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сохранения избранного' });
    }
});

// Получить историю
app.get('/api/history', async (req, res) => {
    try {
        const history = await readJsonFile('history.json') || [];
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка чтения истории' });
    }
});

// Сохранить историю
app.post('/api/history', async (req, res) => {
    try {
        await writeJsonFile('history.json', req.body);
        res.json({ success: true, message: 'История сохранена' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сохранения истории' });
    }
});

// Получить настройки
app.get('/api/settings', async (req, res) => {
    try {
        const settings = await readJsonFile('settings.json') || { darkTheme: false };
        res.json(settings);
    } catch (error) {
        res.status(500).json({ error: 'Ошибка чтения настроек' });
    }
});

// Сохранить настройки
app.post('/api/settings', async (req, res) => {
    try {
        await writeJsonFile('settings.json', req.body);
        res.json({ success: true, message: 'Настройки сохранены' });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка сохранения настроек' });
    }
});

// Создать резервную копию всех данных
app.post('/api/backup', async (req, res) => {
    try {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const backupDir = path.join(DATA_DIR, 'backups');
        
        await fs.mkdir(backupDir, { recursive: true });
        
        const cables = await readJsonFile('cables.json') || [];
        const favorites = await readJsonFile('favorites.json') || [];
        const history = await readJsonFile('history.json') || [];
        const settings = await readJsonFile('settings.json') || {};
        
        const backup = {
            timestamp: new Date().toISOString(),
            cables,
            favorites,
            history,
            settings
        };
        
        const backupPath = path.join(backupDir, `backup_${timestamp}.json`);
        await fs.writeFile(backupPath, JSON.stringify(backup, null, 2));
        
        res.json({ success: true, message: 'Резервная копия создана', filename: `backup_${timestamp}.json` });
    } catch (error) {
        res.status(500).json({ error: 'Ошибка создания резервной копии' });
    }
});

// Запуск сервера
async function startServer() {
    await ensureDataDir();
    
    app.listen(PORT, () => {
        console.log(`
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║   🚀 Сервер системы подбора кабеля DKC запущен!          ║
║                                                           ║
║   🌐 Адрес: http://localhost:${PORT}                        ║
║   📁 Папка данных: ${DATA_DIR.padEnd(38)}║
║                                                           ║
║   Все данные сохраняются в папке 'data'                  ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
        `);
    });
}

startServer();
