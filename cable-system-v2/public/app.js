// Конфигурация API
const API_URL = 'http://localhost:3000/api';

// Глобальные переменные
let cables = [];
let editingIndex = -1;
let favorites = [];
let searchHistory = [];
let comparisonList = [];

// Предзагруженные данные кабелей DKC
const initialCables = [
    {
        type: "КВВГнг-LS", section: "4×0,75", diameter: 11.0, dy15: "2", weight: 85,
        protectionMR: "16", codeMR: "6016-24 БИР", linkMR: "https://dkc.ru/catalog/kabeli-i-provoda/kabeli-silovye-s-pvkh-izolyatsiey/kabel-avvg-ng-kabel-vvg-ng",
        protectionGF: "16", codeGF: "0 1922", linkGF: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/metallicheskie-truby",
        protectionTR: "32", codeTR: "6016-24 L3", linkTR: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/plastikovye-truby"
    },
    {
        type: "КВВГнг-LS", section: "3×0,75", diameter: 9.7, dy15: "2", weight: 67,
        protectionMR: "16", codeMR: "6016-24 БИР", linkMR: "https://dkc.ru/catalog/kabeli-i-provoda/kabeli-silovye-s-pvkh-izolyatsiey/kabel-avvg-ng-kabel-vvg-ng",
        protectionGF: "—", codeGF: "0 1924", linkGF: "",
        protectionTR: "40", codeTR: "6016-24 L3", linkTR: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/plastikovye-truby"
    },
    {
        type: "КВВГнг-LS", section: "2×0,75", diameter: 8.4, dy15: "2", weight: 54,
        protectionMR: "16", codeMR: "6016-24 БИР", linkMR: "https://dkc.ru/catalog/kabeli-i-provoda/kabeli-silovye-s-pvkh-izolyatsiey/kabel-avvg-ng-kabel-vvg-ng",
        protectionGF: "16", codeGF: "0 1925", linkGF: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/metallicheskie-truby",
        protectionTR: "50", codeTR: "6016-24 L3", linkTR: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/plastikovye-truby"
    },
    {
        type: "КВВГнг-LS", section: "4×1,0", diameter: 11.8, dy15: "3", weight: 105,
        protectionMR: "16", codeMR: "6016-24 БИР", linkMR: "https://dkc.ru/catalog/kabeli-i-provoda/kabeli-silovye-s-pvkh-izolyatsiey/kabel-avvg-ng-kabel-vvg-ng",
        protectionGF: "16", codeGF: "0 1926", linkGF: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/metallicheskie-truby",
        protectionTR: "32", codeTR: "6016-24 L3", linkTR: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/plastikovye-truby"
    },
    {
        type: "КВВГнг-LS", section: "3×1,0", diameter: 10.2, dy15: "3", weight: 86,
        protectionMR: "16", codeMR: "6016-24 БИР", linkMR: "https://dkc.ru/catalog/kabeli-i-provoda/kabeli-silovye-s-pvkh-izolyatsiey/kabel-avvg-ng-kabel-vvg-ng",
        protectionGF: "—", codeGF: "0 1927", linkGF: "",
        protectionTR: "40", codeTR: "6016-24 L3", linkTR: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/plastikovye-truby"
    },
    {
        type: "КВВГнг-LS", section: "4×1,5", diameter: 13.0, dy15: "4", weight: 145,
        protectionMR: "20", codeMR: "6020-24 БИР", linkMR: "https://dkc.ru/catalog/kabeli-i-provoda/kabeli-silovye-s-pvkh-izolyatsiey/kabel-avvg-ng-kabel-vvg-ng",
        protectionGF: "20", codeGF: "0 1928", linkGF: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/metallicheskie-truby",
        protectionTR: "25", codeTR: "6020-24 L3", linkTR: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/plastikovye-truby"
    },
    {
        type: "КВВГнг-LS", section: "3×1,5", diameter: 11.5, dy15: "4", weight: 118,
        protectionMR: "20", codeMR: "6020-24 БИР", linkMR: "https://dkc.ru/catalog/kabeli-i-provoda/kabeli-silovye-s-pvkh-izolyatsiey/kabel-avvg-ng-kabel-vvg-ng",
        protectionGF: "—", codeGF: "0 1929", linkGF: "",
        protectionTR: "32", codeTR: "6020-24 L3", linkTR: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/plastikovye-truby"
    },
    {
        type: "КВВГнг-LS", section: "2×1,5", diameter: 9.8, dy15: "4", weight: 92,
        protectionMR: "20", codeMR: "6020-24 БИР", linkMR: "https://dkc.ru/catalog/kabeli-i-provoda/kabeli-silovye-s-pvkh-izolyatsiey/kabel-avvg-ng-kabel-vvg-ng",
        protectionGF: "20", codeGF: "0 1930", linkGF: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/metallicheskie-truby",
        protectionTR: "40", codeTR: "6020-24 L3", linkTR: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/plastikovye-truby"
    },
    {
        type: "КВВГнг-LS", section: "4×2,5", diameter: 15.5, dy15: "5", weight: 215,
        protectionMR: "25", codeMR: "6025-24 БИР", linkMR: "https://dkc.ru/catalog/kabeli-i-provoda/kabeli-silovye-s-pvkh-izolyatsiey/kabel-avvg-ng-kabel-vvg-ng",
        protectionGF: "25", codeGF: "0 1931", linkGF: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/metallicheskie-truby",
        protectionTR: "20", codeTR: "6025-24 L3", linkTR: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/plastikovye-truby"
    },
    {
        type: "КВВГнг-LS", section: "3×2,5", diameter: 13.8, dy15: "5", weight: 178,
        protectionMR: "25", codeMR: "6025-24 БИР", linkMR: "https://dkc.ru/catalog/kabeli-i-provoda/kabeli-silovye-s-pvkh-izolyatsiey/kabel-avvg-ng-kabel-vvg-ng",
        protectionGF: "—", codeGF: "0 1932", linkGF: "",
        protectionTR: "25", codeTR: "6025-24 L3", linkTR: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/plastikovye-truby"
    },
    {
        type: "КВВГнг-LS", section: "2×2,5", diameter: 11.5, dy15: "5", weight: 142,
        protectionMR: "25", codeMR: "6025-24 БИР", linkMR: "https://dkc.ru/catalog/kabeli-i-provoda/kabeli-silovye-s-pvkh-izolyatsiey/kabel-avvg-ng-kabel-vvg-ng",
        protectionGF: "25", codeGF: "0 1933", linkGF: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/metallicheskie-truby",
        protectionTR: "32", codeTR: "6025-24 L3", linkTR: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/plastikovye-truby"
    },
    {
        type: "КВВГнг-LS", section: "4×4,0", diameter: 18.5, dy15: "6", weight: 315,
        protectionMR: "32", codeMR: "6032-24 БИР", linkMR: "https://dkc.ru/catalog/kabeli-i-provoda/kabeli-silovye-s-pvkh-izolyatsiey/kabel-avvg-ng-kabel-vvg-ng",
        protectionGF: "32", codeGF: "0 1934", linkGF: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/metallicheskie-truby",
        protectionTR: "16", codeTR: "6032-24 L3", linkTR: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/plastikovye-truby"
    },
    {
        type: "КВВГнг-LS", section: "3×4,0", diameter: 16.2, dy15: "6", weight: 265,
        protectionMR: "32", codeMR: "6032-24 БИР", linkMR: "https://dkc.ru/catalog/kabeli-i-provoda/kabeli-silovye-s-pvkh-izolyatsiey/kabel-avvg-ng-kabel-vvg-ng",
        protectionGF: "—", codeGF: "0 1935", linkGF: "",
        protectionTR: "20", codeTR: "6032-24 L3", linkTR: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/plastikovye-truby"
    },
    {
        type: "ВВГнг-LS", section: "3×1,5", diameter: 10.8, dy15: "4", weight: 125,
        protectionMR: "20", codeMR: "6020-28 БИР", linkMR: "https://dkc.ru/catalog/kabeli-i-provoda/kabeli-silovye-s-pvkh-izolyatsiey/kabel-avvg-ng-kabel-vvg-ng",
        protectionGF: "—", codeGF: "0 1936", linkGF: "",
        protectionTR: "32", codeTR: "6020-28 L3", linkTR: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/plastikovye-truby"
    },
    {
        type: "ВВГнг-LS", section: "3×2,5", diameter: 12.8, dy15: "5", weight: 195,
        protectionMR: "25", codeMR: "6025-28 БИР", linkMR: "https://dkc.ru/catalog/kabeli-i-provoda/kabeli-silovye-s-pvkh-izolyatsiey/kabel-avvg-ng-kabel-vvg-ng",
        protectionGF: "—", codeGF: "0 1937", linkGF: "",
        protectionTR: "25", codeTR: "6025-28 L3", linkTR: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/plastikovye-truby"
    },
    {
        type: "ПВС", section: "3×1,5", diameter: 9.8, dy15: "—", weight: 85,
        protectionMR: "—", codeMR: "—", linkMR: "",
        protectionGF: "—", codeGF: "—", linkGF: "",
        protectionTR: "—", codeTR: "—", linkTR: ""
    },
    {
        type: "ПВС", section: "3×2,5", diameter: 11.5, dy15: "—", weight: 125,
        protectionMR: "—", codeMR: "—", linkMR: "",
        protectionGF: "—", codeGF: "—", linkGF: "",
        protectionTR: "—", codeTR: "—", linkTR: ""
    },
    {
        type: "КВВГЭнг-LS", section: "4×0,75", diameter: 12.5, dy15: "2", weight: 95,
        protectionMR: "16", codeMR: "6016-30 БИР", linkMR: "https://dkc.ru/catalog/kabeli-i-provoda/kabeli-silovye-s-pvkh-izolyatsiey/kabel-avvg-ng-kabel-vvg-ng",
        protectionGF: "16", codeGF: "0 1938", linkGF: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/metallicheskie-truby",
        protectionTR: "32", codeTR: "6016-30 L3", linkTR: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/plastikovye-truby"
    },
    {
        type: "КВВГЭнг-LS", section: "4×1,5", diameter: 14.5, dy15: "4", weight: 165,
        protectionMR: "20", codeMR: "6020-30 БИР", linkMR: "https://dkc.ru/catalog/kabeli-i-provoda/kabeli-silovye-s-pvkh-izolyatsiey/kabel-avvg-ng-kabel-vvg-ng",
        protectionGF: "20", codeGF: "0 1939", linkGF: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/metallicheskie-truby",
        protectionTR: "25", codeTR: "6020-30 L3", linkTR: "https://dkc.ru/catalog/aksessuary-dlya-prokladki-kabelya/plastikovye-truby"
    }
];

