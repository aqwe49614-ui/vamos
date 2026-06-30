// =========================
// VAMOS LESSON ENGINE
// =========================

const lessons = [
    {
        id: 1,
        title: "سلام و معرفی",
        content: `
🇪🇸 درس 1: سلام و احوالپرسی

📚 آموزش:

در اسپانیایی برای سلام کردن می‌گوییم:

Hola = سلام
Buenos días = صبح بخیر

📌 مثال:

Hola amigo = سلام دوست من
Buenos días profesor = صبح بخیر استاد

✍️ تمرین:
بنویس "سلام" به اسپانیایی
        `
    },
    {
        id: 2,
        title: "معرفی خود",
        content: `
🇪🇸 درس 2: معرفی خود

📚 آموزش:

Yo soy = من هستم
Me llamo = اسم من است

📌 مثال:

Yo soy Ali = من علی هستم
Me llamo Sara = اسم من سارا است

✍️ تمرین:
خودت را معرفی کن
        `
    }
];

let currentLesson = 0;

function showLesson(index) {

    const container = document.getElementById("lessonContainer");

    if (!container) return;

    const lesson = lessons[index];

    container.innerHTML = `
        <div class="lessonCard">
            <h2>${lesson.title}</h2>
            <pre>${lesson.content}</pre>

            <button id="nextLessonBtn">
                درس بعد
            </button>
        </div>
    `;

    document.getElementById("nextLessonBtn").onclick = () => {
        nextLesson();
    };
}

function startLessons() {
    currentLesson = 0;
    showLesson(currentLesson);
}

function nextLesson() {
    currentLesson++;

    if (currentLesson >= lessons.length) {
        alert("🎉 همه درس‌ها تمام شد!");
        return;
    }

    showLesson(currentLesson);
}

export { startLessons, nextLesson };
