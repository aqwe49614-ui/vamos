// =========================
// VAMOS APP CORE (FINAL FIXED)
// =========================

// API
const API_URL = "https://vamos-ai-1.aqwe49614.workers.dev";

// عناصر
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatArea = document.getElementById("chatArea");

// state
let history = [];

// =========================
// UI
// =========================

function addAI(text) {
    const div = document.createElement("div");
    div.className = "message ai";
    div.innerText = text;
    chatArea.appendChild(div);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function addUser(text) {
    const div = document.createElement("div");
    div.className = "message user";
    div.innerText = text;
    chatArea.appendChild(div);
    chatArea.scrollTop = chatArea.scrollHeight;
}

// =========================
// STORAGE (safe local version)
// =========================

function getUserData() {
    const data = localStorage.getItem("vamos_data");
    return data ? JSON.parse(data) : {
        xp: 0,
        level: "A1",
        streak: 0
    };
}

function saveUserData(data) {
    localStorage.setItem("vamos_data", JSON.stringify(data));
}

function updateProfile() {

    const data = getUserData();

    const xpEl = document.getElementById("xp");
    const levelEl = document.getElementById("level");
    const streakEl = document.getElementById("streak");

    if (xpEl) xpEl.innerText = data.xp;
    if (levelEl) levelEl.innerText = data.level;
    if (streakEl) streakEl.innerText = data.streak;
}

// =========================
// XP SYSTEM
// =========================

function addXP(amount = 5) {

    const data = getUserData();

    data.xp += amount;

    if (data.xp > 100) data.level = "A2";
    if (data.xp > 250) data.level = "B1";
    if (data.xp > 500) data.level = "B2";

    saveUserData(data);
}

function addStreak() {

    const data = getUserData();
    data.streak += 1;
    saveUserData(data);
}

// =========================
// AI CONNECT
// =========================

async function askAI(message) {

    addUser(message);

    history.push({ role: "user", content: message });

    addAI("⏳ ...");

    try {

        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: [
                    {
                        role: "system",
                        content: `
تو یک معلم اسپانیایی هستی.

قوانین:
- فقط آموزش بده
- فارسی توضیح بده
- مثال اسپانیایی بده
- تمرین بده

سطح کاربر: A1
`
                    },
                    ...history
                ]
            })
        });

        const data = await res.json();

        chatArea.lastChild.remove();

        const reply =
            data.choices?.[0]?.message?.content ||
            "خطا در پاسخ";

        addAI(reply);

        history.push({ role: "assistant", content: reply });

        addXP(5);
        addStreak();
        updateProfile();

    } catch (err) {

        chatArea.lastChild.remove();
        addAI("❌ مشکل اتصال به سرور");
    }
}

// =========================
// EVENTS (FIXED SAFE)
// =========================

window.addEventListener("load", () => {

    console.log("VAMOS APP LOADED");

    updateProfile();

    addAI("🇪🇸 خوش آمدی! من معلم اسپانیایی تو هستم.");

});

// دکمه ارسال
sendBtn?.addEventListener("click", () => {

    const text = input?.value?.trim();
    if (!text) return;

    askAI(text);
    input.value = "";
});

// Enter
input?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
});