// API функции
async function apiRequest(endpoint, method = 'GET', data = null) {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        };
        
        if (data) {
            options.body = JSON.stringify(data);
        }
        
        const response = await fetch(`${API_URL}${endpoint}`, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        updateConnectionStatus(true);
        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        updateConnectionStatus(false);
        throw error;
    }
}

function updateConnectionStatus(connected) {
    const status = document.getElementById('connectionStatus');
    if (connected) {
        status.classList.remove('disconnected');
        status.title = 'Соединение установлено';
    } else {
        status.classList.add('disconnected');
        status.title = 'Нет соединения с сервером';
    }
}

// Показать уведомление
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Загрузка данных при старте
window.onload = async function() {
    try {
        await loadCables();
        await loadFavorites();
        await loadHistory();
        await loadSettings();
        
        // Если нет сохраненных данных, загружаем предустановленные
        if (cables.length === 0) {
            cables = [...initialCables];
            await saveCables();
            showNotification('Загружены предустановленные данные кабелей');
        }
        
        displayCables();
        updateSearchFilters();
        updateStats();
        updateCalcCableList();
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        showNotification('Ошибка подключения к серверу. Проверьте, запущен ли сервер.', 'error');
    }
};

// Сохранение и загрузка данных
async function saveCables() {
    try {
        await apiRequest('/cables', 'POST', cables);
    } catch (error) {
        console.error('Ошибка сохранения кабелей:', error);
        showNotification('Ошибка сохранения данных', 'error');
    }
}

