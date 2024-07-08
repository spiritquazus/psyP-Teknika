


//obj containing damage values for example
let dmgSumMobs = {
    base: 0,
    
}

let healthSumPC = {
    base: 80,
    buffPerk: 0,
    buffHunger: 20,

}

let psySumPC = {
    base: 30,
    buffPerk: 0,
    buffSleep: 0,
    buffSanity: 0,

}

let defSumPc = {
    base: 0,
    buffPerk: 0,
    buffArmor: 0,
    buffMods: 0,
    buffArt: 0,
}

class buffSetups{
    constructor(base, perk, sleep, sanity, hunger, armor, art, addon, ranged, melee, money, ammo, buff1, debuff2, buff2, debuff2){

    }
}


//action points





//====================Monsters Battle System

//the whole system is very clunky. best store combat aptitude in objects instead.

//SENT to PsyP_battle🥾
const emptyBattler={ // store all stats of local mob being fought here then recycle when end or start combat.
    //empty state. restore with this after battle end,
    internalID:null,
    name:"",
    health:0,
    currentHealth:0,
    level:0,
    damageMin:0,
    damageMax:0,
    hitRate:0,
    psi:0,
    currentPsi:0,
    skill:0,
    loot: [],
    desc: "",
    morphlist: {},
    debuffs: {},
    slashRes: 0,
    bluntRes: 0,
    pierceRes: 0,
    psiRes: 0,
    heatRes: 0,
    toxRes: 0,
    desc: "",
    spawnText: "empty battler. Successful reset.",
    imageUrlMob:"",
    spawnSoundUrl:"",
    deathSoundUrl:"",
}


function goFight(numL, musicL) { //🔴 COPY. remove
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    } ;
    if (muzikPlayTag === 0) {
        setTimeout(() => { 
            musicL.currentTime = 0;
            musicL.play();
        }, 1000);
    };
    monsterResetAnim()//?

    fighting = numL;
    update(monsters[fighting]);
    monsterHealth = monsters[fighting].health;
    monsterLevel = monsters[fighting].level;
    monsterAttackMin = monsters[fighting].damageMin;
    monsterAttackMax = monsters[fighting].damageMax;
    monsterSkill = monsters[fighting].skill; 

    monsterName.innerText = monsters[fighting].name;
    monsterSkillsText.innerText += monsterSkill; 
    monsterAttackTextMin.innerText += monsterAttackMin; 
    monsterAttackTextMax.innerText += monsterAttackMax; 
    monsterHealthText.innerText += monsterHealth;
    monsterLevelText.innerText += monsterLevel;
    monsterBattler.src = monsters[fighting]["imageUrlMob"];
    monsterBattler.style.opacity = "1";
    healthTotemMob.style.display = "flex";
    
    mobSound = new Audio(monsters[fighting].spawnSoundUrl);
    console.log("updating monsterBattler with " + monsters[fighting]["imageUrl"]);
    //add portrait info update. 
        //add beast sounds too.
    console.log("fight button clicked. Updating?");
    mobSound.play();
    combatStartSound.play();
    monsterStats.classList.add("transitTopBot");
    HPBitUpdt(monsterHealth, monsters[fighting].health, "reset");
    turnTicker = 0;
    textUpdate(`Turn: ${turnTicker}`);
}

//SENT to PsyP_battle🥾
let inCombat = False

//SENT to PsyP_battle🥾
let activeBattlers = {
    activeBattler0: {varID: 0, DOMID: mobParent0,},
    activeBattler1: {varID: 1, DOMID: mobParent1,},
    activeBattler2: {varID: 2, DOMID: mobParent2,},
}

//SENT to PsyP_battle🥾
let targettedMob;
//in start of combat:
targettedMob = activeBattlers.activeBattler0
function setTarget(_mobNum){
    //dom manipulation
    targettedMob = activeBattlers["activeBattler" + _mobNum]
    
}


