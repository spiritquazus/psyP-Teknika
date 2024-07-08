//⚒️ DOM setup ⚒️

const buttonsMain = document.getElementById("buttonsMain")
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const text = document.querySelector("#text");
const xpText = document.querySelector("#experience");
const maxXpText = document.querySelector("#PCmaxExperience");
const moneyText = document.querySelector("#money")
const healthText = document.querySelector("#PChealth");
const maxHealthText = document.querySelector("#PCmaxHealth");
const manaText = document.querySelector("#PCmana");
const ammoText = document.querySelector("#Ammo");

const xpTextButton = document.querySelector("#xpText");
const healthTextButton = document.querySelector("#healthText");
const manaTextButton = document.querySelector("#manaText");
const ammoTextButton = document.querySelector("#ammoText");
const moneyTextButton = document.querySelector("#moneyText")

const alertBox = document.querySelector("#alert");
const alertText = document.querySelector("#alertText");
const alertDis = document.querySelector("#alertDis");

const battlerCont = document.getElementById("battlerCont")
const mobParent0 = document.getElementById("mobParent0");
const mobParent1 = document.getElementById("mobParent1");
const mobParent2 = document.getElementById("mobParent2");

const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const monsterLevelText = document.querySelector("#monsterLevel");
const monsterAttackTextMin = document.querySelector("#monsterAttackMin");
const monsterAttackTextMax = document.querySelector("#monsterAttackMax");
const monsterSkillsText = document.querySelector("#monsterSkills");

const screenMain = document.getElementById("screen");
const cinematics = document.getElementById("screenBackground");
const logElement = document.querySelector("#log");
const monsterStats = document.querySelector("#monsterStats");
const healthTotemMob = document.querySelector(".monsterHealthBar");//⚠️⚠️⚠️fixed on mob. could use parameter instead to use either on PC or mob.

const meleeSlot = document.querySelector("#meleeSlot");
const gunSlot = document.querySelector("#gunSlot");

const meleeButton = document.querySelector(".meleeButtonElement");
const helmetButton = document.querySelector(".helmetButtonElement");
const bodyButton = document.querySelector(".bodyButtonElement");
const gunButton = document.querySelector(".gunButtonElement");
const artiButton = document.querySelector(".artiButtonElement");
const toolButton = document.querySelector(".toolButtonElement");

const MeleeImage = document.querySelector(".meleeImg");
const helmetImage = document.querySelector(".helmetImg");
const bodyImage = document.querySelector(".bodyImg");
const gunImage = document.querySelector(".gunImg");
const artiImage = document.querySelector(".artiImg");
const toolImage = document.querySelector(".toolImg");

let removableElement;
const itemButtonElement = document.querySelectorAll(".itemButtonElement");
const bagList = document.querySelector("#inventoryContainer");

const expandEquipScreen = document.querySelector("#gearOpenBtn");
const stickyGearSlots = document.querySelector("#stickyGearSlots");
const stickyPortrait = document.querySelector("#stickyPortrait");

const radioHUD = document.querySelector("#radioHUD")

const musicShelfBtn = document.querySelector("#musicShelf")
const mapShelfBtn = document.getElementById("mapShelf")
const statusShelfBtn = document.querySelector("#statusShelf")
const generalShelfBtn = document.querySelector("#generalShelf")
const settingsShelfBtn = document.querySelector("#settingsShelf")
const hamburgerShelfBtn = document.querySelector("#hamburgerShelf")
const settingsWindow = document.querySelector("#settingsWindow")

const logZoomInBtn = document.getElementById("logZoomIn")
const logZoomOutBtn = document.getElementById("logZoomOut")
const logClearBtn = document.getElementById("logClear")

const themeImgPreview = document.getElementById("themeImgPreview")
const themeImgPrev = document.getElementById("themeImgPrev")
const themeImgSelect = document.getElementById("themeImgSelect")
const themeImgNext = document.getElementById("themeImgNext")

const bgTheme = document.getElementById("bg")

const coinFlipScreen = document.getElementById("coinFlipWindow")
const headsBtn = document.getElementById("headsBtn")
const tailsBtn = document.getElementById("tailsBtn")

//--PDA
const pda = document.getElementById("pda")
const pdaScreen = document.getElementById("pdaScreen")

const pdaBarStatus = document.getElementById("pdaBarStatus")
const pdaBarInfo = document.getElementById("pdaBarInfo")
const pdaBarMap = document.getElementById("pdaBarMap")
const pdaBarTasks = document.getElementById("pdaBarTasks")
const pdaBarMsg = document.getElementById("pdaBarMsg")
const pdaBarExit = document.getElementById("pdaBarExit")
const mapEnterButton = document.getElementById("mapEnterButton")


const pdaNavBar = document.getElementById("pdaNavBar")

const statusClone = document.getElementById("statusClone")
const heartMonitor = document.getElementById("heartMonitor")
const PCstatus = document.getElementById("statusSide")
const statusWindow = document.getElementById("pdaStatusTab")

const PCpawn = document.getElementById("PCpawn")
const mapVis = document.getElementById("mapVis")
const mapImgGrid = document.getElementById("mapImgGrid")
const mapAndLog = document.getElementById("mapAndLog")
const mapTabLog = document.getElementById("textLogDupli")
const mapTest = document.getElementsByClassName("mapTest")[0]
const pdaMapTab = document.getElementById("pdaMapTab")
const eventScreen = document.getElementById("eventScreen")
const upBtn = document.getElementById("upBtn")
const downBtn = document.getElementById("downBtn")
const rightBtn = document.getElementById("rightBtn")
const leftBtn = document.getElementById("leftBtn")
const mapJoystickBase = document.getElementById('directionalBtn')

const pdaQuestTab = document.getElementById("pdaQuestTab")

const pdaMsgTab = document.getElementById("pdaMsgTab")

const ammoCounter = document.getElementById("ammoCounter")
const ammoCounterTxt = document.getElementById("ammoCounterTxt")
const magIntContPistol = document.getElementById("magIntContPistol")
const plusRad = document.getElementById("plusRad")
const ammoTypeBtn = document.getElementById("ammoTypeBtn")
const ammoRldBtn = document.getElementById("ammoRldBtn")

const battleStatsPC = document.getElementById("battleStatsPC")
const healthBarPC = document.getElementById("healthBarPC")
const heartMonitorBattle = document.getElementById("heartMonitorBattle")