async function loadCables() {
    try {
        cables = await apiRequest('/cables');
    } catch (error) {
        console.error('Ошибка загрузки кабелей:', error);
    }
}

async function saveFavorites() {
    try {
        await apiRequest('/favorites', 'POST', favorites);
    } catch (error) {
        console.error('Ошибка сохранения избранного:', error);
    }
}

async function loadFavorites() {
    try {
        favorites = await apiRequest('/favorites');
    } catch (error) {
        console.error('Ошибка загрузки избранного:', error);
    }
}

async function saveHistory() {
    try {
        await apiRequest('/history', 'POST', searchHistory);
    } catch (error) {
        console.error('Ошибка сохранения истории:', error);
    }
}

async function loadHistory() {
    try {
        searchHistory = await apiRequest('/history');
    } catch (error) {
        console.error('Ошибка загрузки истории:', error);
    }
}

async function saveSettings() {
    try {
        const settings = {
            darkTheme: document.body.classList.contains('dark-theme')
        };
        await apiRequest('/settings', 'POST', settings);
    } catch (error) {
        console.error('Ошибка сохранения настроек:', error);
    }
}

async function loadSettings() {
    try {
        const settings = await apiRequest('/settings');
        if (settings.darkTheme) {
            document.body.classList.add('dark-theme');
        }
    } catch (error) {
        console.error('Ошибка загрузки настроек:', error);
    }
}

