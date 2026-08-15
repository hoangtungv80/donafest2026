/* =============================================
   DONAFEST 2026 — Minigame & Arena Engine
   Realtime Cloud Synchronization Engine (Compact JSONBlob Sync Engine)
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // Preloader Dismissal Safety
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('loaded');
        setTimeout(() => { preloader.style.display = 'none'; }, 500);
    }

    // ====== 1. PASSCODE PORTAL PROTECTION ======
    const portalLockOverlay = document.getElementById('portalLockOverlay');
    const portalPassInput = document.getElementById('portalPassInput');
    const portalPassBtn = document.getElementById('portalPassBtn');

    function checkPortalUnlock() {
        const isUnlocked = sessionStorage.getItem('dnt_portal_unlocked');
        if (isUnlocked === 'true') {
            if (portalLockOverlay) {
                portalLockOverlay.classList.add('unlocked');
                portalLockOverlay.style.display = 'none';
            }
        } else {
            if (portalLockOverlay) {
                portalLockOverlay.classList.remove('unlocked');
                portalLockOverlay.style.display = 'flex';
            }
        }
    }
    checkPortalUnlock();

    if (portalPassBtn) {
        portalPassBtn.addEventListener('click', (e) => {
            e.preventDefault();
            verifyPortalPasscode();
        });
    }

    if (portalPassInput) {
        portalPassInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                verifyPortalPasscode();
            }
        });
    }

    function verifyPortalPasscode() {
        const rawVal = portalPassInput ? portalPassInput.value.trim() : '';
        const val = rawVal.replace(/\s+/g, '').toUpperCase();
        if (val === '2026DNT' || val === 'DNT2026') {
            sessionStorage.setItem('dnt_portal_unlocked', 'true');
            if (portalLockOverlay) {
                portalLockOverlay.classList.add('unlocked');
                portalLockOverlay.style.display = 'none';
            }
            try { playSound('win'); } catch(err) {}
        } else {
            alert('❌ Mã truy cập không đúng! Vui lòng nhập mã: 2026DNT');
        }
    }


    // ====== 2. CATEGORIES DEFINITION ======
    const DEFAULT_CATEGORIES = [
        { id: 'car_choice', icon: '🏎️', title: 'Car of Choice', desc: 'Xe được yêu thích nhất toàn đoàn DONAFEST 2026' },
        { id: 'best_style', icon: '✨', title: 'Best of Style', desc: 'Xe có gu thẩm mỹ & phối đồ độ đẹp mắt nhất' },
        { id: 'unique_abs', icon: '🌀', title: 'Unique Absolute', desc: 'Xe có concept độ độc bản & khác biệt nhất' },
        { id: 'too_loud', icon: '🔊', title: 'Too Loud? Too Old!', desc: 'Xe có âm thanh động cơ & ống xả rực rỡ nhất' },
        { id: 'best_build', icon: '🛠️', title: 'Best Build', desc: 'Bản độ ấn tượng & công phu nhất' },
        { id: 'realism_bro', icon: '🛡️', title: 'Realism Bro', desc: 'Xe độ thực dụng, tối ưu cảm giác lái hàng ngày' },
        { id: 'lord_lo', icon: '🤪', title: 'Lord of the Lỏ', desc: 'Xe lỏ nhất, đem lại tiếng cười & niềm vui cho anh em' },
        { id: 'street_fighter', icon: '⚡', title: 'DNT Street Fighter', desc: 'Chiến thần đường phố năng động' },
        { id: 'endurance_obj', icon: '🏗️', title: 'Endurance Objector', desc: 'Xe nằm cầu nhiều nhất sự kiện' },
        { id: 'cows_bell', icon: '🔔', title: "Cow's bell", desc: 'Thần đằng đáng yêu của team DONATEAM' },
        { id: 'cleanest', icon: '💎', title: 'Cleanest', desc: 'Xe có tổng thể hài hoà & hoàn thiện tỉ mỉ nhất' },
        { id: 'techguy', icon: '💻', title: 'Techguy', desc: 'Xe sở hữu nhiều trang bị công nghệ hiện đại nhất' }
    ];

    // ====== 3. OFFICIAL 30 PARTICIPANTS ROSTER ======
    const OFFICIAL_30_CARS = [
        { id: 'car-1', name: 'Hoàng Tùng', model: 'BMW 640i F06 2012', plate: 'DNT-01', team: 'DONATEAM', color: '#1e1e1e', img: 'images/cars/car-1.jpg', desc: 'BMW 640i F06 Gran Coupe 2012', votes: {} },
        { id: 'car-2', name: 'Trịnh Quốc Trung', model: 'Honda Civic FE', plate: 'DNT-02', team: 'DONATEAM', color: '#f5f6fa', img: 'images/cars/car-2.jpg', desc: 'Honda Civic FE thể thao', votes: {} },
        { id: 'car-3', name: 'Ngô Quang Nghĩa', model: 'BMW 520i Cát Hải', plate: 'DNT-03', team: 'DONATEAM', color: '#546de5', img: 'images/cars/car-3.jpg', desc: 'BMW 520i Cát Hải sang trọng', votes: {} },
        { id: 'car-4', name: 'Nguyễn Quốc Hưng', model: 'BMW F30 B48 2016', plate: 'DNT-04', team: 'DONATEAM', color: '#00d2d3', img: 'images/cars/car-4.jpg', desc: 'BMW F30 B48 động cơ 2016', votes: {} },
        { id: 'car-5', name: 'Nguyễn Thu Đức Trung', model: 'Honda Civic RS 2023', plate: 'DNT-05', team: 'DONATEAM', color: '#ffffff', img: 'images/cars/car-5.jpg', desc: 'Honda Civic RS 2023 cá tính', votes: {} },
        { id: 'car-6', name: 'Nguyễn Khánh Duy', model: 'Vinfast VF3 2025', plate: 'DNT-06', team: 'DONATEAM', color: '#ff9f43', img: 'images/cars/car-6.jpg', desc: 'VinFast VF3 điện đô thị 2025', votes: {} },
        { id: 'car-7', name: 'Vũ Tùng Dương', model: 'Vinfast VF3 2025', plate: 'DNT-07', team: 'DONATEAM', color: '#ee5253', img: 'images/cars/car-7.jpg', desc: 'VinFast VF3 2025', votes: {} },
        { id: 'car-8', name: 'Nguyễn Văn Tùng', model: 'Honda Civic RS 2020', plate: 'DNT-08', team: 'DONATEAM', color: '#ff0000', img: 'images/cars/car-8.jpg', desc: 'Honda Civic RS 2020 rực rỡ', votes: {} },
        { id: 'car-9', name: 'Nguyễn Thanh Tùng', model: 'Honda Civic Gen8', plate: 'DNT-09', team: 'DONATEAM', color: '#2f3640', img: 'images/cars/car-9.jpg', desc: 'Honda Civic Gen8 cá tính', votes: {} },
        { id: 'car-10', name: 'Trương Hùng', model: 'Vinfast Lux A Plus 2021', plate: 'DNT-10', team: 'DONATEAM', color: '#2d3436', img: 'images/cars/car-10.jpg', desc: 'VinFast Lux A2.0 Plus 2021', votes: {} },
        { id: 'car-11', name: 'Quân Vũ', model: 'Ford Raptor 2023', plate: 'DNT-11', team: 'DONATEAM', color: '#353b48', img: 'images/cars/car-11.jpg', desc: 'Ford Ranger Raptor 2023 hầm hố', votes: {} },
        { id: 'car-12', name: 'Ngô Tiến Long', model: 'Honda Civic Gen 10', plate: 'DNT-12', team: 'DONATEAM', color: '#dcdde1', img: 'images/cars/car-12.jpg', desc: 'Honda Civic Gen 10 tinh tế', votes: {} },
        { id: 'car-13', name: 'Đàm Xuân Tụ', model: 'Honda Civic Gen8 2009', plate: 'DNT-13', team: 'DONATEAM', color: '#576574', img: 'images/cars/car-13.jpg', desc: 'Honda Civic Gen8 2009 kì cựu', votes: {} },
        { id: 'car-14', name: 'Nguyễn Việt Anh', model: 'BMW 330 G20', plate: 'DNT-14', team: 'DONATEAM', color: '#833471', img: 'images/cars/car-14.jpg', desc: 'BMW 330i G20 thể thao', votes: {} },
        { id: 'car-15', name: 'Đào Mạnh Tuấn', model: 'Honda Accord Gen 8', plate: 'DNT-15', team: 'DONATEAM', color: '#c8d6e5', img: 'images/cars/car-15.jpg', desc: 'Honda Accord Gen 8 thanh lịch', votes: {} },
        { id: 'car-16', name: 'Đặng Thành Luân', model: 'Honda Civic RS Gen 11', plate: 'DNT-16', team: 'DONATEAM', color: '#8395a7', img: 'images/cars/car-16.jpg', desc: 'Honda Civic RS Gen 11 cuốn hút', votes: {} },
        { id: 'car-17', name: 'Đoàn Trọng Huỳnh', model: 'Mini Cooper R53', plate: 'DNT-17', team: 'DONATEAM', color: '#ff6b6b', img: 'images/cars/car-17.jpg', desc: 'Mini Cooper R53 nổi bật', votes: {} },
        { id: 'car-18', name: 'Nguyễn Huânn', model: 'Vinfast VF3', plate: 'DNT-18', team: 'DONATEAM', color: '#f78fb3', img: 'images/cars/car-18.jpg', desc: 'VinFast VF3 thiết kế hiện đại', votes: {} },
        { id: 'car-19', name: 'Kiệt Đinh', model: 'BMW F30', plate: 'DNT-19', team: 'DONATEAM', color: '#b71540', img: 'images/cars/car-19.jpg', desc: 'BMW F30 phong cách', votes: {} },
        { id: 'car-20', name: 'Khánh Nguyễn', model: 'BMW F32', plate: 'DNT-20', team: 'DONATEAM', color: '#e67e22', img: 'images/cars/car-20.jpg', desc: 'BMW F32 Coupe rực rỡ', votes: {} },
        { id: 'car-21', name: 'Lê Trần Trung Hiếu', model: 'BMW F30 B48 2017', plate: 'DNT-21', team: 'DONATEAM', color: '#f1f2f6', img: 'images/cars/car-21.jpg', desc: 'BMW F30 B48 2017', votes: {} },
        { id: 'car-22', name: 'Lê Tuấn Anh', model: 'Honda City', plate: 'DNT-22', team: 'DONATEAM', color: '#718093', img: 'images/cars/car-22.jpg', desc: 'Honda City linh hoạt', votes: {} },
        { id: 'car-23', name: 'Đặng Đức Anh', model: 'Mercedes C300', plate: 'DNT-23', team: 'DONATEAM', color: '#95a5a6', img: 'images/cars/car-23.jpg', desc: 'Mercedes-Benz C300 AMG', votes: {} },
        { id: 'car-24', name: 'Long Hoàng Huy', model: 'BMW 520i F10', plate: 'DNT-24', team: 'DONATEAM', color: '#3c6382', img: 'images/cars/car-24.jpg', desc: 'BMW 520i F10 sang trọng', votes: {} },
        { id: 'car-25', name: 'Lộc Speed', model: 'Mercedes GLK', plate: 'DNT-25', team: 'DONATEAM', color: '#10ac84', img: 'images/donafest.jpg', desc: 'Mercedes GLK phong cách', votes: {} },
        { id: 'car-26', name: 'Hải Dớ', model: 'BMW 735i', plate: 'DNT-26', team: 'DONATEAM', color: '#546de5', img: 'images/donagala.jpg', desc: 'BMW 735i cá tính', votes: {} },
        { id: 'car-29', name: 'Dũng Bều', model: 'Honda City GM6', plate: 'DNT-29', team: 'DONATEAM', color: '#c8d6e5', img: 'images/venue.jpg', desc: 'Honda City GM6 thể thao', votes: {} },
        { id: 'car-30', name: 'Mitto Chen', model: 'Mazda 3 Widebody', plate: 'DNT-30', team: 'DONATEAM', color: '#ee5253', img: 'images/donatrip.jpg', desc: 'Mazda 3 Widebody độc đáo', votes: {} },
        { id: 'car-31', name: 'Trương Tuấn Anh', model: 'BMW G20 2020', plate: 'DNT-31', team: 'DONATEAM', color: '#00d2d3', img: 'images/donagala.jpg', desc: 'BMW G20 2020 phong cách', votes: {} },
        { id: 'car-00', name: 'Trần Ngọc Hiếu', model: 'Vinfast MPV 7', plate: 'DNT-00', team: 'DONATEAM', color: '#10ac84', img: 'images/donafest.jpg', desc: 'Vinfast MPV 7 ấn tượng', votes: {} }
    ];
    const OFFICIAL_25_CARS = OFFICIAL_30_CARS;

    // ====== 4. STORAGE & CONFIG ======
    function getStoredData(key, defaultVal) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultVal;
        } catch(e) {
            return defaultVal;
        }
    }

    function setStoredData(key, val) {
        try {
            localStorage.setItem(key, JSON.stringify(val));
        } catch(e) {}
    }

    let carsData = OFFICIAL_25_CARS;
    let categoriesList = getStoredData('dnt_categories_order', DEFAULT_CATEGORIES);

    let leaderboardToggles = getStoredData('dnt_leaderboard_toggles', {
        garage: false,
        legend: false,
        passionate: false,
        parking: false,
        race_prizes: false,
        car_choice: false,
        best_style: false,
        unique_abs: false,
        too_loud: false,
        best_build: false,
        realism_bro: false,
        lord_lo: false,
        street_fighter: false,
        endurance_obj: false,
        cows_bell: false,
        cleanest: false,
        techguy: false
    });

    let raceWinnersHistory = getStoredData('dnt_race_winners_2026', []);
    let completedPrizes = getStoredData('dnt_completed_prizes_2026', {});
    let prizeQuotas = getStoredData('dnt_prize_quotas', { special: 1, first: 1, second: 2, third: 3, consolation: 5 });
    let raceDurationSec = getStoredData('dnt_race_duration_sec', 5);
    let racePrizesOrder = getStoredData('dnt_race_prizes_order', [
        { id: 'consolation', name: '🎁 GIẢI KHUYẾN KHÍCH', key: 'consolation' },
        { id: 'third', name: '🥉 GIẢI BA', key: 'third' },
        { id: 'second', name: '🥈 GIẢI NHÌ', key: 'second' },
        { id: 'first', name: '🥇 GIẢI NHẤT', key: 'first' },
        { id: 'special', name: '🏆 GIẢI ĐẶC BIỆT', key: 'special' }
    ]);

    let completedPrizes = getStoredData('dnt_completed_prizes_2026', {});
    let currentRacePrizeKey = 'consolation';

    let presentationOrder = getStoredData('dnt_presentation_order', [
        { id: 'voting', name: '🏆 Cổng Bình Chọn (12 Hạng Mục)' },
        { id: 'shoutout', name: '👑 Giải Vinh Danh Shoutout' },
        { id: 'parking', name: '🅿️ Cuộc Thi Đỗ Xe Nghệ Thuật' },
        { id: 'race', name: '🏎️ DNT Lucky Race (11 Slides)' }
    ]);

    const DEFAULT_AWARDS = [
        { id: 'award-1', title: 'Garage Làm Cho Vui Nhất', carId: 'car-1' },
        { id: 'award-2', title: 'DNT Legend (Xe Kì Cựu)', carId: 'car-1' },
        { id: 'award-3', title: 'DNT Passionate (Tâm Huyết)', carId: 'car-2' },
        { id: 'award-4', title: 'Giải Nhất Đỗ Xe Nghệ Thuật', carId: 'car-1' },
        { id: 'award-5', title: 'Giải Nhì Đỗ Xe Nghệ Thuật', carId: 'car-2' },
        { id: 'award-6', title: 'Giải Ba Đỗ Xe Nghệ Thuật', carId: 'car-3' }
    ];

    let awardsConfig = getStoredData('dnt_awards_config_2026', DEFAULT_AWARDS);

    let raceWinnersHistory = getStoredData('dnt_race_winners_2026', []);

    // DEVICE FINGERPRINT & RESET VERSION TRACKING
    let deviceId = localStorage.getItem('dnt_device_id');
    if (!deviceId) {
        deviceId = 'dev-' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
        localStorage.setItem('dnt_device_id', deviceId);
    }
    let votedCategories = getStoredData('dnt_voted_cats_' + deviceId, {});
    // -1 = device has never synced resetVer from Cloud. On first sync,
    // store current cloud resetVer WITHOUT wiping votedCategories.
    const NEVER_SYNCED_RESET_VER = -1;
    let voteResetVersion = getStoredData('dnt_vote_reset_ver', NEVER_SYNCED_RESET_VER);

    // ====== FIREBASE REALTIME DATABASE ENGINE ======
    // Uses REST API directly — no SDK, no token, config is safe to be public
    const FB_URL = 'https://donafest2026-default-rtdb.asia-southeast1.firebasedatabase.app';

    let isCloudSyncing = false;

    async function fbGet(path) {
        const res = await fetch(`${FB_URL}/${path}.json`, { cache: 'no-store' });
        if (!res.ok) return null;
        return res.json();
    }

    async function fbSet(path, data) {
        await fetch(`${FB_URL}/${path}.json`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    async function fbPatch(path, data) {
        await fetch(`${FB_URL}/${path}.json`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
    }

    async function syncCloudData() {
        if (isCloudSyncing) return;
        isCloudSyncing = true;
        try {
            const cloudData = await fbGet('');
            if (!cloudData) { isCloudSyncing = false; return; }

            // 1. Reset version check — if cloud resetVer is higher or first sync, sync & reset lock if needed
            const cloudResetVer = cloudData.resetVer || 1;
            if (voteResetVersion === NEVER_SYNCED_RESET_VER || cloudResetVer > voteResetVersion) {
                voteResetVersion = cloudResetVer;
                setStoredData('dnt_vote_reset_ver', voteResetVersion);
                votedCategories = {};
                setStoredData('dnt_voted_cats_' + deviceId, {});
            }

            // 2. Sync votes — Firebase is ground truth
            const cloudVotes = cloudData.votes || {};
            carsData.forEach(car => {
                car.votes = cloudVotes[car.id] ? { ...cloudVotes[car.id] } : {};
            });
            setStoredData('dnt_cars_official_v3', carsData);

            // 3. Sync BQT config
            if (cloudData.toggles) {
                leaderboardToggles = cloudData.toggles;
                setStoredData('dnt_leaderboard_toggles', leaderboardToggles);
            }
            if (cloudData.awardsConfig !== undefined) {
                awardsConfig = Array.isArray(cloudData.awardsConfig) ? cloudData.awardsConfig : DEFAULT_AWARDS;
                setStoredData('dnt_awards_config_2026', awardsConfig);
            }
            if (cloudData.winners !== undefined) {
                raceWinnersHistory = Array.isArray(cloudData.winners) ? cloudData.winners : [];
                setStoredData('dnt_race_winners_2026', raceWinnersHistory);
            }
            if (cloudData.completed !== undefined) {
                completedPrizes = cloudData.completed || {};
                setStoredData('dnt_completed_prizes_2026', completedPrizes);
            }

            renderVotingSection();
            renderPublicLeaderboard();
            renderPublicRaceLeaderboard();
        } catch(e) {
            console.log('Firebase sync error:', e.message);
        } finally {
            isCloudSyncing = false;
        }
    }

    // Push only ONE vote count to Firebase (tiny atomic write)
    async function pushOneVote(carId, catId, newCount) {
        try {
            await fbSet(`votes/${carId}/${catId}`, newCount);
        } catch(e) {
            console.log('Firebase vote push error:', e.message);
        }
    }

    // Push BQT config (toggles, awards, race results, etc.)
    async function pushCloudData() {
        try {
            await fbPatch('', {
                resetVer: voteResetVersion,
                toggles: leaderboardToggles,
                awardsConfig: awardsConfig,
                winners: raceWinnersHistory,
                completed: completedPrizes
            });
        } catch(e) {
            console.log('Firebase config push error:', e.message);
        }
    }

    // Initial sync & 3s polling loop
    syncCloudData();
    setInterval(syncCloudData, 3000);


    // Web Audio Synth
    let soundEnabled = true;
    let audioCtx = null;

    function playSound(type) {
        if (!soundEnabled) return;
        try {
            if (!audioCtx) {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (audioCtx && audioCtx.state === 'suspended') {
                audioCtx.resume();
            }
            if (!audioCtx) return;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            const now = audioCtx.currentTime;
            if (type === 'beep') {
                osc.frequency.setValueAtTime(440, now);
                gain.gain.setValueAtTime(0.1, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
                osc.start(now);
                osc.stop(now + 0.15);
            } else if (type === 'go') {
                osc.frequency.setValueAtTime(880, now);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
                osc.start(now);
                osc.stop(now + 0.4);
            } else if (type === 'win') {
                const notes = [523.25, 659.25, 783.99, 1046.50];
                notes.forEach((freq, idx) => {
                    const noteOsc = audioCtx.createOscillator();
                    const noteGain = audioCtx.createGain();
                    noteOsc.connect(noteGain);
                    noteGain.connect(audioCtx.destination);
                    noteOsc.frequency.setValueAtTime(freq, now + idx * 0.1);
                    noteGain.gain.setValueAtTime(0.15, now + idx * 0.1);
                    noteGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.3);
                    noteOsc.start(now + idx * 0.1);
                    noteOsc.stop(now + idx * 0.1 + 0.3);
                });
            }
        } catch(e) {}
    }

    // ====== 5. NAVIGATION & TABS ======
    const tabBtns = document.querySelectorAll('.tab-btn, .nav-link[data-tab]');
    const tabSections = document.querySelectorAll('.game-tab-section');

    function switchTab(tabId) {
        tabSections.forEach(sec => sec.classList.remove('active'));
        tabBtns.forEach(btn => btn.classList.remove('active'));

        const targetSec = document.getElementById(tabId);
        if (targetSec) targetSec.classList.add('active');

        document.querySelectorAll(`[data-tab="${tabId}"], [data-tab-target="${tabId}"]`)
            .forEach(btn => btn.classList.add('active'));

        if (tabId === 'voting') {
            renderVotingSection();
        } else if (tabId === 'leaderboard') {
            renderPublicLeaderboard();
        } else if (tabId === 'race') {
            renderPublicRaceLeaderboard();
        }
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = btn.getAttribute('data-tab-target') || btn.getAttribute('data-tab');
            if (target) {
                e.preventDefault();
                switchTab(target);
            }
        });
    });

    // Sound Toggle
    const soundToggleBtn = document.getElementById('soundToggleBtn');
    if (soundToggleBtn) {
        soundToggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            soundEnabled = !soundEnabled;
            document.getElementById('soundIcon').textContent = soundEnabled ? '🔊' : '🔇';
        });
    }


    // ====== 6. 11-SLIDE SEQUENTIAL DNT LUCKY RACE PRESENTATION ENGINE ======
    const adminLaunchPresentationBtn = document.getElementById('adminLaunchPresentationBtn');
    const presentationOverlay = document.getElementById('presentationOverlay');
    const stageCloseBtn = document.getElementById('stageCloseBtn');
    const stagePrevSecBtn = document.getElementById('stagePrevSecBtn');
    const stageNextSecBtn = document.getElementById('stageNextSecBtn');
    const stagePrevSlideBtn = document.getElementById('stagePrevSlideBtn');
    const stageNextSlideBtn = document.getElementById('stageNextSlideBtn');
    const stageSectionIndicator = document.getElementById('stageSectionIndicator');
    const stageSlideIndicator = document.getElementById('stageSlideIndicator');
    const stageSlideContent = document.getElementById('stageSlideContent');

    let slideDeck = [];
    let currentSlideIndex = 0;

    // Helper: Generate 5-Panel Grand Showcase HTML
    function render5PanelsRaceShowcase(history) {
        if (!history || history.length === 0) {
            return `
                <div class="glass-card waiting-box-card" style="width:100%; max-width:800px;">
                    <div class="waiting-icon">🏆</div>
                    <h2 class="waiting-title">CHƯA CÓ KẾT QUẢ DNT LUCKY RACE</h2>
                    <p class="waiting-sub">Hãy tiến hành cuộc đua trên các slide trình chiếu để ghi nhận kết quả!</p>
                </div>
            `;
        }

        const prizePanels = [
            { key: 'special', title: '🏆 GIẢI ĐẶC BIỆT', cls: 'special' },
            { key: 'first', title: '🥇 GIẢI NHẤT', cls: 'first' },
            { key: 'second', title: '🥈 GIẢI NHÌ', cls: 'second' },
            { key: 'third', title: '🥉 GIẢI BA', cls: 'third' },
            { key: 'consolation', title: '🎁 GIẢI KHUYẾN KHÍCH', cls: 'consolation' }
        ];

        return `
            <div class="race-grand-showcase-grid">
                ${prizePanels.map(panel => {
                    const prizeObj = racePrizesOrder.find(p => p.key === panel.key);
                    const titleToMatch = prizeObj ? prizeObj.name : panel.title;

                    const panelWinners = history.filter(w => w.prize.includes(titleToMatch) || w.prize === titleToMatch);

                    return `
                        <div class="prize-panel-card ${panel.cls}">
                            <div class="prize-panel-header">
                                <span>${panel.title}</span>
                                <span class="prize-count-pill" style="font-size:0.8rem; opacity:0.8;">(${panelWinners.length} XE)</span>
                            </div>
                            <div class="panel-winners-list">
                                ${panelWinners.length > 0 ? panelWinners.map(w => {
                                    const carObj = carsData.find(c => c.id === w.carId || c.name === w.name) || {};
                                    const avatarImg = carObj.img || 'images/donafest.jpg';
                                    return `
                                        <div class="panel-winner-item">
                                            <div class="panel-winner-info">
                                                <div class="panel-winner-name">🏆 ${w.name}</div>
                                                <div class="panel-winner-model">🏎️ ${w.model}</div>
                                                <div class="panel-winner-plate">🏷️ Mã số: ${w.plate}</div>
                                            </div>
                                        </div>
                                    `;
                                }).join('') : `<p style="font-size:0.85rem; color:var(--text-muted); padding:10px 0;">Chưa diễn ra cuộc đua</p>`}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    function buildPresentationDeck() {
        const deck = [];

        // 3 SECTIONS FOR PRESENTATION STAGE
        // SECTION 1: LEADERBOARD VINH DANH (Dynamic Awards)
        const totalVinhSlides = awardsConfig.length > 0 ? awardsConfig.length : 1;
        if (awardsConfig.length === 0) {
            deck.push({
                sectionIndex: 0,
                sectionId: 'shoutout',
                sectionName: 'Phần 1/3: 👑 LEADERBOARD VINH DANH',
                slideInSecIndex: 0,
                slidesInSecTotal: 1,
                slideTitle: '👑 LEADERBOARD VINH DANH',
                awardDesc: 'Chưa cấu hình giải vinh danh nào.',
                winnerName: 'Chưa công bố',
                winnerModel: '',
                winnerPlate: '',
                winnerImg: 'images/donafest.jpg'
            });
        } else {
            awardsConfig.forEach((award, idx) => {
                const car = carsData.find(c => c.id === award.carId);
                deck.push({
                    sectionIndex: 0,
                    sectionId: 'shoutout',
                    sectionName: 'Phần 1/3: 👑 LEADERBOARD VINH DANH',
                    slideInSecIndex: idx,
                    slidesInSecTotal: totalVinhSlides,
                    slideTitle: `🏆 ${award.title.toUpperCase()}`,
                    awardDesc: 'Giải thưởng vinh danh chính thức tại Donafest 2026',
                    winnerName: car ? car.name : 'Chưa công bố',
                    winnerModel: car ? car.model : '',
                    winnerPlate: car ? car.plate : '',
                    winnerImg: car ? car.img : 'images/donafest.jpg'
                });
            });
        }

        // SECTION 2: KẾT QUẢ BÌNH CHỌN (12 Hạng Mục - Includes Ties)
        categoriesList.forEach((cat, catIdx) => {
            const maxVotes = Math.max(...carsData.map(c => c.votes ? (c.votes[cat.id] || 0) : 0));
            const topCars = maxVotes > 0 ? carsData.filter(c => (c.votes ? (c.votes[cat.id] || 0) : 0) === maxVotes) : [];

            deck.push({
                sectionIndex: 1,
                sectionId: 'voting',
                sectionName: 'Phần 2/3: 🏆 KẾT QUẢ BÌNH CHỌN',
                slideInSecIndex: catIdx,
                slidesInSecTotal: categoriesList.length,
                slideTitle: `${cat.icon} GIẢI BÌNH CHỌN: ${cat.title.toUpperCase()}`,
                awardDesc: cat.desc,
                isVoteResultSlide: true,
                topCars: topCars,
                voteCount: maxVotes,
                winnerImg: topCars[0] ? topCars[0].img : 'images/donafest.jpg'
            });
        });

        // SECTION 3: DNT LUCKY RACE (11 Slides)
        const raceSlidesDef = [
            { type: 'run', prizeKey: 'consolation', title: '🏎️ ĐUA GIẢI KHUYẾN KHÍCH' },
            { type: 'win', prizeKey: 'consolation', title: '🎁 VINH DANH CÁC XE THẮNG GIẢI KHUYẾN KHÍCH' },
            { type: 'run', prizeKey: 'third', title: '🏎️ ĐUA GIẢI BA' },
            { type: 'win', prizeKey: 'third', title: '🥉 VINH DANH CÁC XE THẮNG GIẢI BA' },
            { type: 'run', prizeKey: 'second', title: '🏎️ ĐUA GIẢI NHÌ' },
            { type: 'win', prizeKey: 'second', title: '🥈 VINH DANH CÁC XE THẮNG GIẢI NHÌ' },
            { type: 'run', prizeKey: 'first', title: '🏎️ ĐUA GIẢI NHẤT' },
            { type: 'win', prizeKey: 'first', title: '🥇 VINH DANH XE THẮNG GIẢI NHẤT' },
            { type: 'run', prizeKey: 'special', title: '🏎️ ĐUA GIẢI ĐẶC BIỆT' },
            { type: 'win', prizeKey: 'special', title: '🏆 VINH DANH XE THẮNG GIẢI ĐẶC BIỆT' },
            { type: 'grand_summary', title: '👑 BẢNG VÀNG TỔNG HỢP DNT LUCKY RACE 2026' }
        ];

        raceSlidesDef.forEach((def, rIdx) => {
            deck.push({
                sectionIndex: 2,
                sectionId: 'race',
                sectionName: 'Phần 3/3: 🏎️ DNT LUCKY RACE',
                slideInSecIndex: rIdx,
                slidesInSecTotal: 11,
                slideTitle: def.title,
                isRaceSlide: def.type === 'run',
                isRaceWinnerSlide: def.type === 'win',
                isRaceGrandSummarySlide: def.type === 'grand_summary',
                prizeKey: def.prizeKey,
                winnerImg: 'images/venue.jpg'
            });
        });

        return deck;
    }

    function closePresentationStage() {
        presentationOverlay?.classList.add('hidden');
        document.body.style.overflow = '';
    }

    function openPresentationStage() {
        slideDeck = buildPresentationDeck();
        currentSlideIndex = 0;
        presentationOverlay?.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        renderCurrentHeroSlide();
        playSound('win');
    }

    if (adminLaunchPresentationBtn) {
        adminLaunchPresentationBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openPresentationStage();
        });
    }

    stageCloseBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        closePresentationStage();
    });

    const stageCloseBtnBottomLeft = document.getElementById('stageCloseBtnBottomLeft');
    stageCloseBtnBottomLeft?.addEventListener('click', (e) => {
        e.preventDefault();
        closePresentationStage();
    });

    stageNextSlideBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentSlideIndex < slideDeck.length - 1) {
            currentSlideIndex++;
            renderCurrentHeroSlide();
        } else {
            alert('🎉 Đã trình chiếu hoàn tất tất cả các slide Lễ Trao Giải!');
            closePresentationStage();
        }
    });

    stagePrevSlideBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentSlideIndex > 0) {
            currentSlideIndex--;
            renderCurrentHeroSlide();
        }
    });

    stageNextSecBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        const curSlide = slideDeck[currentSlideIndex];
        const nextSecSlide = slideDeck.find(s => s.sectionIndex > curSlide.sectionIndex);
        if (nextSecSlide) {
            currentSlideIndex = slideDeck.indexOf(nextSecSlide);
            renderCurrentHeroSlide();
        } else {
            alert('🎉 Đã tới phần trình chiếu cuối cùng!');
        }
    });

    stagePrevSecBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        const curSlide = slideDeck[currentSlideIndex];
        const prevSecSlides = slideDeck.filter(s => s.sectionIndex < curSlide.sectionIndex);
        if (prevSecSlides.length > 0) {
            const targetSecIdx = prevSecSlides[prevSecSlides.length - 1].sectionIndex;
            const firstSlideOfPrevSec = slideDeck.find(s => s.sectionIndex === targetSecIdx);
            currentSlideIndex = slideDeck.indexOf(firstSlideOfPrevSec);
            renderCurrentHeroSlide();
        }
    });

    function renderCurrentHeroSlide() {
        if (!slideDeck || slideDeck.length === 0 || !stageSlideContent) return;

        const slide = slideDeck[currentSlideIndex];

        if (stageSectionIndicator) stageSectionIndicator.textContent = slide.sectionName;
        if (stageSlideIndicator) stageSlideIndicator.textContent = `Slide ${slide.slideInSecIndex + 1} / ${slide.slidesInSecTotal}`;

        if (presentationOverlay) {
            presentationOverlay.style.backgroundImage = `url('${slide.winnerImg || 'images/donafest.jpg'}')`;
        }

        if (slide.isRaceSlide) {
            currentRacePrizeKey = slide.prizeKey;
            const prizeObj = racePrizesOrder.find(p => p.key === currentRacePrizeKey) || racePrizesOrder[0];
            const quota = prizeQuotas[currentRacePrizeKey] || 1;
            const isFinished = !!completedPrizes[currentRacePrizeKey];

            stageSlideContent.innerHTML = `
                <div class="stage-race-container">
                    <h1 class="stage-slide-title">${slide.slideTitle}</h1>

                    <div class="stage-race-controls">
                        <div class="current-prize-indicator-badge" id="stagePrizeBadge">
                            ${isFinished ? `✅ ĐÃ TRAO GIẢI: ${prizeObj.name.toUpperCase()}` : `🏆 ĐANG QUAY: ${prizeObj.name.toUpperCase()}`}
                        </div>
                        <button type="button" id="stageRaceStartBtn" class="btn btn-primary btn-lg btn-glow">
                            <span>${isFinished ? `⏩ XEM VINH DANH (${prizeObj.name})` : `🏎️ BẮT ĐẦU ĐUA (${prizeObj.name.toUpperCase()})`}</span>
                        </button>
                    </div>

                    <div class="stage-canvas-wrapper">
                        <canvas id="raceCanvas" width="920" height="950"></canvas>
                    </div>
                </div>
            `;

            setTimeout(() => {
                initRaceCanvas();
                const startBtn = document.getElementById('stageRaceStartBtn');
                if (startBtn) {
                    startBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        if (isFinished) {
                            if (currentSlideIndex < slideDeck.length - 1) {
                                currentSlideIndex++;
                                renderCurrentHeroSlide();
                            }
                        } else {
                            startDntLuckyRace();
                        }
                    });
                }
            }, 100);

        } else if (slide.isRaceWinnerSlide) {
            const prizeObj = racePrizesOrder.find(p => p.key === slide.prizeKey) || racePrizesOrder[0];
            const prizeWinners = raceWinnersHistory.filter(w => w.prize.includes(prizeObj.name) || w.prize === prizeObj.name);

            const isNextSlideAvailable = currentSlideIndex < slideDeck.length - 1;
            const nextSlideObj = isNextSlideAvailable ? slideDeck[currentSlideIndex + 1] : null;
            const nextBtnText = nextSlideObj ? `⏩ SANG SLIDE KẾ TIẾP (${nextSlideObj.slideTitle})` : '🎉 HOÀN TẤT LỄ TRAO GIẢI';

            stageSlideContent.innerHTML = `
                <div class="stage-hero-winner-card" style="max-width: 950px;">
                    <div class="hero-award-badge">${slide.slideTitle}</div>
                    <h2 class="winner-banner margin-bottom-10" style="color:var(--gold); font-size:1.1rem;">DANH SÁCH CÁC XE THẮNG GIẢI THƯỞNG</h2>

                    <div class="hero-winners-list-grid">
                        ${prizeWinners.length > 0 ? prizeWinners.map(w => {
                            return `
                                <div class="glass-card" style="padding:16px; text-align:center; border:2px solid var(--teal); background:rgba(12,11,26,0.85);">
                                    <div style="font-weight:800; color:#fff; font-size:1.25rem; margin-bottom:6px;">🏆 ${w.name}</div>
                                    <div style="font-size:1.05rem; color:var(--teal); font-weight:700; margin:4px 0;">🏎️ ${w.model}</div>
                                    <div style="font-size:0.9rem; color:var(--gold); font-weight:700;">🏷️ Mã số: ${w.plate}</div>
                                </div>
                            `;
                        }).join('') : `<p style="font-size:1.1rem; color:var(--text-muted); padding:30px;">Giải thưởng này chưa diễn ra cuộc đua.</p>`}
                    </div>

                    <button type="button" class="btn btn-primary btn-lg btn-glow margin-top-20" id="slideWinnerNextBtn">
                        <span>${nextBtnText}</span>
                    </button>
                </div>
            `;

            setTimeout(() => {
                document.getElementById('slideWinnerNextBtn')?.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (currentSlideIndex < slideDeck.length - 1) {
                        currentSlideIndex++;
                        renderCurrentHeroSlide();
                    } else {
                        alert('🎉 Đã trình chiếu xong toàn bộ Lễ Trao Giải!');
                        closePresentationStage();
                    }
                });
            }, 100);

        } else if (slide.isRaceGrandSummarySlide) {
            stageSlideContent.innerHTML = `
                <div class="stage-race-container" style="max-width:1250px;">
                    <div class="hero-award-badge" style="font-size:1.3rem;">👑 BẢNG VÀNG TỔNG HỢP DNT LUCKY RACE 2026</div>
                    <p style="color:var(--text-secondary); margin-bottom:14px;">Vinh danh tất cả các thành viên & chiến thần đoạt giải thưởng cuộc đua xe DONAFEST 2026</p>
                    
                    ${render5PanelsRaceShowcase(raceWinnersHistory)}

                    <button type="button" class="btn btn-secondary btn-lg margin-top-20" id="slideGrandFinishBtn">
                        <span>🎉 HOÀN TẤT TRÌNH CHIẾU SÂN KHẤU</span>
                    </button>
                </div>
            `;

            setTimeout(() => {
                document.getElementById('slideGrandFinishBtn')?.addEventListener('click', (e) => {
                    e.preventDefault();
                    alert('🎉 Chúc mừng Donafest 2026 đã diễn ra thành công rực rỡ!');
                    closePresentationStage();
                });
            }, 100);

        } else if (slide.isVoteResultSlide) {
            const topCars = slide.topCars || [];
            const voteCount = slide.voteCount || 0;

            let winnersHtml = '';
            if (topCars.length === 0) {
                winnersHtml = `<p style="font-size:1.2rem; color:var(--text-muted); padding:40px;">Chưa có lượt bình chọn cho hạng mục này.</p>`;
            } else if (topCars.length === 1) {
                const car = topCars[0];
                winnersHtml = `
                    <h1 class="hero-winner-name">${car.name}</h1>
                    <div class="hero-winner-img-frame" style="max-width:420px; margin:15px auto;">
                        <img src="${car.img}" alt="${car.name}" class="hero-winner-img" onerror="this.src='images/donafest.jpg'">
                    </div>
                    <div class="hero-car-model">🏎️ ${car.model}</div>
                    <div class="hero-car-plate">🏷️ Mã số: ${car.plate}</div>
                    <div class="hero-vote-count">👍 ${voteCount} Lượt Vote Bình Chọn</div>
                `;
            } else {
                winnersHtml = `
                    <div style="font-size:1.1rem; color:var(--gold); font-weight:800; margin-bottom:15px;">
                        🔥 ĐỒNG HẠNG NHẤT (${voteCount} Votes) - XIN CHÚC MỪNG ${topCars.length} THÍ SINH
                    </div>
                    <div class="hero-winners-list-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:16px; width:100%;">
                        ${topCars.map(car => `
                            <div class="glass-card" style="padding:14px; text-align:center; border:2px solid var(--gold); background:rgba(12,11,26,0.9);">
                                <div style="width:100%; height:140px; border-radius:10px; overflow:hidden; margin-bottom:10px;">
                                    <img src="${car.img}" alt="${car.name}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='images/donafest.jpg'">
                                </div>
                                <div style="font-weight:800; color:#fff; font-size:1.05rem;">${car.name}</div>
                                <div style="font-size:0.85rem; color:var(--teal); font-weight:700; margin:2px 0;">🏎️ ${car.model}</div>
                                <div style="font-size:0.8rem; color:var(--text-secondary);">🏷️ Mã số: ${car.plate}</div>
                                <div style="font-size:0.85rem; color:var(--gold); font-weight:700; margin-top:4px;">👍 ${voteCount} Votes</div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            stageSlideContent.innerHTML = `
                <div class="stage-hero-winner-card" style="max-width:950px;">
                    <div class="hero-award-badge">${slide.slideTitle}</div>
                    ${winnersHtml}
                    <p class="card-sub-hint margin-top-20" style="font-size:1rem; color:var(--text-secondary);">${slide.awardDesc || ''}</p>
                </div>
            `;
        } else {
            stageSlideContent.innerHTML = `
                <div class="stage-hero-winner-card">
                    <div class="hero-award-badge">${slide.slideTitle}</div>
                    <h1 class="hero-winner-name">${slide.winnerName}</h1>
                    
                    <div class="hero-winner-img-frame">
                        <img src="${slide.winnerImg}" alt="${slide.winnerName}" class="hero-winner-img" onerror="this.src='images/donafest.jpg'">
                    </div>

                    ${slide.winnerModel ? `<div class="hero-car-model">🏎️ ${slide.winnerModel}</div>` : ''}
                    ${slide.winnerPlate ? `<div class="hero-car-plate">🏷️ Mã số: ${slide.winnerPlate}</div>` : ''}
                    ${slide.voteCount !== undefined ? `<div class="hero-vote-count">👍 ${slide.voteCount} Lượt Vote Bình Chọn</div>` : ''}
                    
                    <p class="card-sub-hint margin-top-20" style="font-size:1rem; color:var(--text-secondary);">${slide.awardDesc || ''}</p>
                </div>
            `;
        }
    }


    // ====== 7. TAB 1: VOTING SYSTEM ======
    let activeCatId = categoriesList[0]?.id || DEFAULT_CATEGORIES[0].id;
    let isMobileViewViewingCategory = false;

    const votingSidebarPanel = document.getElementById('votingSidebarPanel');
    const votingMainContentPanel = document.getElementById('votingMainContentPanel');
    const mobileBackToCatsBtn = document.getElementById('mobileBackToCatsBtn');

    if (mobileBackToCatsBtn) {
        mobileBackToCatsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            isMobileViewViewingCategory = false;
            updateMobileVotingLayout();
        });
    }

    function updateMobileVotingLayout() {
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            if (isMobileViewViewingCategory) {
                votingSidebarPanel?.classList.add('hidden');
                votingMainContentPanel?.classList.remove('hidden');
                mobileBackToCatsBtn?.classList.remove('hidden');
            } else {
                votingSidebarPanel?.classList.remove('hidden');
                votingMainContentPanel?.classList.add('hidden');
                mobileBackToCatsBtn?.classList.add('hidden');
            }
        } else {
            votingSidebarPanel?.classList.remove('hidden');
            votingMainContentPanel?.classList.remove('hidden');
            mobileBackToCatsBtn?.classList.add('hidden');
        }
    }

    window.addEventListener('resize', updateMobileVotingLayout);

    function renderVotingCategoriesNav() {
        const navEl = document.getElementById('votingCategoriesNav');
        if (!navEl) return;

        navEl.innerHTML = categoriesList.map(cat => {
            const totalCatVotes = carsData.reduce((sum, c) => sum + (c.votes ? (c.votes[cat.id] || 0) : 0), 0);
            return `
                <button type="button" class="cat-nav-btn-vertical ${cat.id === activeCatId ? 'active' : ''}" data-cat-id="${cat.id}">
                    <span class="cat-icon-lg">${cat.icon}</span>
                    <span class="cat-btn-text">${cat.title}</span>
                    <span class="cat-vote-pill">${totalCatVotes} vote</span>
                </button>
            `;
        }).join('');

        navEl.querySelectorAll('.cat-nav-btn-vertical').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                activeCatId = btn.getAttribute('data-cat-id');
                isMobileViewViewingCategory = true;
                renderVotingCategoriesNav();
                renderVotingSection();
                updateMobileVotingLayout();
            });
        });
    }

    function renderVotingSection() {
        renderVotingCategoriesNav();
        updateMobileVotingLayout();

        const currentCat = categoriesList.find(c => c.id === activeCatId) || categoriesList[0];
        document.getElementById('catBannerIcon').textContent = currentCat.icon;
        document.getElementById('catBannerTitle').textContent = currentCat.title;
        document.getElementById('catBannerDesc').textContent = currentCat.desc;

        const isVoted = !!votedCategories[activeCatId];
        const isCategoryPublished = !!leaderboardToggles[activeCatId];

        const statusBox = document.getElementById('voteStatusBar');
        const statusText = document.getElementById('voteStatusText');

        if (isVoted) {
            statusBox.classList.add('voted');
            statusText.textContent = `🔒 Thiết bị này ĐÃ VOTE cho hạng mục "${currentCat.title}". (Mỗi thiết bị được vote 1 phiếu/hạng mục).`;
        } else {
            statusBox.classList.remove('voted');
            statusText.textContent = `🛡️ Mã thiết bị của bạn sẵn sàng bình chọn cho hạng mục "${currentCat.title}".`;
        }

        const candidates = carsData.map(car => {
            const voteCount = car.votes ? (car.votes[activeCatId] || 0) : 0;
            return { ...car, currentCategoryVotes: voteCount };
        }).sort((a, b) => b.currentCategoryVotes - a.currentCategoryVotes);

        const totalVotes = candidates.reduce((sum, c) => sum + c.currentCategoryVotes, 0);
        document.getElementById('catTotalVotes').textContent = totalVotes;

        const gridEl = document.getElementById('candidateGrid');
        if (!gridEl) return;

        gridEl.innerHTML = candidates.map((car, idx) => {
            const rank = idx + 1;
            let rankClass = 'rank-other';
            let rankBadge = `#${rank}`;
            if (rank === 1) { rankClass = 'rank-1'; rankBadge = '🥇 Hạng 1'; }
            else if (rank === 2) { rankClass = 'rank-2'; rankBadge = '🥈 Hạng 2'; }
            else if (rank === 3) { rankClass = 'rank-3'; rankBadge = '🥉 Hạng 3'; }

            const rankBadgeHtml = isCategoryPublished ? `
                <div class="candidate-rank-badge ${rankClass}">${rankBadge}</div>
            ` : '';

            const percent = totalVotes > 0 ? Math.round((car.currentCategoryVotes / totalVotes) * 100) : 0;

            return `
                <div class="glass-card candidate-card">
                    ${rankBadgeHtml}
                    <div class="candidate-img-box">
                        <img src="${car.img}" alt="${car.model}" class="candidate-img" onerror="this.src='images/donafest.jpg'">
                    </div>
                    <div class="candidate-info">
                        <div class="candidate-text-col">
                            <h3>${car.model}</h3>
                            <p class="driver-name">👤 ${car.name} (${car.plate})</p>
                            <p class="candidate-desc">${car.desc}</p>
                            <div class="vote-progress-bar">
                                <div class="vote-progress-fill" style="width: ${percent}%"></div>
                            </div>
                            <div class="vote-flex-info">
                                <span>👍 ${car.currentCategoryVotes} Vote</span>
                                <span>${percent}%</span>
                            </div>
                        </div>
                        <button type="button" class="btn-vote" data-car-id="${car.id}" ${isVoted ? 'disabled' : ''}>
                            ${isVoted ? '✓ ĐÃ VOTE' : '🗳️ VOTE'}
                        </button>
                    </div>
                </div>
            `;
        }).join('');

        gridEl.querySelectorAll('.btn-vote:not(:disabled)').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const carId = btn.getAttribute('data-car-id');
                castVote(carId, activeCatId);
            });
        });
    }

    async function castVote(carId, catId) {
        if (votedCategories[catId]) return;

        // Mark device vote lock locally first
        votedCategories[catId] = carId;
        setStoredData('dnt_voted_cats_' + deviceId, votedCategories);

        // Fetch current vote count for ONLY this car+category from Firebase
        let currentCount = 0;
        try {
            const existing = await fbGet(`votes/${carId}/${catId}`);
            if (typeof existing === 'number') currentCount = existing;
        } catch(e) {}

        const newCount = currentCount + 1;

        const car = carsData.find(c => c.id === carId);
        if (car) {
            if (!car.votes) car.votes = {};
            car.votes[catId] = newCount;
            setStoredData('dnt_cars_official_v3', carsData);
        }

        // Write ONLY this one vote cell to Firebase (tiny atomic write)
        await pushOneVote(carId, catId, newCount);

        playSound('go');
        alert(`🎉 Cảm ơn bạn! Đã bình chọn thành công cho [${car ? car.model : ''} - ${car ? car.name : ''}]!`);
        renderVotingSection();
    }
    renderVotingSection();


    // ====== 8. TAB 2: LEADERBOARD SYSTEM ======
    function renderPublicLeaderboard() {
        const waitingBox = document.getElementById('leaderboardWaitingBox');
        const revealedContent = document.getElementById('leaderboardRevealedContent');

        const isAnyToggleOn = Object.values(leaderboardToggles).some(v => v === true);

        if (!isAnyToggleOn) {
            waitingBox?.classList.remove('hidden');
            revealedContent?.classList.add('hidden');
        } else {
            waitingBox?.classList.add('hidden');
            revealedContent?.classList.remove('hidden');

            let html = '';

            // 1. Dynamic Awards (Vinh Danh)
            if (leaderboardToggles.vinhdanh && awardsConfig.length > 0) {
                html += `
                    <div class="glass-card" style="grid-column: 1 / -1; background: rgba(12, 11, 26, 0.9); border: 2px solid var(--gold); margin-bottom: 20px;">
                        <h2 style="color: var(--gold); text-align: center; margin-bottom: 20px; font-size: 1.5rem;">👑 BẢNG VÀNG VINH DANH SỰ KIỆN</h2>
                        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
                            ${awardsConfig.map(award => {
                                const car = carsData.find(c => c.id === award.carId);
                                const imgPath = car ? car.img : 'images/donafest.jpg';
                                const nameText = car ? car.name : 'Chưa công bố';
                                const modelText = car ? `🏎️ ${car.model}` : '';
                                const plateText = car ? `🏷️ Mã số: ${car.plate}` : '';

                                return `
                                    <div class="glass-card" style="padding: 16px; text-align: center; border: 1px solid var(--teal); background: rgba(0, 0, 0, 0.5);">
                                        <div style="font-size: 0.85rem; color: var(--gold); font-weight: 800; text-transform: uppercase; margin-bottom: 8px;">🏆 ${award.title}</div>
                                        <div style="width: 100%; height: 160px; border-radius: 10px; overflow: hidden; margin-bottom: 12px;">
                                            <img src="${imgPath}" alt="${nameText}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='images/donafest.jpg'">
                                        </div>
                                        <div style="font-weight: 800; color: #fff; font-size: 1.1rem;">${nameText}</div>
                                        <div style="font-size: 0.88rem; color: var(--teal); font-weight: 700; margin: 3px 0;">${modelText}</div>
                                        <div style="font-size: 0.8rem; color: var(--text-secondary);">${plateText}</div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    </div>
                `;
            }

            // 2. Voting Category Results (Handles Ties)
            categoriesList.forEach(cat => {
                if (leaderboardToggles[cat.id]) {
                    const maxVotes = Math.max(...carsData.map(c => c.votes ? (c.votes[cat.id] || 0) : 0));
                    const topCars = maxVotes > 0 ? carsData.filter(c => (c.votes ? (c.votes[cat.id] || 0) : 0) === maxVotes) : [];

                    html += `
                        <div class="glass-card category-leaderboard-card">
                            <div class="cat-card-header">
                                <span class="cat-icon-md">${cat.icon}</span>
                                <h3>${cat.title}</h3>
                            </div>
                            <div class="cat-winner-showcase">
                                ${topCars.length > 0 ? topCars.map(car => `
                                    <div class="winner-info-sub" style="margin-bottom: 10px;">
                                        <img src="${car.img}" alt="${car.name}" class="winner-thumb" onerror="this.src='images/donafest.jpg'">
                                        <div class="winner-text-col">
                                            <div class="winner-crown">${topCars.length > 1 ? '🥇 ĐỒNG HẠNG NHẤT' : '🏆 QUÁN QUÂN'}</div>
                                            <h4 class="winner-name">${car.name}</h4>
                                            <p class="winner-car">${car.model} (${car.plate})</p>
                                            <p class="winner-votes">👍 ${car.votes[cat.id]} Votes</p>
                                        </div>
                                    </div>
                                `).join('') : `<p style="color:var(--text-muted); padding:10px;">Chưa có bình chọn cho hạng mục này.</p>`}
                            </div>
                        </div>
                    `;
                }
            });

            // 3. Lucky Race Results
            if (leaderboardToggles.race_prizes && raceWinnersHistory.length > 0) {
                html += `
                    <div class="glass-card" style="grid-column: 1 / -1; margin-top: 15px;">
                        <h2 style="color: var(--teal); margin-bottom: 15px;">🏎️ BẢNG VÀNG DNT LUCKY RACE</h2>
                        ${render5PanelsRaceShowcase(raceWinnersHistory)}
                    </div>
                `;
            }

            revealedContent.innerHTML = html;
        }
    }


    // ====== 9. TAB 3: PUBLIC DNT LUCKY RACE 5-PANEL GRAND SHOWCASE ======
    function renderPublicRaceLeaderboard() {
        const container = document.getElementById('publicRaceLeaderboard');
        if (!container) return;

        if (!raceWinnersHistory || raceWinnersHistory.length === 0) {
            container.innerHTML = `
                <div class="glass-card waiting-box-card">
                    <div class="waiting-icon">🏆</div>
                    <h2 class="waiting-title">CHƯA CÓ KẾT QUẢ DNT LUCKY RACE</h2>
                    <p class="waiting-sub">BQT sẽ tiến hành cuộc đua 25 xe trực tiếp tại Lễ Trao Giải Sân Khấu!</p>
                </div>
            `;
            return;
        }

        container.innerHTML = render5PanelsRaceShowcase(raceWinnersHistory);
    }
    renderPublicRaceLeaderboard();


    // ====== 10. DNT LUCKY RACE ENGINE ======
    let raceCars = [];
    let isRacing = false;
    let raceStartTime = 0;
    let animationFrameId = null;
    let selectedWinnersForCurrentRace = [];

    function getCurrentPrizeInfo() {
        const prizeObj = racePrizesOrder.find(p => p.key === currentRacePrizeKey) || racePrizesOrder[0];
        const count = prizeQuotas[prizeObj.key] || 1;
        return {
            title: prizeObj.name,
            key: prizeObj.key,
            quota: count
        };
    }

    function initRaceCanvas() {
        const canvas = document.getElementById('raceCanvas');
        if (!canvas) return;
        const wrapper = canvas.parentElement;
        if (wrapper) {
            canvas.width = wrapper.clientWidth || 920;
            canvas.height = wrapper.clientHeight || Math.max(500, window.innerHeight - 200);
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const totalCars = carsData.length || 30;
        const laneHeight = canvas.height / totalCars;

        raceCars = carsData.map((car, index) => ({
            ...car,
            x: 45,
            y: index * laneHeight + laneHeight / 2,
            speed: 0,
            color: car.color || '#ff2d78',
            lane: index + 1,
            finished: false
        }));

        isRacing = false;
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        drawRaceTrack();
    }

    function drawRaceTrack() {
        const canvas = document.getElementById('raceCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const totalCars = raceCars.length || 30;
        const laneHeight = canvas.height / totalCars;
        const fontSize = Math.max(8, Math.min(11, laneHeight * 0.45));
        const carH = Math.max(8, Math.min(16, laneHeight * 0.65));

        for (let i = 0; i < totalCars; i++) {
            const y = i * laneHeight;

            ctx.fillStyle = (i % 2 === 0) ? '#0d0c1d' : '#121126';
            ctx.fillRect(0, y, canvas.width, laneHeight);

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();

            ctx.fillStyle = '#6b6893';
            ctx.font = `bold ${fontSize}px Outfit, sans-serif`;
            ctx.fillText(`${i + 1}`, 4, y + laneHeight / 2 + fontSize / 3);
        }

        ctx.strokeStyle = 'rgba(255, 45, 120, 0.6)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(35, 0);
        ctx.lineTo(35, canvas.height);
        ctx.stroke();

        const finishX = canvas.width - 60;
        const checkSize = Math.max(6, Math.min(10, laneHeight / 2));
        for (let y = 0; y < canvas.height; y += checkSize) {
            for (let x = 0; x < 15; x += checkSize) {
                ctx.fillStyle = ((x + y) / checkSize) % 2 === 0 ? '#ffffff' : '#000000';
                ctx.fillRect(finishX + x, y, checkSize, checkSize);
            }
        }

        raceCars.forEach(car => {
            ctx.fillStyle = car.color;
            ctx.beginPath();
            ctx.roundRect(car.x - 12, car.y - carH / 2, 24, carH, 3);
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 1;
            ctx.stroke();

            ctx.fillStyle = '#00e5c6';
            ctx.fillRect(car.x + 10, car.y - carH / 2 + 1, 2, Math.max(2, carH * 0.3));
            ctx.fillRect(car.x + 10, car.y + carH / 2 - Math.max(2, carH * 0.3) - 1, 2, Math.max(2, carH * 0.3));

            ctx.fillStyle = '#ffffff';
            ctx.font = `bold ${fontSize}px Outfit, sans-serif`;
            ctx.fillText(`${car.name} (${car.model})`, car.x + 16, car.y + fontSize / 3);
        });
    }

    function startDntLuckyRace() {
        if (isRacing) return;

        const prizeInfo = getCurrentPrizeInfo();

        if (completedPrizes[prizeInfo.key]) {
            if (currentSlideIndex < slideDeck.length - 1) {
                currentSlideIndex++;
                renderCurrentHeroSlide();
            }
            return;
        }

        initRaceCanvas();

        const canvas = document.getElementById('raceCanvas');
        const finishX = (canvas ? canvas.width : 920) - 60;
        const totalDistance = finishX - 45;

        const N = prizeInfo.quota;

        const alreadyWonCarIds = new Set(raceWinnersHistory.map(w => w.carId || w.name));
        const eligibleCars = raceCars.filter(c => !alreadyWonCarIds.has(c.id) && !alreadyWonCarIds.has(c.name));

        let pool = eligibleCars.length >= N ? eligibleCars : (eligibleCars.length > 0 ? eligibleCars : raceCars);

        const shuffled = [...pool].sort(() => Math.random() - 0.5);
        selectedWinnersForCurrentRace = shuffled.slice(0, N);

        const durationMs = (raceDurationSec || 5) * 1000;
        const totalFrames = (durationMs / 1000) * 60;

        raceCars.forEach(car => {
            const isTargetWinner = selectedWinnersForCurrentRace.some(w => w.id === car.id);
            if (isTargetWinner) {
                car.targetSpeed = (totalDistance / totalFrames) * (1.08 + Math.random() * 0.12);
            } else {
                const frac = 0.65 + Math.random() * 0.28;
                car.targetSpeed = (totalDistance / totalFrames) * frac;
            }
        });

        const startBtn = document.getElementById('stageRaceStartBtn');
        if (startBtn) {
            startBtn.disabled = true;
            startBtn.innerHTML = `<span>🏎️ ĐANG ĐUA... (RACING ${raceDurationSec}s)</span>`;
        }

        isRacing = true;
        raceStartTime = Date.now();
        playSound('go');

        runRace5sLoop();
    }

    function runRace5sLoop() {
        if (!isRacing) return;

        const canvas = document.getElementById('raceCanvas');
        const finishX = (canvas ? canvas.width : 920) - 60;

        const now = Date.now();
        const elapsed = now - raceStartTime;
        const durationMs = (raceDurationSec || 5) * 1000;

        if (elapsed >= durationMs) {
            raceCars.forEach(car => {
                const isWinner = selectedWinnersForCurrentRace.some(w => w.id === car.id);
                if (isWinner) car.x = finishX;
            });
            drawRaceTrack();
            isRacing = false;
            onDntRaceFinished();
            return;
        }

        raceCars.forEach(car => {
            if (!car.finished) {
                car.x += car.targetSpeed;
                if (car.x >= finishX) {
                    car.x = finishX;
                    car.finished = true;
                }
            }
        });

        drawRaceTrack();
        animationFrameId = requestAnimationFrame(runRace5sLoop);
    }

    async function onDntRaceFinished() {
        playSound('win');

        const prizeInfo = getCurrentPrizeInfo();
        const winners = selectedWinnersForCurrentRace;

        completedPrizes[prizeInfo.key] = true;
        setStoredData('dnt_completed_prizes_2026', completedPrizes);

        winners.forEach(w => {
            raceWinnersHistory.unshift({
                carId: w.id,
                prize: prizeInfo.title,
                name: w.name,
                model: w.model,
                plate: w.plate,
                time: new Date().toLocaleTimeString()
            });
        });
        setStoredData('dnt_race_winners_2026', raceWinnersHistory);

        await pushCloudData();
        renderPublicRaceLeaderboard();

        // AUTO-ADVANCE SLIDE TO WINNERS SHOWCASE AFTER 1.5 SECONDS
        setTimeout(() => {
            if (currentSlideIndex < slideDeck.length - 1) {
                currentSlideIndex++;
                renderCurrentHeroSlide();
            }
        }, 1500);
    }


    // ====== 11. TAB 4: BQT ADMIN PORTAL ======
    const adminPinInput = document.getElementById('adminPinInput');
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    const adminLoginBox = document.getElementById('adminLoginBox');
    const adminPanel = document.getElementById('adminPanel');
    const adminLogoutBtn = document.getElementById('adminLogoutBtn');

    if (adminLoginBtn) {
        adminLoginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            verifyAdminPin();
        });
    }

    if (adminPinInput) {
        adminPinInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                verifyAdminPin();
            }
        });
    }

    function checkAdminUnlock() {
        const isAdminUnlocked = sessionStorage.getItem('dnt_admin_unlocked');
        if (isAdminUnlocked === 'true') {
            adminLoginBox?.classList.add('hidden');
            adminPanel?.classList.remove('hidden');
            renderAdminAwardsList();
            renderLeaderboardToggles();
            renderRacePrizesOrderList();
            renderCategoriesOrderList();
            renderPresentationOrderList();
        }
    }
    checkAdminUnlock();

    function verifyAdminPin() {
        const val = adminPinInput ? adminPinInput.value.trim() : '';
        if (val.toUpperCase() === 'DNT2026') {
            sessionStorage.setItem('dnt_admin_unlocked', 'true');
            adminLoginBox?.classList.add('hidden');
            adminPanel?.classList.remove('hidden');
            renderAdminAwardsList();
            renderLeaderboardToggles();
            renderRacePrizesOrderList();
            renderCategoriesOrderList();
            renderPresentationOrderList();
        } else {
            alert('❌ Mã PIN BQT không đúng! Vui lòng liên hệ Ban Quản Trị.');
        }
    }

    if (adminLogoutBtn) {
        adminLogoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('dnt_admin_unlocked');
            adminPanel?.classList.add('hidden');
            adminLoginBox?.classList.remove('hidden');
            if (adminPinInput) adminPinInput.value = '';
        });
    }

    // Reorder DNT Lucky Race Prizes Sequence
    function renderRacePrizesOrderList() {
        const listEl = document.getElementById('racePrizesOrderList');
        if (!listEl) return;

        listEl.innerHTML = racePrizesOrder.map((prize, idx) => `
            <div class="reorder-item">
                <span class="reorder-drag-handle">☰</span>
                <span class="reorder-title">${idx + 1}. ${prize.name} ${completedPrizes[prize.key] ? '(✅ Đã trao)' : ''}</span>
                <div class="reorder-btns">
                    <button type="button" class="btn-arrow btn-prize-up" ${idx === 0 ? 'disabled' : ''}>▲</button>
                    <button type="button" class="btn-arrow btn-prize-down" ${idx === racePrizesOrder.length - 1 ? 'disabled' : ''}>▼</button>
                </div>
            </div>
        `).join('');

        listEl.querySelectorAll('.btn-prize-up').forEach((btn, idx) => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                if (idx > 0) {
                    const temp = racePrizesOrder[idx];
                    racePrizesOrder[idx] = racePrizesOrder[idx - 1];
                    racePrizesOrder[idx - 1] = temp;
                    setStoredData('dnt_race_prizes_order', racePrizesOrder);
                    renderRacePrizesOrderList();
                    await pushCloudData();
                }
            });
        });

        listEl.querySelectorAll('.btn-prize-down').forEach((btn, idx) => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                if (idx < racePrizesOrder.length - 1) {
                    const temp = racePrizesOrder[idx];
                    racePrizesOrder[idx] = racePrizesOrder[idx + 1];
                    racePrizesOrder[idx + 1] = temp;
                    setStoredData('dnt_race_prizes_order', racePrizesOrder);
                    renderRacePrizesOrderList();
                    await pushCloudData();
                }
            });
        });
    }

    // SAVE PRIZE QUOTA & RACE DURATION BUTTON HANDLER
    const savePrizeQuotaBtn = document.getElementById('savePrizeQuotaBtn');
    if (savePrizeQuotaBtn) {
        if (document.getElementById('quotaSpecial')) document.getElementById('quotaSpecial').value = prizeQuotas.special || 1;
        if (document.getElementById('quotaFirst')) document.getElementById('quotaFirst').value = prizeQuotas.first || 1;
        if (document.getElementById('quotaSecond')) document.getElementById('quotaSecond').value = prizeQuotas.second || 2;
        if (document.getElementById('quotaThird')) document.getElementById('quotaThird').value = prizeQuotas.third || 3;
        if (document.getElementById('quotaConsolation')) document.getElementById('quotaConsolation').value = prizeQuotas.consolation || 5;
        if (document.getElementById('raceDurationSec')) document.getElementById('raceDurationSec').value = raceDurationSec || 5;

        savePrizeQuotaBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();

            prizeQuotas.special = parseInt(document.getElementById('quotaSpecial').value) || 1;
            prizeQuotas.first = parseInt(document.getElementById('quotaFirst').value) || 1;
            prizeQuotas.second = parseInt(document.getElementById('quotaSecond').value) || 2;
            prizeQuotas.third = parseInt(document.getElementById('quotaThird').value) || 3;
            prizeQuotas.consolation = parseInt(document.getElementById('quotaConsolation').value) || 5;

            raceDurationSec = parseInt(document.getElementById('raceDurationSec').value) || 5;
            if (raceDurationSec < 3) raceDurationSec = 3;
            if (raceDurationSec > 60) raceDurationSec = 60;
            setStoredData('dnt_race_duration_sec', raceDurationSec);

            setStoredData('dnt_prize_quotas', prizeQuotas);
            await pushCloudData();
            alert('💾 Đã lưu cấu hình cuộc đua & số lượng giải thưởng thành công!');
        });
    }

    // DYNAMIC AWARDS CONFIG LIST RENDERER & EVENT HANDLERS
    function renderAdminAwardsList() {
        const container = document.getElementById('adminAwardsList');
        if (!container) return;

        if (awardsConfig.length === 0) {
            container.innerHTML = `<p style="color:var(--text-secondary); text-align:center; padding:15px;">Chưa có giải vinh danh nào. Bấm nút bên dưới để thêm!</p>`;
            return;
        }

        container.innerHTML = awardsConfig.map((item, idx) => {
            const selectedCar = carsData.find(c => c.id === item.carId);
            const imgPath = selectedCar ? selectedCar.img : 'images/donafest.jpg';

            return `
                <div class="award-config-row" data-award-id="${item.id}" style="padding:12px; margin-bottom:10px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:10px;">
                    <div style="display:flex; gap:8px; align-items:center; margin-bottom:8px;">
                        <span style="font-weight:700; color:var(--teal); font-size:0.9rem; min-width:24px;">#${idx + 1}</span>
                        <input type="text" class="award-title-input" value="${item.title}" placeholder="Tên giải vinh danh..." style="flex:1; padding:8px 12px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:rgba(0,0,0,0.4); color:#fff; font-weight:600;">
                        <button type="button" class="btn btn-sm btn-danger remove-award-btn" data-award-id="${item.id}" style="padding:6px 10px;">🗑️</button>
                    </div>
                    <div style="display:flex; gap:10px; align-items:center;">
                        <select class="award-car-select" data-award-id="${item.id}" style="flex:1; padding:8px 12px; border-radius:8px; border:1px solid rgba(255,255,255,0.2); background:rgba(12,11,26,0.9); color:#fff; font-size:0.88rem;">
                            <option value="">-- Chọn ứng viên đoạt giải --</option>
                            ${carsData.map(c => `
                                <option value="${c.id}" ${c.id === item.carId ? 'selected' : ''}>
                                    ${c.plate} • ${c.name} (${c.model})
                                </option>
                            `).join('')}
                        </select>
                        <div class="award-img-preview" style="width:48px; height:48px; border-radius:8px; overflow:hidden; border:1px solid var(--teal); flex-shrink:0; background:#000;">
                            <img src="${imgPath}" alt="Preview" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='images/donafest.jpg'">
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        container.querySelectorAll('.award-title-input').forEach(input => {
            input.addEventListener('change', (e) => {
                const row = e.target.closest('.award-config-row');
                const awardId = row.getAttribute('data-award-id');
                const item = awardsConfig.find(a => a.id === awardId);
                if (item) item.title = e.target.value.trim();
            });
        });

        container.querySelectorAll('.award-car-select').forEach(select => {
            select.addEventListener('change', (e) => {
                const awardId = select.getAttribute('data-award-id');
                const item = awardsConfig.find(a => a.id === awardId);
                if (item) {
                    item.carId = e.target.value;
                    renderAdminAwardsList();
                }
            });
        });

        container.querySelectorAll('.remove-award-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const awardId = btn.getAttribute('data-award-id');
                awardsConfig = awardsConfig.filter(a => a.id !== awardId);
                renderAdminAwardsList();
            });
        });
    }

    document.getElementById('adminAddAwardBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        awardsConfig.push({
            id: 'award-' + Date.now(),
            title: `Giải Vinh Danh #${awardsConfig.length + 1}`,
            carId: ''
        });
        renderAdminAwardsList();
    });

    document.getElementById('saveAwardsBtn')?.addEventListener('click', async (e) => {
        e.preventDefault();
        const container = document.getElementById('adminAwardsList');
        if (container) {
            container.querySelectorAll('.award-config-row').forEach(row => {
                const awardId = row.getAttribute('data-award-id');
                const titleInput = row.querySelector('.award-title-input');
                const select = row.querySelector('.award-car-select');
                const item = awardsConfig.find(a => a.id === awardId);
                if (item) {
                    if (titleInput) item.title = titleInput.value.trim();
                    if (select) item.carId = select.value;
                }
            });
        }
        setStoredData('dnt_awards_config_2026', awardsConfig);
        await pushCloudData();
        renderPublicLeaderboard();
        alert('💾 Đã cập nhật và đồng bộ Cloud danh sách Vinh Danh thành công!');
    });

    // Render Admin Leaderboard ON/OFF Toggles
    function renderLeaderboardToggles() {
        const listEl = document.getElementById('leaderboardTogglesList');
        if (!listEl) return;

        const toggleItems = [
            { id: 'vinhdanh', label: '👑 Bảng Vàng Vinh Danh (Dynamic Awards)' },
            { id: 'race_prizes', label: '🏎️ Kết Quả DNT Lucky Race' },
            ...categoriesList.map(c => ({ id: c.id, label: `${c.icon} ${c.title}` }))
        ];

        listEl.innerHTML = toggleItems.map(item => `
            <div class="toggle-item">
                <span class="toggle-label">${item.label}</span>
                <label class="switch-toggle">
                    <input type="checkbox" class="lb-toggle-checkbox" data-key="${item.id}" ${leaderboardToggles[item.id] ? 'checked' : ''}>
                    <span class="slider-round"></span>
                </label>
            </div>
        `).join('');

        listEl.querySelectorAll('.lb-toggle-checkbox').forEach(cb => {
            cb.addEventListener('change', async (e) => {
                const key = e.target.getAttribute('data-key');
                leaderboardToggles[key] = e.target.checked;
                setStoredData('dnt_leaderboard_toggles', leaderboardToggles);
                await pushCloudData();
                renderPublicLeaderboard();
                renderVotingSection();
            });
        });
    }

    // Reorder 12 Voting Categories in Admin Panel
    function renderCategoriesOrderList() {
        const listEl = document.getElementById('categoriesOrderList');
        if (!listEl) return;

        listEl.innerHTML = categoriesList.map((cat, idx) => `
            <div class="reorder-item">
                <span class="reorder-drag-handle">☰</span>
                <span class="reorder-title">${idx + 1}. ${cat.icon} ${cat.title}</span>
                <div class="reorder-btns">
                    <button type="button" class="btn-arrow btn-cat-up" ${idx === 0 ? 'disabled' : ''}>▲</button>
                    <button type="button" class="btn-arrow btn-cat-down" ${idx === categoriesList.length - 1 ? 'disabled' : ''}>▼</button>
                </div>
            </div>
        `).join('');

        listEl.querySelectorAll('.btn-cat-up').forEach((btn, idx) => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                if (idx > 0) {
                    const temp = categoriesList[idx];
                    categoriesList[idx] = categoriesList[idx - 1];
                    categoriesList[idx - 1] = temp;
                    setStoredData('dnt_categories_order', categoriesList);
                    renderCategoriesOrderList();
                    renderVotingCategoriesNav();
                    await pushCloudData();
                }
            });
        });

        listEl.querySelectorAll('.btn-cat-down').forEach((btn, idx) => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                if (idx < categoriesList.length - 1) {
                    const temp = categoriesList[idx];
                    categoriesList[idx] = categoriesList[idx + 1];
                    categoriesList[idx + 1] = temp;
                    setStoredData('dnt_categories_order', categoriesList);
                    renderCategoriesOrderList();
                    renderVotingCategoriesNav();
                    await pushCloudData();
                }
            });
        });
    }

    // Reorder Presentation Stages
    function renderPresentationOrderList() {
        const listEl = document.getElementById('presentationOrderList');
        if (!listEl) return;

        listEl.innerHTML = presentationOrder.map((item, idx) => `
            <div class="reorder-item">
                <span class="reorder-drag-handle">☰</span>
                <span class="reorder-title">${idx + 1}. ${item.name}</span>
                <div class="reorder-btns">
                    <button type="button" class="btn-arrow btn-up" ${idx === 0 ? 'disabled' : ''}>▲</button>
                    <button type="button" class="btn-arrow btn-down" ${idx === presentationOrder.length - 1 ? 'disabled' : ''}>▼</button>
                </div>
            </div>
        `).join('');

        listEl.querySelectorAll('.btn-up').forEach((btn, idx) => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                if (idx > 0) {
                    const temp = presentationOrder[idx];
                    presentationOrder[idx] = presentationOrder[idx - 1];
                    presentationOrder[idx - 1] = temp;
                    setStoredData('dnt_presentation_order', presentationOrder);
                    renderPresentationOrderList();
                    await pushCloudData();
                }
            });
        });

        listEl.querySelectorAll('.btn-down').forEach((btn, idx) => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                if (idx < presentationOrder.length - 1) {
                    const temp = presentationOrder[idx];
                    presentationOrder[idx] = presentationOrder[idx + 1];
                    presentationOrder[idx + 1] = temp;
                    setStoredData('dnt_presentation_order', presentationOrder);
                    renderPresentationOrderList();
                    await pushCloudData();
                }
            });
        });
    }

    document.getElementById('adminResetDefaultCarsBtn')?.addEventListener('click', async (e) => {
        e.preventDefault();
        carsData = [...OFFICIAL_30_CARS];
        carsData.forEach(c => c.votes = {});
        setStoredData('dnt_cars_official_v3', carsData);
        await pushCloudData();
        renderVotingSection();
        alert('✅ Đã khôi phục danh sách 30 thí sinh gốc!');
    });

    // RESET VOTES + CLEAR ALL DEVICE LOCKS HANDLER
    document.getElementById('adminResetVotesBtn')?.addEventListener('click', async (e) => {
        e.preventDefault();
        if (confirm('⚠️ Reset toàn bộ lượt bình chọn về 0 trên Cloud và mở lại quyền vote cho TẤT CẢ THIẾT BỊ?')) {
            // 1. Reset votes on all 25 cars locally
            carsData.forEach(c => c.votes = {});
            setStoredData('dnt_cars_official_v3', carsData);

            // 2. Increment resetVer to unlock all devices
            voteResetVersion = Date.now();
            setStoredData('dnt_vote_reset_ver', voteResetVersion);
            votedCategories = {};
            setStoredData('dnt_voted_cats_' + deviceId, {});

            // 3. Push to Firebase: wipe votes node + update resetVer
            await fbSet('votes', null);  // deletes all vote data
            await fbPatch('', { resetVer: voteResetVersion });
            renderVotingSection();
            alert('✅ Đã reset thành công tất cả lượt bình chọn & mở lại quyền vote cho TẤT CẢ THIẾT BỊ!');
        }
    });

    // RESET DNT LUCKY RACE RESULTS BUTTON HANDLER
    document.getElementById('adminResetRaceBtn')?.addEventListener('click', async (e) => {
        e.preventDefault();
        if (confirm('⚠️ Bạn có chắc chắn muốn reset toàn bộ kết quả trao giải DNT Lucky Race?')) {
            raceWinnersHistory = [];
            completedPrizes = {};
            currentRacePrizeKey = 'consolation';
            setStoredData('dnt_race_winners_2026', raceWinnersHistory);
            setStoredData('dnt_completed_prizes_2026', completedPrizes);
            await fbPatch('', { winners: null, completed: null });
            renderPublicRaceLeaderboard();
            renderPublicLeaderboard();
            renderRacePrizesOrderList();
            alert('✅ Đã reset đồng bộ Cloud toàn bộ kết quả DNT Lucky Race!');
        }
    });

    // Export Data JSON / CSV
    document.getElementById('adminExportJsonBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        const fullBackup = {
            cars: carsData,
            quotas: prizeQuotas,
            racePrizesOrder: racePrizesOrder,
            completedPrizes: completedPrizes,
            presentationOrder: presentationOrder,
            shoutouts: shoutoutData,
            winnersHistory: raceWinnersHistory,
            exportTime: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `DONAFEST_2026_Full_Backup_${Date.now()}.json`;
        a.click();
    });

    document.getElementById('adminExportCsvBtn')?.addEventListener('click', (e) => {
        e.preventDefault();
        let csv = 'STT,Ten_Chu_Xe,Ten_Xe,Ma_So,Tong_Vote\n';
        carsData.forEach((c, i) => {
            const votes = c.votes ? Object.values(c.votes).reduce((a,b)=>a+b,0) : 0;
            csv += `${i+1},"${c.name}","${c.model}","${c.plate}",${votes}\n`;
        });
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `DONAFEST_2026_DanhSachGiai_${Date.now()}.csv`;
        a.click();
    });

});
