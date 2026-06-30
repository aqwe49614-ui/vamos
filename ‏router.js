// =========================
// VAMOS ROUTER ENGINE
// =========================

const pages = {
    home: document.getElementById("homePage"),
    lesson: document.getElementById("lessonPage"),
    chat: document.getElementById("chatPage"),
    exam: document.getElementById("examPage")
};

function showPage(pageName) {

    Object.keys(pages).forEach(p => {
        pages[p].style.display = "none";
    });

    if (pages[pageName]) {
        pages[pageName].style.display = "block";
    }
}

// دکمه‌های پایین صفحه
document.getElementById("navHome").onclick = () => showPage("home");
document.getElementById("navLesson").onclick = () => showPage("lesson");
document.getElementById("navChat").onclick = () => showPage("chat");
document.getElementById("navProfile").onclick = () => showPage("home");

// شروع حالت اولیه
showPage("home");

export { showPage };
