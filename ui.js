// =========================
// VAMOS UI ENGINE
// =========================

// مخفی کردن لودینگ
window.addEventListener("load", () => {

    const loader = document.getElementById("loadingScreen");
    const app = document.getElementById("app");

    setTimeout(() => {

    const loader = document.getElementById("loadingScreen");
    const app = document.getElementById("app");

    if (loader) loader.style.display = "none";
    if (app) app.style.display = "flex";

}, 800);

});

// انیمیشن کلیک دکمه‌ها
document.addEventListener("click", (e) => {

    if (e.target.tagName === "BUTTON") {
        e.target.style.transform = "scale(0.95)";

        setTimeout(() => {
            e.target.style.transform = "scale(1)";
        }, 100);
    }

});

// اسکرول نرم چت
function scrollChat() {
    const chat = document.getElementById("chatArea");

    if (chat) {
        chat.scrollTop = chat.scrollHeight;
    }
}

// اضافه کردن افکت ورود پیام
function animateMessage(el) {
    el.style.opacity = 0;
    el.style.transform = "translateY(10px)";

    setTimeout(() => {
        el.style.transition = "0.3s";
        el.style.opacity = 1;
        el.style.transform = "translateY(0)";
    }, 10);
}

// اعمال روی پیام‌های جدید
const observer = new MutationObserver((mutations) => {

    mutations.forEach(m => {
        m.addedNodes.forEach(node => {

            if (node.classList && node.classList.contains("message")) {
                animateMessage(node);
            }

        });
    });

});

const chatArea = document.getElementById("chatArea");

if (chatArea) {
    observer.observe(chatArea, {
        childList: true
    });
}

export { scrollChat };