// Создание резервной копии
async function createBackup() {
    try {
        const result = await apiRequest('/backup', 'POST');
        showNotification(`Резервная копия создана: ${result.filename}`);
    } catch (error) {
        console.error('Ошибка создания резервной копии:', error);
        showNotification('Ошибка создания резервной копии', 'error');
    }
}

// Переключение вкладок
function switchTab(index) {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    
    tabs[index].classList.add('active');
    contents[index].classList.add('active');
    
    if (index === 1) displayFavorites();
    if (index === 4) displayHistory();
    if (index === 5) displayCables();
}

// Переключение темы
async function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    await saveSettings();
}

// Сохранение кабеля
async function saveCable() {
    const cable = {
        type: document.getElementById('cableType').value,
        section: document.getElementById('cableSection').value,
        diameter: parseFloat(document.getElementById('cableDiameter').value) || 0,
        dy15: document.getElementById('cableDy15').value,
        weight: parseFloat(document.getElementById('cableWeight').value) || 0,
        protectionMR: document.getElementById('protectionMR').value,
        codeMR: document.getElementById('codeMR').value,
        linkMR: document.getElementById('linkMR').value,
        protectionGF: document.getElementById('protectionGF').value,
        codeGF: document.getElementById('codeGF').value,
        linkGF: document.getElementById('linkGF').value,
        protectionTR: document.getElementById('protectionTR').value,
        codeTR: document.getElementById('codeTR').value,
        linkTR: document.getElementById('linkTR').value
    };

    if (!cable.type || !cable.section) {
        showNotification('Заполните тип кабеля и сечение!', 'error');
        return;
    }

    if (editingIndex >= 0) {
        cables[editingIndex] = cable;
        editingIndex = -1;
        showNotification('Кабель успешно обновлен!');
    } else {
        cables.push(cable);
        showNotification('Кабель успешно добавлен!');
    }

    await saveCables();
    displayCables();
    updateSearchFilters();
    updateStats();
    updateCalcCableList();
    clearForm();
}

// Редактирование кабеля
function editCable(index) {
    const cable = cables[index];
    editingIndex = index;
    
    document.getElementById('cableType').value = cable.type;
    document.getElementById('cableSection').value = cable.section;
    document.getElementById('cableDiameter').value = cable.diameter;
    document.getElementById('cableDy15').value = cable.dy15 || '';
    document.getElementById('cableWeight').value = cable.weight || '';
    document.getElementById('protectionMR').value = cable.protectionMR;
    document.getElementById('codeMR').value = cable.codeMR;
    document.getElementById('linkMR').value = cable.linkMR || '';
    document.getElementById('protectionGF').value = cable.protectionGF;
    document.getElementById('codeGF').value = cable.codeGF;
    document.getElementById('linkGF').value = cable.linkGF || '';
    document.getElementById('protectionTR').value = cable.protectionTR;
    document.getElementById('codeTR').value = cable.codeTR;
    document.getElementById('linkTR').value = cable.linkTR || '';
    
    switchTab(5);
    window.scrollTo(0, 0);
}

