// =========================
// VAMOS APP CORE (FINAL STABLE FIX)
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
// STORAGE
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
// AI FIX (PROBLEM 1 SOLVED)
// =========================

async function askAI(message) {

    addUser(message);

    history.push({ role: "user", content: message });

    const loading = document.createElement("div");
    loading.className = "message ai";
    loading.innerText = "⏳ ...";
    chatArea.appendChild(loading);

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
فقط آموزش بده.
فارسی توضیح بده + مثال + تمرین.
سطح: A1
`
                    },
                    ...history
                ]
            })
        });

        const data = await res.json();

        loading.remove();

        // ===== FIXED RESPONSE PARSING (PROBLEM 1 FIX) =====
        let reply = "خطا در پاسخ";

        if (data?.choices?.[0]?.message?.content) {
            reply = data.choices[0].message.content;
        } else if (data?.output) {
            reply = data.output;
        } else if (data?.response) {
            reply = data.response;
        } else if (typeof data === "string") {
            reply = data;
        }

        addAI(reply);

        history.push({ role: "assistant", content: reply });

        addXP(5);
        addStreak();
        updateProfile();

    } catch (err) {

        loading.remove();
        addAI("❌ مشکل اتصال به سرور (Worker/API)");
        console.log(err);
    }
}

// =========================
// EVENTS (PROBLEM 2 FIX)
// =========================

window.addEventListener("load", () => {

    console.log("VAMOS APP LOADED");

    updateProfile();

    addAI("🇪🇸 خوش آمدی! من معلم اسپانیایی تو هستم.");

});

// دکمه ارسال (FIXED SAFE)
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

// =========================
// NAV FIX (PROBLEM 2 FULL FIX)
// =========================

window.addEventListener("load", () => {

    const pages = {
        home: document.getElementById("homePage"),
        lesson: document.getElementById("lessonPage"),
        chat: document.getElementById("chatPage"),
        profile: document.getElementById("profilePage")
    };

    const buttons = {
        home: document.getElementById("navHome"),
        lesson: document.getElementById("navLesson"),
        chat: document.getElementById("navChat"),
        profile: document.getElementById("navProfile")
    };

    function show(page) {
        Object.values(pages).forEach(p => {
            if (p) p.style.display = "none";
        });

        if (pages[page]) {
            pages[page].style.display = "block";
        }
    }

    buttons.home?.addEventListener("click", () => show("home"));
    buttons.lesson?.addEventListener("click", () => show("lesson"));
    buttons.chat?.addEventListener("click", () => show("chat"));
    buttons.profile?.addEventListener("click", () => show("profile"));

});
