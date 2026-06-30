// =========================
// VAMOS AI - CORE APP
// =========================

const API_URL = "https://vamos-ai-1.aqwe49614.workers.dev";

// عناصر UI
const chatArea = document.getElementById("chatArea");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const startBtn = document.getElementById("startCourse");
const continueBtn = document.getElementById("continueBtn");

const levelEl = document.getElementById("level");
const xpEl = document.getElementById("xp");
const streakEl = document.getElementById("streak");

const lessonContainer = document.getElementById("lessonContainer");

// وضعیت اپ
let state = {
    lesson: 1,
    xp: 0,
    level: "A1",
    streak: 0,
    history: []
};

// ذخیره
function save() {
    localStorage.setItem("vamos", JSON.stringify(state));
}

// لود
function load() {
    const data = localStorage.getItem("vamos");
    if (data) {
        state = JSON.parse(data);
        updateUI();
    }
}

load();

// آپدیت UI
function updateUI() {
    levelEl.innerText = state.level;
    xpEl.innerText = state.xp;
    streakEl.innerText = state.streak;
}

// پیام AI
function addAI(text) {
    const div = document.createElement("div");
    div.className = "message ai";
    div.innerText = text;
    chatArea.appendChild(div);
    chatArea.scrollTop = chatArea.scrollHeight;
}

// پیام کاربر
function addUser(text) {
    const div = document.createElement("div");
    div.className = "message user";
    div.innerText = text;
    chatArea.appendChild(div);
    chatArea.scrollTop = chatArea.scrollHeight;
}

// ارسال به AI
async function askAI(message) {

    addUser(message);

    state.history.push({
        role: "user",
        content: message
    });

    save();

    addAI("⏳ در حال فکر کردن...");

    try {

        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                messages: state.history
            })
        });

        const data = await res.json();

        chatArea.lastChild.remove();

        const reply =
            data.choices?.[0]?.message?.content ||
            data.reply ||
            "خطا در دریافت پاسخ";

        addAI(reply);

        state.history.push({
            role: "assistant",
            content: reply
        });

        save();

        state.xp += 5;
        updateUI();
        save();

    } catch (err) {

        chatArea.lastChild.remove();

        addAI("❌ اتصال به سرور برقرار نشد");

        console.error(err);
    }
}

// ارسال پیام
sendBtn.onclick = () => {
    const text = input.value.trim();
    if (!text) return;

    askAI(text);
    input.value = "";
};

// Enter
input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendBtn.click();
    }
});

// شروع دوره
startBtn.onclick = () => {

    document.getElementById("homePage").style.display = "none";
    document.getElementById("chatPage").style.display = "block";

    addAI(
        "🇪🇸 سلام! من معلم اسپانیایی تو هستم. آماده‌ای شروع کنیم؟ فقط بنویس: شروع"
    );
};

// ادامه
continueBtn.onclick = () => {
    startBtn.click();
};
