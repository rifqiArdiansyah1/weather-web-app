const API_KEY = "CPTSM23RD82ULQN34BDX63YQB";

const form = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const weatherContent = document.getElementById('weather-content');
const animationContainer = document.getElementById('weather-animation-container');

// Elements to update
const locNameEl = document.getElementById('location-name');
const curTempEl = document.getElementById('current-temp');
const curCondEl = document.getElementById('current-condition');
const tomCondEl = document.getElementById('tomorrow-condition');
const windSpeedEl = document.getElementById('wind-speed');
const windDirEl = document.getElementById('wind-dir');
const humidityEl = document.getElementById('humidity');
const precipEl = document.getElementById('precip-prob');
const pressureEl = document.getElementById('pressure');
const timelineEl = document.getElementById('hourly-timeline');

// ============================================================
//  FEATURE 1: TYPING ANIMATION ON PLACEHOLDER
// ============================================================
const cityList = [
    "Jakarta", "London", "Tokyo", "New York", "Paris",
    "Lamongan", "Bojonegoro", "Surabaya", "Bandung",
    "Semarang", "Malang", "Yogyakarta", "Dubai", "Sydney"
];

let cityIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typePlaceholder() {
    // Don't animate if user is actively typing in the input
    if (document.activeElement === searchInput) {
        setTimeout(typePlaceholder, 500);
        return;
    }

    const currentCity = cityList[cityIndex];

    if (!isDeleting) {
        // Typing forward
        charIndex++;
        searchInput.setAttribute('placeholder', 'Cari: ' + currentCity.substring(0, charIndex));
        if (charIndex === currentCity.length) {
            // Pause at full word before deleting
            isDeleting = true;
            setTimeout(typePlaceholder, 1800);
        } else {
            setTimeout(typePlaceholder, 100);
        }
    } else {
        // Deleting backward
        charIndex--;
        searchInput.setAttribute('placeholder', 'Cari: ' + currentCity.substring(0, charIndex));
        if (charIndex === 0) {
            isDeleting = false;
            cityIndex = (cityIndex + 1) % cityList.length;
            setTimeout(typePlaceholder, 400);
        } else {
            setTimeout(typePlaceholder, 55);
        }
    }
}

// Start typing animation on load
typePlaceholder();


// ============================================================
//  WEATHER ICONS MAP
// ============================================================
const weatherIcons = {
    'snow': '❄️', 'rain': '🌧️', 'fog': '🌫️', 'wind': '💨',
    'cloudy': '☁️', 'partly-cloudy-day': '⛅', 'partly-cloudy-night': '🌥️',
    'clear-day': '☀️', 'clear-night': '🌙', 'showers-day': '🌦️',
    'showers-night': '🌧️', 'thunder-rain': '⛈️', 'thunder-showers-day': '⛈️',
    'thunder-showers-night': '⛈️', 'sleet': '🌨️'
};

function getIcon(iconCode) {
    return weatherIcons[iconCode] || '🌤️';
}

function getWindDirection(deg) {
    if (deg === undefined || deg === null) return "-";
    const val = Math.floor((deg / 22.5) + 0.5);
    const arr = ["Utara", "Utara Timur Laut", "Timur Laut", "Timur Timur Laut", "Timur", "Timur Tenggara", "Tenggara", "Selatan Tenggara", "Selatan", "Selatan Barat Daya", "Barat Daya", "Barat Barat Daya", "Barat", "Barat Barat Laut", "Barat Laut", "Utara Barat Laut"];
    return arr[(val % 16)];
}


// ============================================================
//  FEATURE 2: DYNAMIC BACKGROUND THEMES
// ============================================================
const themeMap = {
    'clear-day':            'theme-clear-day',
    'clear-night':          'theme-clear-night',
    'partly-cloudy-day':    'theme-partly-cloudy-day',
    'partly-cloudy-night':  'theme-partly-cloudy-night',
    'cloudy':               'theme-cloudy',
    'rain':                 'theme-rain',
    'showers-day':          'theme-rain',
    'showers-night':        'theme-rain',
    'thunder-rain':         'theme-rain',
    'thunder-showers-day':  'theme-rain',
    'thunder-showers-night':'theme-rain',
    'snow':                 'theme-snow',
    'sleet':                'theme-snow',
    'fog':                  'theme-fog',
    'wind':                 'theme-wind',
};