// Удаление кабеля
async function deleteCable(index) {
    if (confirm('Удалить этот кабель?')) {
        cables.splice(index, 1);
        await saveCables();
        displayCables();
        updateSearchFilters();
        updateStats();
        updateCalcCableList();
        showNotification('Кабель удален');
    }
}

// Отмена редактирования
function cancelEdit() {
    editingIndex = -1;
    clearForm();
}

// Очистка формы
function clearForm() {
    const fields = ['cableType', 'cableSection', 'cableDiameter', 'cableDy15', 'cableWeight',
                    'protectionMR', 'codeMR', 'linkMR', 'protectionGF', 'codeGF', 'linkGF',
                    'protectionTR', 'codeTR', 'linkTR'];
    fields.forEach(field => document.getElementById(field).value = '');
}

// Отображение списка кабелей
function displayCables() {
    const list = document.getElementById('cablesList');
    
    if (cables.length === 0) {
        list.innerHTML = '<div class="no-results">Кабели не добавлены</div>';
        return;
    }

    let html = '<table><thead><tr>';
    html += '<th>Тип</th><th>Сечение</th><th>Диаметр (мм)</th><th>Dy 15</th><th>Вес (кг/км)</th>';
    html += '<th>М/Р</th><th>Код М/Р</th><th>ГФ</th><th>Код ГФ</th>';
    html += '<th>ТР</th><th>Код ТР</th><th>Действия</th>';
    html += '</tr></thead><tbody>';

    cables.forEach((cable, index) => {
        const weightClass = getWeightClass(cable.weight);
        html += '<tr>';
        html += `<td>${cable.type}</td>`;
        html += `<td>${cable.section}</td>`;
        html += `<td>${cable.diameter}</td>`;
        html += `<td>${cable.dy15 || '—'}</td>`;
        html += `<td class="${weightClass}">${cable.weight || '—'}</td>`;
        html += `<td>${cable.protectionMR}</td>`;
        html += `<td>${cable.codeMR}</td>`;
        html += `<td>${cable.protectionGF}</td>`;
        html += `<td>${cable.codeGF}</td>`;
        html += `<td>${cable.protectionTR}</td>`;
        html += `<td>${cable.codeTR}</td>`;
        html += `<td>
            <button class="edit-btn" onclick="editCable(${index})">✏️</button>
            <button class="delete-btn" onclick="deleteCable(${index})">🗑️</button>
        </td>`;
        html += '</tr>';
    });

    html += '</tbody></table>';
    list.innerHTML = html;
}

// Получить класс веса
function getWeightClass(weight) {
    if (!weight) return '';
    if (weight > 100) return 'weight-high';
    if (weight >= 50) return 'weight-medium';
    return 'weight-low';
}

// Обновление фильтров поиска
function updateSearchFilters() {
    const typeSelect = document.getElementById('searchType');
    const sectionSelect = document.getElementById('searchSection');
    const dy15Select = document.getElementById('searchDy15');
    
    const types = [...new Set(cables.map(c => c.type))];
    const sections = [...new Set(cables.map(c => c.section))];
    const dy15s = [...new Set(cables.map(c => c.dy15).filter(d => d && d !== '—'))];
    
    typeSelect.innerHTML = '<option value="">Все типы</option>';
    types.forEach(type => {
        typeSelect.innerHTML += `<option value="${type}">${type}</option>`;
    });
    
    sectionSelect.innerHTML = '<option value="">Все сечения</option>';
    sections.forEach(section => {
        sectionSelect.innerHTML += `<option value="${section}">${section}</option>`;
    });

    dy15Select.innerHTML = '<option value="">Все значения</option>';
    dy15s.forEach(dy15 => {
        dy15Select.innerHTML += `<option value="${dy15}">${dy15}</option>`;
    });
}

