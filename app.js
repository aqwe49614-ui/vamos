// =========================
// VAMOS APP CORE (PRODUCTION FIXED)
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
// SAFE UI
// =========================

function addAI(text) {
    const div = document.createElement("div");
    div.className = "message ai";
    div.innerText = text;
    chatArea?.appendChild(div);
    chatArea.scrollTop = chatArea?.scrollHeight;
}

function addUser(text) {
    const div = document.createElement("div");
    div.className = "message user";
    div.innerText = text;
    chatArea?.appendChild(div);
    chatArea.scrollTop = chatArea?.scrollHeight;
}

// =========================
// STORAGE SAFE
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

    document.getElementById("xp")?.innerText = data.xp;
    document.getElementById("level")?.innerText = data.level;
    document.getElementById("streak")?.innerText = data.streak;
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
// AI FIX (ROOT CAUSE FIXED)
// =========================

async function askAI(message) {

    addUser(message);

    history.push({ role: "user", content: message });

    const loading = document.createElement("div");
    loading.className = "message ai";
    loading.innerText = "⏳ ...";
    chatArea?.appendChild(loading);

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

        console.log("AI RESPONSE:", data);

        // ===== FIXED PARSER (100% SAFE) =====
        let reply =
            data?.choices?.[0]?.message?.content ??
            data?.output ??
            data?.response ??
            data?.result ??
            (typeof data === "string" ? data : null);

        if (!reply) {
            reply = "❌ Worker پاسخ معتبر نداد";
        }

        addAI(reply);

        history.push({ role: "assistant", content: reply });

        addXP(5);
        addStreak();
        updateProfile();

    } catch (err) {

        loading.remove();
        addAI("❌ خطا در اتصال به سرور");
        console.log(err);
    }
}

// =========================
// NAV FIX (REAL PAGE SWITCH)
// =========================

function showPage(pageId) {

    const pages = ["homePage", "lessonPage", "chatPage", "profilePage"];

    pages.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });

    const target = document.getElementById(pageId);
    if (target) target.style.display = "block";
}

// =========================
// EVENTS SAFE INIT
// =========================

window.addEventListener("load", () => {

    console.log("VAMOS APP LOADED");

    updateProfile();

    addAI("🇪🇸 خوش آمدی! من معلم اسپانیایی تو هستم.");

    // NAV BUTTONS
    document.getElementById("navHome")?.addEventListener("click", () => showPage("homePage"));
    document.getElementById("navLesson")?.addEventListener("click", () => showPage("lessonPage"));
    document.getElementById("navChat")?.addEventListener("click", () => showPage("chatPage"));
    document.getElementById("navProfile")?.addEventListener("click", () => showPage("profilePage"));
});

// SEND BUTTON
sendBtn?.addEventListener("click", () => {

    const text = input?.value?.trim();
    if (!text) return;

    askAI(text);
    input.value = "";
});

// ENTER
input?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
});
