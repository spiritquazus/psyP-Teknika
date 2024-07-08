let userControlMainBG = true;




//🚩==================================================Unifunc==================================================

function closePDAuf(){
    pda.style.display = "none", pda.style.transform = "translateY(100%)"
}

//=========Text===============

function textUpdate(textCont, timeCheck){
    if (textCont != text.lastElementChild.innerText){
        const newMsgLog = document.createElement('p');
        newMsgLog.innerHTML = textCont;
        const newMsgContainer = document.createElement('div');
        newMsgContainer.appendChild(newMsgLog);
        text.appendChild(newMsgContainer);
        if(timeCheck !== false){
            newMsgLog.insertAdjacentHTML("afterbegin", `[${new Date().getHours()}:${new Date().getMinutes()}]`)
        }
    }
}

//=========Timeout func===============

function delayOperation(_milisec, _function, ...funcArgs){
    setTimeout(()=>{_function(...funcArgs)}, _milisec)
}

function delayChain(_milisec){
    return new Promise((resolve) => {
        setTimeout(resolve, _milisec);
    });
}

//=========Animation bases=========

function playAnim(_target, _anim, _milisec, _nextAnim, ..._nextAnimParams) {
    battleAnimProm = new Promise((resolve) => {
        setTimeout(() => resolve("!!animCompleted"), _milisec);
    });
    console.log(_anim + " playing.");
    let _file = new Image();
    _file.src = "gallery/FX/" + _anim;
    _file.classList.add("centeredAnim") //⚙️centeredAnim class hasnt been setup yet.
    _target.appendChild(_file)

    setTimeout(() => {
        _file.style.opacity = 0;
        setTimeout(() => _target.removeChild(_file), 500); // Adjust the delay for fade-out
    }, _milisec);

    if (_nextAnim) {
        return delayChain(_milisec).then(() => playAnim(_target, _nextAnim, ..._nextAnimParams));
    } else {
        
        return delayChain(_milisec); 
    }
}

// Example of calling
//playAnim(mainScreen, "animation1.gif", 2000, "animaetion2.gif", 4000);

//🚩==================================================Univars==================================================


//==============Initializing==============
let initializerCheck = 0

//==============stats==============
let xp = 0;
let health = 100;
let maxHealth = 100;
let prevHealth = health
let psi = 50;
let ammo = 5;
let armor = 0;
let money = 100;
let actionPoints = 2;

let fighting;
let monsterHealth;
let monsterLevel;
let monsterAttackMin;
let monsterAttackMax;
let monsterSkill;

let turnTicker = 0;

//==============Map/GPS==============
let mapBlock = [] 
let mapBases = []
let mapQuests = []
let mapHunt = []
let mapAssassin = []
let mapMove = []
let mapDungeon = []
let mapRadiation = []

let currPCArea;
let coordY = 134;
let coordX = 16;

//============blank Promises============
let battleAnimProm = Promise.resolve();