const allThemeClasses = [
    'theme-clear-day', 'theme-clear-night',
    'theme-partly-cloudy-day', 'theme-partly-cloudy-night',
    'theme-cloudy', 'theme-rain', 'theme-snow', 'theme-fog', 'theme-wind'
];

function applyTheme(iconCode) {
    // Remove all existing theme classes
    document.body.classList.remove(...allThemeClasses);
    const newTheme = themeMap[iconCode] || 'theme-cloudy';
    document.body.classList.add(newTheme);
}


// ============================================================
//  FEATURE 3: WEATHER PARTICLE ANIMATIONS
// ============================================================
function rand(min, max) {
    return Math.random() * (max - min) + min;
}

function renderWeatherAnimation(iconCode) {
    animationContainer.innerHTML = '';

    if (iconCode === 'rain' || iconCode.includes('shower') || iconCode.includes('thunder')) {
        // Generate rain drops
        const count = 80;
        for (let i = 0; i < count; i++) {
            const drop = document.createElement('div');
            drop.className = 'rain-drop';
            const height = rand(15, 40);
            drop.style.cssText = `
                left: ${rand(0, 100)}%;
                height: ${height}px;
                animation-duration: ${rand(0.6, 1.2)}s;
                animation-delay: ${rand(0, 2)}s;
                opacity: ${rand(0.4, 0.9)};
            `;
            animationContainer.appendChild(drop);
        }
    } else if (iconCode === 'snow' || iconCode === 'sleet') {
        // Generate snowflakes
        const count = 60;
        for (let i = 0; i < count; i++) {
            const flake = document.createElement('div');
            flake.className = 'snow-flake';
            const size = rand(4, 10);
            flake.style.cssText = `
                left: ${rand(0, 100)}%;
                width: ${size}px;
                height: ${size}px;
                animation-duration: ${rand(3, 7)}s;
                animation-delay: ${rand(0, 5)}s;
            `;
            animationContainer.appendChild(flake);
        }
    } else if (iconCode === 'cloudy' || iconCode === 'partly-cloudy-day' || iconCode === 'partly-cloudy-night') {
        // Generate drifting cloud blobs
        const count = 6;
        for (let i = 0; i < count; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'cloud-particle';
            const size = rand(150, 350);
            cloud.style.cssText = `
                top: ${rand(5, 60)}%;
                width: ${size}px;
                height: ${size * 0.6}px;
                animation-duration: ${rand(25, 55)}s;
                animation-delay: ${rand(-20, 0)}s;
            `;
            animationContainer.appendChild(cloud);
        }
    } else if (iconCode === 'fog') {
        // Generate fog strips
        const count = 5;
        for (let i = 0; i < count; i++) {
            const fog = document.createElement('div');
            fog.className = 'fog-strip';
            const height = rand(80, 160);
            fog.style.cssText = `
                top: ${rand(10, 80)}%;
                height: ${height}px;
                animation-duration: ${rand(6, 14)}s;
                animation-delay: ${rand(0, 4)}s;
                opacity: ${rand(0.3, 0.7)};
            `;
            animationContainer.appendChild(fog);
        }
    } else if (iconCode === 'clear-day') {
        // Sun glow rays
        for (let i = 0; i < 3; i++) {
            const ray = document.createElement('div');
            ray.className = 'sun-ray';
            const size = rand(200, 500);
            ray.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                top: ${rand(-80, -20)}px;
                right: ${rand(-80, -20)}px;
                animation-duration: ${rand(3, 6)}s;
                animation-delay: ${rand(0, 2)}s;
            `;
            animationContainer.appendChild(ray);
        }
    } else if (iconCode === 'clear-night') {
        // Twinkling stars
        const count = 120;
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.className = 'star-particle';
            const size = rand(1, 3);
            star.style.cssText = `
                left: ${rand(0, 100)}%;
                top: ${rand(0, 75)}%;
                width: ${size}px;
                height: ${size}px;
                animation-duration: ${rand(1.5, 4)}s;
                animation-delay: ${rand(0, 3)}s;
            `;
            animationContainer.appendChild(star);
        }
    }
}


// ============================================================
//  MAIN: UPDATE THEME + ANIMATION (called after fetch)
// ============================================================
function updateThemeAndAnimation(iconCode) {
    applyTheme(iconCode);
    renderWeatherAnimation(iconCode);
}


// ============================================================
//  FORM SUBMIT
// ============================================================
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const location = searchInput.value.trim();
    if (!location) return;
    fetchWeatherData(location);
});

async function fetchWeatherData(location) {
    weatherContent.classList.add('hidden');
    errorEl.classList.add('hidden');
    loadingEl.classList.remove('hidden');

    try {
        const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}/yesterday/next2days?unitGroup=metric&include=hours,days,current&key=${API_KEY}&contentType=json`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Gagal memuat cuaca untuk "${location}". (Mungkin kota tidak ditemukan)`);
        }
        const data = await response.json();
        updateUI(data);
    } catch (err) {
        errorEl.textContent = err.message;
        errorEl.classList.remove('hidden');
    } finally {
        loadingEl.classList.add('hidden');
    }
}

function updateUI(data) {
    const current = data.currentConditions;
    const days = data.days;

    let today = days[1];
    let tomorrow = days[2];
    if (!today) today = days[0];
    if (!tomorrow) tomorrow = days[1] || today;

    // Main Card
    locNameEl.textContent = data.resolvedAddress;
    curTempEl.textContent = Math.round(current.temp);
    curCondEl.textContent = current.conditions;
    tomCondEl.textContent = tomorrow.description || "Data esok hari tidak tersedia.";

    // Details
    windSpeedEl.textContent = `${Math.round(current.windspeed || 0)} km/h`;
    windDirEl.textContent = getWindDirection(current.winddir);
    humidityEl.textContent = `${Math.round(current.humidity || 0)}%`;
    precipEl.textContent = `${Math.round(current.precipprob || 0)}%`;
    pressureEl.textContent = `${Math.round(current.pressure || 0)} hPa`;

    // Timeline 48h
    generateTimeline(days);

    // Apply background theme + weather particles
    updateThemeAndAnimation(current.icon);

    weatherContent.classList.remove('hidden');
}

function generateTimeline(days) {
    timelineEl.innerHTML = '';
    const allHours = [];

    days.forEach(day => {
        if (day.hours) {
            day.hours.forEach(hour => {
                allHours.push({
                    datetimeEpoch: hour.datetimeEpoch,
                    time: hour.datetime.substring(0, 5),
                    temp: Math.round(hour.temp),
                    icon: hour.icon,
                    isNow: false
                });
            });
        }
    });

    const currentEpoch = Math.floor(Date.now() / 1000);
    let closestIndex = 0;
    let minDiff = Infinity;

    allHours.forEach((hour, index) => {
        const diff = Math.abs(hour.datetimeEpoch - currentEpoch);
        if (diff < minDiff) {
            minDiff = diff;
            closestIndex = index;
        }
    });

    if (allHours[closestIndex]) {
        allHours[closestIndex].isNow = true;
        allHours[closestIndex].time = "Sekarang";
    }

    const startIndex = Math.max(0, closestIndex - 24);
    const endIndex = Math.min(allHours.length - 1, closestIndex + 24);
    const timelineHours = allHours.slice(startIndex, endIndex + 1);

    timelineHours.forEach(hour => {
        const item = document.createElement('div');
        item.className = `hourly-item ${hour.isNow ? 'now' : ''}`;
        item.innerHTML = `
            <span class="hourly-time">${hour.time}</span>
            <span class="hourly-icon">${getIcon(hour.icon)}</span>
            <span class="hourly-temp">${hour.temp}°</span>
        `;
        timelineEl.appendChild(item);
    });

    setTimeout(() => {
        const nowEl = timelineEl.querySelector('.now');
        if (nowEl) {
            const containerCenter = timelineEl.offsetWidth / 2;
            const itemCenter = nowEl.offsetLeft + (nowEl.offsetWidth / 2);
            timelineEl.scrollLeft = itemCenter - containerCenter;
        }
    }, 50);
}