// Поиск кабелей
async function searchCables() {
    const type = document.getElementById('searchType').value;
    const section = document.getElementById('searchSection').value;
    const dy15 = document.getElementById('searchDy15').value;
    const weightFilter = document.getElementById('searchWeight').value;
    
    let results = cables;
    
    if (type) results = results.filter(c => c.type === type);
    if (section) results = results.filter(c => c.section === section);
    if (dy15) results = results.filter(c => c.dy15 === dy15);
    
    if (weightFilter) {
        if (weightFilter === 'light') results = results.filter(c => c.weight < 50);
        if (weightFilter === 'medium') results = results.filter(c => c.weight >= 50 && c.weight <= 100);
        if (weightFilter === 'heavy') results = results.filter(c => c.weight > 100);
    }
    
    // Сохранить в историю
    if (results.length > 0) {
        await addToHistory({ type, section, dy15, weightFilter, count: results.length });
    }
    
    displaySearchResults(results);
}

// Сброс поиска
function resetSearch() {
    document.getElementById('searchType').value = '';
    document.getElementById('searchSection').value = '';
    document.getElementById('searchDy15').value = '';
    document.getElementById('searchWeight').value = '';
    document.getElementById('searchResults').innerHTML = '';
    comparisonList = [];
    document.getElementById('comparisonActions').style.display = 'none';
}

