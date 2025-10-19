let btn = document.querySelector("#btn")
let content = document.querySelector("#content")
let voice = document.querySelector("#voice")
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text)
    text_speak.rate = 1
    text_speak.pitch = 1
    text_speak.volume = 1
    text_speak.lang = "hi-IN"
    window.speechSynthesis.speak(text_speak)
}
function wishMe() {
    let day = new Date()
    let hours = day.getHours()
    if (hours >= 0 && hours < 12) {
        speak("Good Morning sir")
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir")
    } else {
        speak("Good evening sir")
    }
}
window.addEventListener('load', () => {
    wishMe()
})

let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
let recognition = new speechRecognition()
recognition.onresult = (event) => {
    let currentIndex = event.resultIndex
    let trans = event.results[currentIndex][0].transcript
    content.innerText = trans
    let lowercase = trans.toLowerCase()
    takeCommand(lowercase)
}

btn.addEventListener("click", () => {
    recognition.start()
    btn.style.display = "none"
    voice.style.display = "block"
})

function takeCommand(message) {
    btn.style.display = "flex"
    voice.style.display = "none"
    if (message.includes("hello") || message.includes("hey")) {
        speak("hello sir, what can i help you")
    } else if (message.includes("who are you")) {
        speak("I am virtual assistance, created by vishal nishad")
    } else if (message.includes("open youtube")) {
        speak("opening youtube......")
        window.open("https://youtube.com")
    } else if (message.includes("open google")) {
        speak("opening google......")
        window.open("https://google.com")
    } else if (message.includes("open facebook")) {
        speak("opening facebook......")
        window.open("https://facebook.com")
    } else if (message.includes("open instagram")) {
        speak("opening instagram......")
        window.open("https://www.instagram.com/")
    } else if (message.includes("open whatsapp")) {
        speak("opening whatsapp......")
        window.open("whatsapp://")
    } else if (message.includes("open calculator")) {
        speak("opening calculator......")
        window.open("calculator://")
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" })
        speak(time)
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" })
        speak(date)
    } else {
        let finaltext = "this is what is found regarding" + message.replace("shifra", "") || message.replace("shipra", "")
        speak(finaltext)
        window.open(`https://in.search.yahoo.com/search?fr=mcafee&type=E210IN885G0&p=${message.replace("shifra", "")}`, "_blank")
    }
}