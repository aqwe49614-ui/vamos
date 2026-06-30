// =========================
// VAMOS VOICE ENGINE
// =========================

// خواندن متن با صدای اسپانیایی
function speak(text) {

    if (!window.speechSynthesis) {
        alert("مرورگر شما از صدا پشتیبانی نمی‌کند");
        return;
    }

    const utter = new SpeechSynthesisUtterance(text);

    // تنظیم زبان اسپانیایی
    utter.lang = "es-ES";

    // سرعت و تن صدا
    utter.rate = 0.9;
    utter.pitch = 1;

    // پیدا کردن صدای اسپانیایی (اگر موجود باشد)
    const voices = speechSynthesis.getVoices();

    const spanishVoice = voices.find(v =>
        v.lang.includes("es")
    );

    if (spanishVoice) {
        utter.voice = spanishVoice;
    }

    speechSynthesis.speak(utter);
}

// توقف صدا
function stopSpeak() {
    speechSynthesis.cancel();
}

// گرفتن لیست صداها (برای تست)
function getVoices() {
    return speechSynthesis.getVoices();
}

export { speak, stopSpeak, getVoices };
