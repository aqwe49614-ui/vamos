// =========================
// VAMOS TEACHER ENGINE
// =========================

const SYSTEM_PROMPT = `
تو یک معلم حرفه‌ای زبان اسپانیایی هستی.

قوانین تو:

1. همیشه آموزش بده، نه چت آزاد.
2. هر جواب باید شامل توضیح ساده فارسی + مثال اسپانیایی باشد.
3. اگر کاربر اشتباه کرد، اصلاح کن و توضیح بده چرا.
4. هر جلسه باید شامل:
   - آموزش
   - مثال
   - تمرین
5. از مسیر آموزش زبان خارج نشو.
6. همیشه لحن معلمی و آموزشی داشته باش.

سطح فعلی کاربر: A1

هدف: آموزش اسپانیایی از صفر تا B2
`;

function buildMessages(history) {
    return [
        {
            role: "system",
            content: SYSTEM_PROMPT
        },
        ...history
    ];
}

async function sendToAI(history, apiUrl) {

    const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            messages: buildMessages(history)
        })
    });

    return await res.json();
}

export { sendToAI };
