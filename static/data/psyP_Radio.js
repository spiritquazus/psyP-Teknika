//radio
let buttonBack = document.querySelector("#buttonBack");
let buttonPausePlay = document.querySelector("#buttonPausePlay");
let buttonForward = document.querySelector("#buttonForward");
let whatsPlayingRadio = document.querySelector("#whatsPlayingRadio");

let clickBackSFX = document.querySelector("#buttonBack");
let clickPausePlaySFX = document.querySelector("#buttonPausePlay");
let clickForwardSFX = document.querySelector("#buttonForward");

/* export let currentlyPlaying; */

let radioClick = new Audio("sounds/click2.mp3");


let radioGallery = [
    {
        radioName: "Fallout 2 - Arroyo",
        radioUrl: "sounds/Music/Fallout2_Arroyo.mp3"}, 
    {
        radioName: "Metro 2033 - Guitar Track",
        radioUrl: "sounds/Music/MetroGuitar.mp3"},
    {
        radioName: "Bekrija - Bosanska Artiljerija",
        radioUrl: "sounds/Music/BosnianArtillery.mp3"},
    {
        radioName: "Mikhail Ruderman - Tачанка",
        radioUrl: "sounds/Music/Tachanka.mp3"},
    {
        radioName: "Се́ктор Га́за - Рождество́м",
        radioUrl: "sounds/Music/SectorGaza.mp3"},       
    {
        radioName: "STALKER - Bandit Radio",
        radioUrl: "sounds/Music/BanditRadio.mp3"},    
    {
        radioName: "Фики - Чупки в кръста",
        radioUrl: "sounds/Music/Фики - Чупки в кръста.mp3"},
    {
        radioName: "Софія Ротару - Одна калина",
        radioUrl: "sounds/Music/Одна калина.mp3"},  
    {
        radioName: "Отава Ё - Сумецкая",
        radioUrl: "sounds/Music/Отава Ё  - Сумецкая.mp3"},  
    {
        radioName: "Альянс - На заре",
        radioUrl: "sounds/Music/atdawn.mp3"},  
    {
        radioName: "Ibiza - Michael Kirkhov?",
        radioUrl: "sounds/Music/Ibiza.mp3"},  
    {
        radioName: "Молчат Дома - Судно",
        radioUrl: "sounds/Music/Molchatdoma.mp3"},  
    {
        radioName: "Группа Контра - Максимка-пулемет",
        radioUrl: "sounds/Music/Группа Контра - Максимка-пулемет.mp3"},
    {
        radioName: "Бутырка - А для вас я никто",
        radioUrl: "sounds/Music/Бутырка - А для вас я никто.mp3"},
]

//sound player function
let audio
function playSound(soundUrl) {
    console.log("attempting to play sound", soundUrl);
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    } 

    audio = new Audio(soundUrl);
    audio.play();
}

let muzik;
function playRadio(radioUrl){
    if (muzik && !muzik.paused) {
        muzik.pause();
        whatsPlayingRadio.innerHTML = "<span style='color: rgb(228, 172, 90)'>Paused</span>";
        buttonPausePlay.style.backgroundImage = `url("gallery/UI/uiRadioPlay.png")`
        console.log("music paused.");
    } else if (radioUrl) {
        muzik = new Audio(radioUrl);
        muzik.play();
        muzik.volume = 0.4;
        whatsPlayingRadio.innerText = (radioGallery[currentlyPlaying].radioName);
        buttonPausePlay.style.backgroundImage = `url("gallery/UI/uiRadioPause.png")`
        console.log("playing music.", radioUrl);
    } else {
        console.error("No radio URL provided.");
    }
}

function forcePlayRadio(radioUrl){

    if (radioUrl) {
        muzik.pause();
        muzik.currentTime = 0;   
        muzik = new Audio(radioUrl);
        muzik.play();
        muzik.volume = 0.4;
        whatsPlayingRadio.innerText = (radioGallery[currentlyPlaying].radioName);
        console.log("playing music.", radioUrl);
    } else {
        console.error("No radio URL provided.");
    }
}

function handleBackClick() { 
    currentlyPlaying = (currentlyPlaying - 1 + radioGallery.length)%radioGallery.length;
    forcePlayRadio(radioGallery[currentlyPlaying].radioUrl);
}

function handlePausePlayClick() {
    playRadio(radioGallery[currentlyPlaying].radioUrl);
}

function handleForwardClick() { 
    currentlyPlaying = (currentlyPlaying + 1 + radioGallery.length)%radioGallery.length;
    forcePlayRadio(radioGallery[currentlyPlaying].radioUrl);
}

currentlyPlaying = 0; 

/* console.log("exporting radionRadio.js")
//============EXPORTER============//
export { buttonBack, buttonPausePlay, buttonForward, whatsPlayingRadio, clickBackSFX, clickPausePlaySFX, clickForwardSFX, radioClick, radioGallery};
export { muzik, forcePlayRadio, playRadio, handleBackClick, handlePausePlayClick, handleForwardClick};
 */