//SENT to PsyP_battle🥾
let spawnStack = 0
//example of running func: goFight(activeBattlers.activeBattler1, monsters[0])
function spawnMob(_battlerNum, _mobData){
    if (_battlerNum["name"] == undefined){
        console.log("Error 230 - Mob spawn overflow. Should be hardcoded to not happen")
        spawnStack = 0;
        return false
    }
    if (_battlerNum["name"] == ""){
        Object.keys(_mobData).forEach(key => _battlerNum[key] = _mobData[key])
        const _battlerChild = _battlerNum["DOMID"].children
        _battlerChild[0].src = _battlerNum[imageUrlMob]
        _battlerChild[3][1].innerText = _battlerNum["name"]
        _battlerChild[3][3].innerText = _battlerNum["health"]
        _battlerChild[3][5].innerText = _battlerNum["level"]
        _battlerChild[3][7].innerText = _battlerNum["damageMin"]
        _battlerChild[3][9].innerText = _battlerNum["damageMax"]
        _battlerChild[3][11].innerText = _battlerNum["skills"]

        _battlerChild.style.opacity = "1";
        healthTotemMob.style.display = "flex"; //⚙️set mutation observer attached to monsterBattler instead.
        spawnStack ++
    } else {
        spawnMob(activeBattlers["activeBattler" + spawnStack])
    }
}

/* ⚙️example of DOM structure for mobParent
    const mobParent0 = document.getElementById("mobParent0")

    <div id="mobParent0">
        <img class="monsterBattler" src="gallery/null.png">
        <div class="monsterHealthBar">                               
        </div>
        <div class="debuffMobContainer"></div>
        <div class="monsterStats">
            <p>Name: </p>0
                <span id="monsterName"></span>1
            <p>Health: </p>2
                <span id="monsterHealth"></span>3
            <p>Level: </p>4
                <span id="monsterLevel"></span>5
            <p>Damage: </p>6
                <span id="monsterAttackMin"></span>7
                <span>~</span>8
                <span id="monsterAttackMax"></span>9
            <p>Skills: </p>10
                <span id="monsterSkills"></span>11
    <div>
*/

//example of running func: goFight(monsters[0], activeBattlers.activeBattler1, muzik)\

//SENT to radionlocations🥾
function goFight(_mobTypeNum, _battlerNum, _music){
    if (audio) {
        audio.pause();
        audio.currentTime = 0;
    };
    if (muzikPlayTag === 0) {
        setTimeout(() => { 
            _music.currentTime = 0;
            _music.play();
        }, 1200);
    };
    
    monsterResetAnim(_battlerNum)
    //fighting = numL;
    if (inCombat == false){
        inCombat = true //might need to make a function instead, to check and toggle off accessibility to map travel, for example.
        update(combatState);//⚠️See below.
        //update("fightstate" or some shit.)
    }
    spawnMob(_battlerNum, monsters[_mobTypeNum])
    HPBitUpdt(_battlerNum, "reset");
    mobSound.play();
    combatStartSound.play();
    monsterStats.classList.add("transitTopBot");//⚠️
    turnTicker = 0;
    textUpdate(`Turn: ${turnTicker}`);
}

//SENT to radionlocations🥾
let combatState = {
    name: "Combat",
    "button texts": ["[1] Melee", "[2] Shoot", "[3] Psi", "[4] Dodge", "[5] Items", "[6] Escape"],
    "button functions": [Melee, Shoot, nothingHappens, nothingHappens, nothingHappens, nothingHappens],
    text: "[Entering Combat] Get psyched!",
    imageUrl: "",
    soundUrl: "sounds/combatStart.wav",
}

//SENT to psyP_battle 🥾
function monsterResetAnim(_battlerNum) {
    battlerCont.children[_battlerNum].style.filter = "blur(0)";
    battlerCont.children[_battlerNum].style.mixBlendMode = "normal";
    battlerCont.children[_battlerNum].style.backgroundColor = "rgba(255, 255, 255, 0)";
}

/* 
let mobSpawnDOMhandler = {
    set: (target, property, value)=>{
        if (property === "activeBattler0"){
            //test
            monsterHealth = 
        }
        if (property === "activeBattler1"){

        }
        if (property === "activeBattler2"){

        }
        target[property] = value;
        return true
    }
}

const mobSpawnProxy = new Proxy(activeBattlers, mobSpawnDOMhandler) */