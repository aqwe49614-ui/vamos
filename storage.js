// =========================
// VAMOS STORAGE ENGINE
// =========================

const STORAGE_KEY = "vamos_user_data";

let userData = {
    xp: 0,
    level: "A1",
    streak: 0,
    currentLesson: 1
};

// ذخیره اطلاعات
function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
}

// لود اطلاعات
function loadData() {
    const data = localStorage.getItem(STORAGE_KEY);

    if (data) {
        userData = JSON.parse(data);
    }
}

// اضافه کردن XP
function addXP(amount) {
    userData.xp += amount;

    // ارتقا سطح ساده
    if (userData.xp > 100) userData.level = "A2";
    if (userData.xp > 250) userData.level = "B1";
    if (userData.xp > 500) userData.level = "B2";

    saveData();
}

// افزایش استریک
function addStreak() {
    userData.streak += 1;
    saveData();
}

// گرفتن دیتا
function getUserData() {
    return userData;
}

loadData();

export { addXP, addStreak, getUserData, saveData };
