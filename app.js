// =========================
// VAMOS APP CORE (FINAL CONNECTOR)
// =========================

import { addXP, addStreak, getUserData } from "./storage.js";
import { startExam } from "./examEngine.js";
import { speak } from "./voiceEngine.js";

// عناصر
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");
const chatArea = document.getElementById("chatArea");

// API
const API_URL = "https://vamos-ai-1.aqwe49614.workers.dev";

// state محلی
let history = [];

// پیام AI
function addAI(text) {
    const div = document.createElement("div");
    div.className = "message ai";
    div.innerText = text;
    chatArea.appendChild(div);
}

// پیام کاربر
function addUser(text) {
    const div = document.createElement("div");
    div.className = "message user";
    div.innerText = text;
    chatArea.appendChild(div);
}

// ارسال به سرور
async function askAI(message) {

    addUser(message);

    history.push({ role: "user", content: message });

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

قانون‌ها:
- فارسی توضیح بده
- مثال اسپانیایی بده
- تمرین بده

سطح: A1
`
        },
        ...history
    ]
})
        });

        const data = await res.json();

        const reply =
            data.choices?.[0]?.message?.content ||
            "خطا در پاسخ";

        addAI(reply);

        history.push({ role: "assistant", content: reply });

        // XP + Streak
        addXP(5);
        addStreak();

        updateProfile();

    } catch (err) {
        addAI("❌ مشکل اتصال به سرور");
    }
}

// آپدیت پروفایل
function updateProfile() {

    const data = getUserData();

    document.getElementById("xp").innerText = data.xp;
    document.getElementById("level").innerText = data.level;
    document.getElementById("streak").innerText = data.streak;
}

// ارسال
sendBtn.onclick = () => {

    const text = input.value.trim();
    if (!text) return;

    askAI(text);
    input.value = "";
};

// Enter
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendBtn.click();
});

// شروع درس اول خودکار
window.addEventListener("load", () => {

    addAI("🇪🇸 خوش آمدی! من معلم اسپانیایی تو هستم.");

    speak("Bienvenido");

    updateProfile();
});
