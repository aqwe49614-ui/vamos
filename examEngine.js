// =========================
// VAMOS EXAM ENGINE
// =========================

let currentExam = null;
let score = 0;

// ساخت امتحان ساده برای هر درس
function generateExam(lessonId) {

    if (lessonId === 1) {
        return [
            {
                q: "سلام به اسپانیایی چی میشه؟",
                a: "hola"
            },
            {
                q: "صبح بخیر به اسپانیایی؟",
                a: "buenos días"
            }
        ];
    }

    if (lessonId === 2) {
        return [
            {
                q: "من هستم به اسپانیایی؟",
                a: "yo soy"
            },
            {
                q: "اسم من است؟",
                a: "me llamo"
            }
        ];
    }

    return [];
}

// شروع امتحان
function startExam(lessonId) {

    currentExam = generateExam(lessonId);
    score = 0;

    let container = document.getElementById("examContainer");

    container.innerHTML = `
        <div class="examBox">
            <h2>📝 امتحان درس ${lessonId}</h2>
            <div id="questionBox"></div>
            <input id="examInput" placeholder="جواب را بنویس...">
            <button id="submitAnswer">ثبت پاسخ</button>
        </div>
    `;

    let index = 0;

    function showQuestion() {

        if (index >= currentExam.length) {
            finishExam();
            return;
        }

        document.getElementById("questionBox").innerText =
            currentExam[index].q;

        document.getElementById("examInput").value = "";
    }

    function checkAnswer() {

        let input = document.getElementById("examInput").value.trim().toLowerCase();

        if (input === currentExam[index].a) {
            score += 10;
        }

        index++;
        showQuestion();
    }

    document.getElementById("submitAnswer").onclick = checkAnswer;

    function finishExam() {

        container.innerHTML = `
            <div class="examBox">
                <h2>🎉 پایان امتحان</h2>
                <p>نمره شما: ${score}</p>
            </div>
        `;
    }

    showQuestion();
}

export { startExam };
