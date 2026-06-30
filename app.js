alert("JS IS LOADED");

// =========================
// VAMOS APP CORE (FINAL CLEAN FIX)
// =========================

const API_URL = "https://vamos-ai-1.aqwe49614.workers.dev";

// عناصر
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatArea = document.getElementById("chatArea");

// state
let history = [];

// =========================
// UI SAFE
// =========================

function addAI(text) {
    if (!chatArea) return;

    const div = document.createElement("div");
    div.className = "message ai";
    div.innerText = text;

    chatArea.appendChild(div);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function addUser(text) {
    if (!chatArea) return;

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
    return JSON.parse(localStorage.getItem("vamos_data")) || {
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
// AI FIX (IMPORTANT FIX)
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

        // ===== FIXED PARSER =====
        let reply = "";

        if (data?.choices?.[0]?.message?.content) {
            reply = data.choices[0].message.content;
        } else if (data?.result) {
            reply = data.result;
        } else if (data?.response) {
            reply = data.response;
        } else if (data?.output) {
            reply = data.output;
        } else if (typeof data === "string") {
            reply = data;
        } else {
            reply = "❌ Worker پاسخ نامعتبر داد";
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
// NAV FIX (CRITICAL FIX)
// =========================

function showPage(pageId) {

    const pages = [
        "homePage",
        "lessonPage",
        "chatPage",
        "profilePage"
    ];

    pages.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.style.display = "none";
    });

    const target = document.getElementById(pageId);
    if (target) target.style.display = "block";
}

// =========================
// INIT
// =========================

window.addEventListener("load", () => {

    console.log("VAMOS LOADED OK");

    alert("APP STARTED");
    
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

// ENTER KEY
input?.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
});