// Отображение результатов поиска
function displaySearchResults(results) {
    const container = document.getElementById('searchResults');
    
    if (results.length === 0) {
        container.innerHTML = '<div class="no-results">Кабели не найдены. Попробуйте изменить параметры поиска.</div>';
        return;
    }
    
    let html = '';
    results.forEach((cable, index) => {
        const isFavorite = favorites.some(f => 
            f.type === cable.type && f.section === cable.section
        );
        const weightClass = getWeightClass(cable.weight);
        
        html += `
            <div class="result-card">
                <input type="checkbox" class="compare-checkbox" onchange="toggleCompare(${cables.indexOf(cable)})">
                <button class="favorite-btn ${isFavorite ? 'active' : ''}" onclick="toggleFavorite(${cables.indexOf(cable)})">
                    ${isFavorite ? '⭐' : '☆'}
                </button>
                <div class="result-header">${cable.type} ${cable.section}</div>
                <div class="result-info">
                    <div class="info-item">
                        <div class="info-label">Наружный диаметр</div>
                        <div class="info-value">${cable.diameter} мм</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Dy 15</div>
                        <div class="info-value">${cable.dy15 || '—'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Вес (кг/км)</div>
                        <div class="info-value ${weightClass}">${cable.weight || '—'}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">М/Р</div>
                        <div class="info-value">${cable.protectionMR}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Код (DKC) М/Р</div>
                        <div class="info-value">${cable.linkMR ? `<a href="${cable.linkMR}" target="_blank" class="code-link">${cable.codeMR}</a>` : cable.codeMR}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">ГФ</div>
                        <div class="info-value">${cable.protectionGF}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Код (DKC) ГФ</div>
                        <div class="info-value">${cable.linkGF ? `<a href="${cable.linkGF}" target="_blank" class="code-link">${cable.codeGF}</a>` : cable.codeGF}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">ТР</div>
                        <div class="info-value">${cable.protectionTR}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Код (DKC) ТР</div>
                        <div class="info-value">${cable.linkTR ? `<a href="${cable.linkTR}" target="_blank" class="code-link">${cable.codeTR}</a>` : cable.codeTR}</div>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Избранное
async function toggleFavorite(index) {
    const cable = cables[index];
    const favIndex = favorites.findIndex(f => 
        f.type === cable.type && f.section === cable.section
    );
    
    if (favIndex >= 0) {
        favorites.splice(favIndex, 1);
        showNotification('Удалено из избранного');
    } else {
        favorites.push(cable);
        showNotification('Добавлено в избранное');
    }
    
    await saveFavorites();
    searchCables();
}

function displayFavorites() {
    const container = document.getElementById('favoritesList');
    
    if (favorites.length === 0) {
        container.innerHTML = '<div class="no-results">Нет избранных кабелей</div>';
        return;
    }
    
    displaySearchResults(favorites);
    container.innerHTML = document.getElementById('searchResults').innerHTML.replace(/searchResults/g, 'favoritesList');
}

// Калькулятор
function updateCalcCableList() {
    const select = document.getElementById('calcCable');
    select.innerHTML = '<option value="">-- Выберите кабель --</option>';
    
    cables.forEach((cable, index) => {
        select.innerHTML += `<option value="${index}">${cable.type} ${cable.section} (${cable.weight} кг/км)</option>`;
    });
}

function calculateWeight() {
    const cableIndex = document.getElementById('calcCable').value;
    const length = parseFloat(document.getElementById('calcLength').value);
    
    if (!cableIndex || !length) {
        showNotification('Выберите кабель и введите длину!', 'error');
        return;
    }
    
    const cable = cables[cableIndex];
    const totalWeight = (cable.weight * length / 1000).toFixed(2);
    
    document.getElementById('calcResult').innerHTML = `
        ${totalWeight} кг<br>
        <small style="font-size: 16px;">(${cable.type} ${cable.section}, ${length}м)</small>
    `;
}

// История поисков
async function addToHistory(search) {
    search.timestamp = new Date().toLocaleString('ru-RU');
    searchHistory.unshift(search);
    
    if (searchHistory.length > 20) {
        searchHistory = searchHistory.slice(0, 20);
    }
    
    await saveHistory();
}

function displayHistory() {
    const container = document.getElementById('historyList');
    
    if (searchHistory.length === 0) {
        container.innerHTML = '<div class="no-results">История пуста</div>';
        return;
    }
    
    let html = '';
    searchHistory.forEach((item, index) => {
        let searchText = [];
        if (item.type) searchText.push(`Тип: ${item.type}`);
        if (item.section) searchText.push(`Сечение: ${item.section}`);
        if (item.dy15) searchText.push(`Dy15: ${item.dy15}`);
        if (item.weightFilter) searchText.push(`Вес: ${item.weightFilter}`);
        
        html += `
            <div class="history-item" onclick="restoreSearch(${index})">
                <div>
                    <strong>${searchText.join(', ')}</strong><br>
                    <small>${item.timestamp} • Найдено: ${item.count}</small>
                </div>
                <div>🔄</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function restoreSearch(index) {
    const search = searchHistory[index];
    
    document.getElementById('searchType').value = search.type || '';
    document.getElementById('searchSection').value = search.section || '';
    document.getElementById('searchDy15').value = search.dy15 || '';
    document.getElementById('searchWeight').value = search.weightFilter || '';
    
    switchTab(0);
    searchCables();
}

async function clearHistory() {
    if (confirm('Очистить всю историю поисков?')) {
        searchHistory = [];
        await saveHistory();
        displayHistory();
        showNotification('История очищена');
    }
}

// Сравнение
function toggleCompare(index) {
    const cableIndex = comparisonList.indexOf(index);
    
    if (cableIndex >= 0) {
        comparisonList.splice(cableIndex, 1);
    } else {
        comparisonList.push(index);
    }
    
    document.getElementById('comparisonActions').style.display = 
        comparisonList.length > 0 ? 'flex' : 'none';
}

function compareSelected() {
    if (comparisonList.length < 2) {
        showNotification('Выберите минимум 2 кабеля для сравнения!', 'error');
        return;
    }
    
    switchTab(3);
    displayComparison();
}

function clearComparison() {
    comparisonList = [];
    document.getElementById('comparisonActions').style.display = 'none';
    document.querySelectorAll('.compare-checkbox').forEach(cb => cb.checked = false);
}

function displayComparison() {
    const container = document.getElementById('comparisonTable');
    
    if (comparisonList.length === 0) {
        container.innerHTML = '<div class="no-results">Выберите кабели для сравнения на вкладке "Подбор кабеля"</div>';
        return;
    }
    
    const selectedCables = comparisonList.map(i => cables[i]);
    
    let html = '<table><thead><tr><th>Параметр</th>';
    selectedCables.forEach((cable, i) => {
        html += `<th>Кабель ${i + 1}</th>`;
    });
    html += '</tr></thead><tbody>';
    
    const fields = [
        { label: 'Тип', key: 'type' },
        { label: 'Сечение', key: 'section' },
        { label: 'Диаметр (мм)', key: 'diameter' },
        { label: 'Dy 15', key: 'dy15' },
        { label: 'Вес (кг/км)', key: 'weight', colored: true },
        { label: 'М/Р', key: 'protectionMR' },
        { label: 'Код М/Р', key: 'codeMR' },
        { label: 'ГФ', key: 'protectionGF' },
        { label: 'Код ГФ', key: 'codeGF' },
        { label: 'ТР', key: 'protectionTR' },
        { label: 'Код ТР', key: 'codeTR' }
    ];
    
    fields.forEach(field => {
        html += `<tr><td><strong>${field.label}</strong></td>`;
        selectedCables.forEach(cable => {
            const value = cable[field.key] || '—';
            const className = field.colored ? getWeightClass(value) : '';
            html += `<td class="${className}">${value}</td>`;
        });
        html += '</tr>';
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// Экспорт в Excel
function exportToExcel() {
    if (cables.length === 0) {
        showNotification('Нет данных для экспорта!', 'error');
        return;
    }

    const data = cables.map(cable => ({
        'Тип': cable.type,
        'Сечение': cable.section,
        'Диаметр (мм)': cable.diameter,
        'Dy 15': cable.dy15,
        'Вес (кг/км)': cable.weight,
        'М/Р': cable.protectionMR,
        'Код (DKC) М/Р': cable.codeMR,
        'Ссылка М/Р': cable.linkMR,
        'ГФ': cable.protectionGF,
        'Код (DKC) ГФ': cable.codeGF,
        'Ссылка ГФ': cable.linkGF,
        'ТР': cable.protectionTR,
        'Код (DKC) ТР': cable.codeTR,
        'Ссылка ТР': cable.linkTR
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Кабели');
    
    const fileName = `Кабели_DKC_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, fileName);
    showNotification('Данные экспортированы в Excel');
}

// Импорт из Excel
async function importFromExcel() {
    const fileInput = document.getElementById('importFile');
    const file = fileInput.files[0];
    
    if (!file) {
        showNotification('Выберите файл для импорта!', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = async function(e) {
        try {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(firstSheet);
            
            let importCount = 0;
            jsonData.forEach(row => {
                const cable = {
                    type: row['Тип'] || '',
                    section: row['Сечение'] || '',
                    diameter: parseFloat(row['Диаметр (мм)']) || 0,
                    dy15: row['Dy 15'] || '',
                    weight: parseFloat(row['Вес (кг/км)']) || 0,
                    protectionMR: row['М/Р'] || '',
                    codeMR: row['Код (DKC) М/Р'] || row['Код М/Р'] || '',
                    linkMR: row['Ссылка М/Р'] || '',
                    protectionGF: row['ГФ'] || '',
                    codeGF: row['Код (DKC) ГФ'] || row['Код ГФ'] || '',
                    linkGF: row['Ссылка ГФ'] || '',
                    protectionTR: row['ТР'] || '',
                    codeTR: row['Код (DKC) ТР'] || row['Код ТР'] || '',
                    linkTR: row['Ссылка ТР'] || ''
                };
                
                if (cable.type && cable.section) {
                    cables.push(cable);
                    importCount++;
                }
            });
            
            await saveCables();
            displayCables();
            updateSearchFilters();
            updateStats();
            updateCalcCableList();
            
            showNotification(`Импортировано кабелей: ${importCount}`);
            fileInput.value = '';
        } catch (error) {
            showNotification('Ошибка при импорте файла! Проверьте формат.', 'error');
            console.error(error);
        }
    };
    
    reader.readAsArrayBuffer(file);
}

// Печать результатов
function printResults() {
    window.print();
}

// Обновление статистики
function updateStats() {
    document.getElementById('totalCables').textContent = cables.length;
}
