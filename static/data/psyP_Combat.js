let inCombat = false;

let activeBattlers = {
    activeBattler0: {varID: 0, DOMID: mobParent0,},
    activeBattler1: {varID: 1, DOMID: mobParent1,},
    activeBattler2: {varID: 2, DOMID: mobParent2,},
}

let targettedMob = activeBattlers.activeBattler0 //in start of combat:
let spawnStack = 0;

//PLACEHOLDER!!!
let baseAP = 2;

//================Functions for fight
//to avoid circular dependencies, monsters table set here.

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

const monsters = [
    {
        name: "Slime",
        level: 1,
        health: 50,
        currentHealth:50,
        damageMin: 6,
        damageMax: 14,
        hitRate: 80,
        psi: 0,
        currentPsi:0,
        skill: ["none",],
        loot: [table1, table2,],
        morphlist: {},
        debuffs: {},
        slashRes: 0,
        bluntRes: 0,
        pierceRes: 0,
        psiRes: 0,
        heatRes: 0,
        toxRes: 0,
        desc: "",
        spawnText: "You come across a disgusting slime!",
        imageUrlMob: "gallery/bestiary/slime.png",
        spawnSoundUrl: "sounds/monsters/slimeSpawn.mp3",
        deathSoundUrl: "sounds/monsters/slimeDeath.mp3",
    }, 
] //more
/* 
const battleButtonsPrototype = {
    "button texts": ["Melee", "Shoot", "Defend", "Radion"],
    "button functions": [Melee, Shoot, nothingHappens, nothingHappens],
}
monsters.forEach(monster => Object.setPrototypeOf(monster, battleButtonsPrototype)); */

// invokes update of "location" and display things according to object arrays.
// monsters is the object, which holds an array of properties.
//the [0] refers to the object array index. 
// the [0].STAT is for the property type within that object array.
// call a specific stat by object[INDEX NUMBER].STAT
// This whole shit wracked my brain for a few days before i got it.
//this gofight function is called up when the function ATTACHED to a button is called. This is a literal matryoshka of functions and arrays.

//button clicked >> function of LOCATION() >> LOCATION function calls upon gofight
//the goFight function has to have its array defined in the LOCATION function
//then the matching monster in the array will be SPAWNED! VOILA!!!!


//⚠️should rename playerVictory()?
function playerVictory(){
    Array.from(buttonsMain.children).forEach(btn => btn.disabled = false);
    spawnStack = 0
    update(postFight)
}

let postFight = {
    name: "Victory",
    "button texts": ["Loot", "Keep exploring", "N/A", "N/A"], //⚙️need to add camp feature.
    "button functions": [nothingHappens, nothingHappens, nothingHappens, nothingHappens,], //⚠️Explore was missing. find it.
    text: "You take some time to consider your next actions.",
    imageUrl: "gallery/loot.png",
}



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
        _battlerChild[0].src = _battlerNum[imageUrlMob] //set up stat UI according to the container's children order
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

function goFight(_mobTypeNum, _battlerNum, _music){
    if (audio) { //stop all other ambient sounds.
        audio.pause();
        audio.currentTime = 0;
    };
    if (muzikPlayTag === 0) { //if radio not playing, play combat music.
        setTimeout(() => { 
            _music.currentTime = 0;
            _music.play();
        }, 1200);
    };
    
    monsterResetAnim(_battlerNum)
    //fighting = numL;
    if (inCombat == false){ //changes combat state if not already
        inCombat = true //⚙️⚙️⚙️might need to make a function instead, to check and toggle off accessibility to map travel, for example.
        update(combatState);//"moves" player to combat "arena"
    }
    //🚧TBA changing combat gallery according to the player's current location
    spawnMob(_battlerNum, monsters[_mobTypeNum])
    HPBitUpdt(_battlerNum, "reset");
    mobSound.play();
    combatStartSound.play();
    monsterStats.classList.add("transitTopBot");//transition effect.
    turnTicker = 0;
     //🚧⚠️⚠️⚠️ run global turn logic here to start the promise chain (combat flow)
    textUpdate(`Turn: ${turnTicker}`);
}


//a "location" that specifies combat moves possible.
let combatState = {
    name: "Combat",
    "button texts": ["[1] Melee", "[2] Shoot", "[3] Psi", "[4] Dodge", "[5] Items", "[6] Escape"],
    "button functions": [Melee, nothingHappens, nothingHappens, nothingHappens, nothingHappens, nothingHappens],
    text: "[Entering Combat] Get psyched!",
    imageUrl: "",
    soundUrl: "sounds/combatStart.wav",
}


function setTarget(_mobNum){
    //dom manipulation
    targettedMob = activeBattlers["activeBattler" + _mobNum]
}


/* function eventFightSlime() { //function wrapper
    goFight(0, combatMusic1);
}

function goFightDirewolf() {
    // Function logic goes here
    console.log("fight wolf");
}

function goFightDragon() {
    // Function logic goes here
    console.log("fight dragon");
}

function goFightBoss() {
    // Function logic goes here
    console.log("fight boss");
}
 */
//==============Buttons in fight

// TO DO LIST~~~~~~~~~~~~~~~~~~~~~~//
//need to update according to equipment object  ex (melee[0].damageMax)
//add to-hit chance calc based on weapon  ex (melee[0].hitChance)
//add bullet penetration based on weapon ex (gun[0].armorPenetration)
//also play sound.


let critdmgtemp = 1;
let dmgtemp = 1;
let pcfumbletemp = 1; //⚠️!!!!!!!!!! these 3 things could honestly be combined. since theres only 1 defined role each attempt.
let meleecritdmg = 1.3; //⚠️ Move tthis shit elsewhere too.
let hitRateBonusMelee = 0; //⚠️!!!!!!!!! Move this shit elsewhere.

class statSum{
    constructor(equipped, artiBonus, toolBonus, buffBonus, debuffMalus, perkBonus){
        this.equipped = equipped;
        this.artiBonus = artiBonus;
        this.toolBonus = toolBonus;
        this.buffBonus = buffBonus;
        this.debuffMalus = debuffMalus;
        this.perkBonus = perkBonus;
        
        }
        sumTake(){
            let _sum = 0;
            Object.values(this).forEach(val => {_sum+=val;});
            return _sum;
        }
}

let meleeDmgMin = new statSum()
let meleeDmgMax = new statSum()
let meleeToHit = new statSum()

let gunDmgMin = new statSum()
let gunDmgMax = new statSum()
let gunToHit = new statSum()

function damageTake(_dmg, _target){
    if (_target == "PC"){
        health -= _dmg;
        PChealthChkUpdt()
    } else if (_target == "allMobs"){
        for (const battler of Object.values(activeBattlers)){
            if (battler["name"]){
                battler["currentHealth"] -= _dmg
                battler["DOMID"].children[3][3].innerText = battler["currentHealth"]
            }
        }
    } else {
        targettedMob["currentHealth"] -= _dmg
        targettedMob["DOMID"].children[3][3].innerText = targettedMob["currentHealth"]
    }
}

function PChealthChkUpdt(){
    //diff between prevHealth and (current) health will indicate damage.
    return new Promise((resolve) => {
        healthText.innerHTML = health;
        
        HPBitUpdt(PC)
        if (health/maxHealth*100 > 80){
            heartMonitorBattle.style.backgroundImage = url("gallery/FX/HBMyel.gif")
        } else if (health/maxHealth*100 > 40){
            heartMonitorBattle.style.backgroundImage = url("gallery/FX/HBMred.gif")
        } else {
            heartMonitorBattle.style.backgroundImage = url("gallery/FX/HBMgreen.gif")
        }
        if ((prevHealth - health)/maxHealth*100>40){//big hit logic = took more than 40% of health in one go.
            //⚙️screenbreak FX if big damage
            //⚙️sound if big damage
        }
        prevHealth = health;
        if (health < 0){
            gameOver();
        }
        resolve();
    })
}

function buffDebuff(){
    return new Promise((resolve) => {
        //⚠️⚠️⚠️BLANK FUNCTION
            console.log('de/buff checks complete!');
            resolve();
    });
}

/* //GLOBAL TURN LOGIC DEF OLD
function turnLogicGlobal(){
    //activate debuffs/buffs()
    buffDebuff() 
        .then(()=>PChealthChkUpdt())//pc health check. gameover if 0
        .then(()=>{
            textUpdate(`Your turn to act. You have ${actionPoints} AP remaining.`);
            playerTurnN()})
        .then(()=> battlersHPCheck() <= 0? playerVictory() : monsterAsyncTurns()) //check if any battlers are alive. monsterTurn function checks if player is alive by itself
        .then(()=> battlersHPCheck() <= 0? playerVictory() : nextTurn())//check if battlers are alive after debuff/counter-attack
        .catch(error => {console.error('Error in turnLogicGlobal:', error)}); // Handle any errors that occur during the chain
        //⚠️⚠️⚠️^ need to be chained with up top else the monsterturn will just run before the player turn..
        //end of turn, clear off any scum and repeat.
} */

//GLOBAL TURN LOGIC DEF
function turnLogicGlobal() {
    buffDebuff()
        .then(() => {
            return PChealthChkUpdt(); //doubleCheck on PC health after buff/debuffs.
        })
        .then(() => {
            textUpdate(`Your turn to act. You have ${actionPoints} AP remaining.`);
            return playerTurnN(); //PLAYER ACTION 
        })
        .then(() => { 
            if (battlersHPCheck() <= 0) { //if all dead -> VICTORY!
                playerVictory(); //⚠️⚠️⚠️where is player victory?
            } else {
                return monsterAsyncTurns(); //all mobs player their turn
            }
        })
        .then(() => {
            if (battlersHPCheck() <= 0) {
                playerVictory(); // Check for victory again after mobs turns
            } else {
                return nextTurn(); // next turn happens.
            }
        })
        .catch(error => {
            console.error("Error in turnLogicGlobal: ", error);
        });
}


function nextTurn() {
    turnTicker ++
    AP = baseAP
    console.log("this turn ", turnTicker)
    textUpdate(`Turn: ${turnTicker}`)
    turnChecker ();
    if (debuffsMob[0]["active"] == 1) { //⚠️⚠️⚠️bleedchecker. this is very dirty. :D fucking find a way to Class or prototype this.
        funcBleed(monsters[fighting].health, monsters[fighting].level);
        textUpdate(`The enemy takes ${bleedDamage} damage from bleeding!`);
        monsterHealth-=bleedDamage; //⚠️⚠️⚠️ monsterHealth and monsters[fighting] do not exist anymore.
    }
    turnLogicGlobal() 
}


//🚩🚩ASYNC SETUP SKELETON:
//test

function playerTurnN() { //playerTurn
    const _actionButtons = Array.from(buttonsMain.children)
    _actionButtons.forEach(btn => btn.disabled = false); //allow buttons being clicked

    return new Promise((resolve) => {
        _actionButtons.forEach((btn)=>{
            const absolver = (evt) => { //add to action button, consumes AP, then autoremoves itself after AP == 0
                console.log('AP-based action taken.');
                AP -= 1; //Decrement action points

                if (AP <= 0) {
                    _actionButtons.forEach(btn=>btn.removeEventListener('click', absolver))
                    resolve();
                }
            };
            btn.addEventListener('click', absolver);
        })
    _actionButtons.forEach(btn => btn.disabled = true); //block buttons from being clicked
    });
}

/* //🚧clone of playerTurnN
function playerTurnN() { //playerTurn
    const _actionButtons = Array.from(buttonsMain.children)
    _actionButtons.forEach(btn => btn.disabled = false); //allow buttons being clicked
    return new Promise(async (resolve) => {
        _actionButtons.forEach((btn)=>{
            const absolver = (evt) => { //add to action button, consumes AP, then autoremoves itself after AP == 0
                console.log('AP-based action taken.');
                AP -= 1;
            };
            btn.addEventListener('click', absolver);
        })
        while(AP>0){
            await playerActReady;
            if (AP <= 0){
                _actionButtons.forEach(btn=>btn.removeEventListener('click', absolver));
                break;
            }
        }
        resolve();
    _actionButtons.forEach(btn => btn.disabled = true); //block buttons from being clicked
    });
} */


function monsterAsyncTurns(){
    return new Promise(async(resolve)=>{
        for (const battler of Object.values(activeBattlers)){
            await monsterTurn(battler)
        }
        resolve();
    })    
}
//run as Object.keys(activeBattlers).forEach(monsterTurn(_battler))
function monsterTurn(_battler) { //⚠️Redo some :)
    return new Promise((resolve) => {    
            if (_battler["name"]){
            const _hitRoll = Math.floor(Math.random()*100)
            let _mobDmg;
            //maybe change the 85 hitchance below to a dynamic value?

            //basic attack. but should sandwich it in BOOLEAN and conditionals when i add skills to mobs!
            if (_hitRoll < Math.floor(Math.random()*_battler.hitRate)) { //Bool for mob hit/miss
                _mobDmg = Math.floor(getMonsterAttackValue(_battler)); //🟨test
                console.log("took some damage there!");  
                textUpdate(`The ${_battler["name"]} attacks! You take ${_mobDmg} damage.`, false); 
            } else {
                _mobDmg = Math.floor(getMonsterAttackValue(_battler)*0.55); //🟨test
                damageTake(_mobDmg, "PC")
                console.log("mob missed! Graze");
                textUpdate(`The ${_battler["name"]} fumbled and grazed you. You take ${_mobDmg} damage.`, false); 
            }
            _mobDmg = _mobDmg <= 0 ? 1 : _mobDmg;
            playAnim(_battler["DOMID"].children[0], "bleedFX.gif", 1000).then(()=>{ //⚙️bleedFX is placeholder
                damageTake(_mobDmg, "PC")
                PChealthChkUpdt().then(()=>resolve()) //🟨Need to test. maybe ask chatGPT at this point...
            })
        } else {
            console.log(`Battler ${_battler["varID"]} was empty. Skipping.`)
        }
    });
}

//monster turn CALC
function getMonsterAttackValue(_battler) {
    const hitmob = (Math.floor(Math.random() * (_battler["damageMax"]-_battler["damageMin"]) + _battler["damageMin"])) - (Math.floor(Math.random() * ((1 - 0.5) + 0.5) * armor)); //basic atk formula. range of attack of monster - random armor multiplier down to half
    console.log("Player ate dmg: ", hitmob);
    return hitmob >= 0 ? hitmob : 1; //stop the armor-absorbed hits from "healing" lmao. les degats ne sont pas negatifs.
} 

/* function AllSteps() {
    step1()
        .then(() => step2()) // Call step2 after step1 is resolved
        .then(() => step3())
        .then(() => {
            step4();
            if (x) {
                step5();
            }
        });
}
// Call AllSteps to start the sequence
AllSteps(); */

function battlersHPCheck(){
    let _sum
    for (let battler in activeBattlers){
        _sum += battler["currentHealth"]
    }
    return _sum
}

//melee attack with monster turn

//run ex: Melee(meleeInstArray, equippedMelee)
function Melee(_instArray, _equippedMelee) { //⚠️⚠️⚠️review everything.
    let _dmg = 0;
    Hitchance(meleeToHit.sumTake()); //diceroll to calculate hit or graze.
    console.log("_instArray[_equippedMelee].hitRate" + meleeToHit.sumTake());
    console.log ("final hitchance" + hitroll);
    
    if (hitroll > 0) { //check if specials should trigger first
        meleeSpecials(
            _instArray[_equippedMelee].special[0],
            _instArray[_equippedMelee].special[1],
            _instArray[_equippedMelee].special[2],);

        console.log("accessing melee specials stats: " + _instArray[_equippedMelee].special[0] +_instArray[_equippedMelee].special[1] +_instArray[_equippedMelee].special[2]);
        if (bleed>0) {
            console.log("bleed success!")
            debuffSpawn(0)//⚠️⚠️⚠️ need to go over debuff and targetting.
        }
        if (crit>0){ //crit attack
            _dmg = Math.floor(pcMeleeDamageRoll() * meleecritdmg);
            _dmg = _dmg <= 0 ? 1 : _dmg;
            textUpdate(`Critical Strike! You deal ${_dmg} damage.`, false);   
            
            //⚠️need to add stun logic as well.
        } else { //normal attack
            _dmg = Math.floor(pcMeleeDamageRoll());
            _dmg = _dmg <= 0 ? 1 : _dmg;
            textUpdate(`You strike the enemy with your ${_instArray[_equippedMelee].itemName} and deal ${_dmg} damage.`, false);
        }
        //add line for more stuff from melee specials
    } else { //graze attack
        _dmg = Math.floor(pcMeleeDamageRoll() * 0.3);
        _dmg = _dmg <= 0 ? 1 : _dmg;
        textUpdate(`You missed the swing and only grazed the monster! Your damage was greatly reduced... You deal ${_dmg} damage.`, false);
    }
    damageTake(_dmg)
    HPBitUpdt(targettedMob["varID"]);// 🟨needs testing + bit convoluted. refactor later.

    
    };// END

//move monsterDeath somewhere else.
function monsterDeath() {//⚠️⚠️⚠️to be redone to handle multiple mobs...
    healthTotemMob.style.display = "none"
    textUpdate(`You stand victorious as the enemy slumps to the ground. You live to see another day! Time to loot...`);
    let gainedXp = Math.floor(monsters[fighting].level * 2);
    textUpdate(`You receive ${gainedXp} experience points.`, false);
    xp += gainedXp;
    xpText.innerText = xp;
    
    //let lootBoxCount = monsters[fighting].loot.count();
    //monsters[fightning].loot[lootIndex] this will access number 0 in the loot tables! 
    //the index of the array, not the value.
    for (i = 0; i < monsters[fighting].loot.length; i++) {
        coinFlip();
        if (rng == "sun") {
        console.log("player succeeded coinflip!")
        console.log("running the loot for table number: " + JSON.stringify(monsters[fighting].loot[i].lootName) + "from monster " + monsters[fighting].name);
        console.log("iteration number " + [i])
        //rollForLoot(monsters[fighting].loot[i]); ⚠️⚠️⚠️ Loot table need to be revised. See below.
        } else {
        console.log("player failed coinflip, skipping over tha BAG!")
        continue;
        }
    }
    mobSound = new Audio(monsters[fighting].deathSoundUrl)
    mobSound.play();
    combatMusic1.pause();
    monsterStats.classList.remove("transitTopBot");
    monsterDeathAnim();
    monsterHealth = null;
    monsterLevel = null; //select by children and nullify at once.
    monsterAttackMin = null;
    monsterAttackMax = null;
    monsterSkill = null;
    fighting = null;
    for (i=0; i<monsterStats.children.length; i++){
        if (monsterStats.children[i].id.includes("monster")){
            monsterStats.children[i].innerText = "";
            console.log("removed " + monsterStats.children[i].id)
        }
    }
    playerVictory();
}   

function monsterDeathAnim() {
    monsterBattler.style.filter = "blur(3px)";
    monsterBattler.style.mixBlendMode = "multiply";
    monsterBattler.style.backgroundColor = "rgba(255, 20, 20, 1)";
    setTimeout(() => { 
        monsterBattler.style.opacity = "0";
    }, 300);
}


//loot system
function rollForLoot(lootTablate){ //⚠️⚠️⚠️this has to be redone
    //lootTablate will be table1 for first iteration. 
    //table2 for 2nd iteration of the for loop above. and so on.
    for (j = 0; j < lootTablate.referenceID.length; j++) {
        let lootSuccess = Math.random()*lootTablate.lootChance[j] - Math.random();
        console.log("played rolled for loot success: " + lootSuccess)
        if (lootSuccess > 0) {
            console.log("item looted successfully: " + lootTablate.referenceID[j].name);
            itemCreate(lootTablate.referenceID[j]);
            text.innerHTML += "<br>You found " + lootTablate.referenceID[j].name;
            
        } else {
            console.log("did not get item: " + lootTablate.referenceID[j].name);
        };
    }
    

};




//exp system

/* let mobHitChance = 85; //THESE ALL NEED TO BE FIXED. CHECK PCFUMBLETEMP
let mobfumbletemp = 0;
let mobdmgtemp; */



//does shoot function exist?
/* function Melee() {


    if (monsterHealth > 0) {
        monsterTurn();
        console.log("the monster attacks. its his turn baybee")
        //monster attacking
        healthText.innerText = health;
    } else if (monsterHealth <= 0) {
        monsterDeath();
        console.log("the PC triumphs!")
    }

    if (health <= 0) {
        gameOver();
        turnTicker=0
    } else {
        nextTurn()
    }
}; */

function Shoot() {

    //add shooty calc here.
    Hitchance(gunObject[equippedGun].hitRate, hitRateBonusGun); //!!!equippedGun doesnt exist, hitRateBonusGun either.
    //diceroll to calculate hit or graze.
    if (hitroll > 0) {

        if (crit>0){ 
            critdmgtemp = Math.floor(shootingAttack() * shootyCritDmg);  //!!!!! shootycrit doesnt exist.
            critdmgtemp = critdmgtemp <= 0 ? 1 : critdmgtemp;
            monsterHealth -= critdmgtemp;
            monsterHealthText.innerText = monsterHealth;
            textUpdate(`Critical Shot! You deal  ${critdmgtemp} damage with your gun.`, false);
            console.log("Critical Shoote!");   

        } else {
            pcfumbletemp = Math.floor(shootingAttack() * 0.6);
            pcfumbletemp = pcfumbletemp <= 0 ? 1 : pcfumbletemp;
            monsterHealth -= pcfumbletemp;
            monsterHealthText.innerText = monsterHealth;
            textUpdate(`You missed your shot and grazed the enemy. You deal ${pcfumbletemp} damage.`, false);
            console.log("player rolled a miss haha");
        }

        if (monsterHealth > 0) {
            monsterTurn();
            console.log("the monster attacks. its his turn baybee");
            //monster attacking
            healthText.innerText = health;
        } else if (monsterHealth <= 0) {
            monsterDeath();
            console.log("the PC triumphs!");
        }

        if (health <= 0) {
            gameOver();
            turnTicker=0;
        } else {
            nextTurn();
        }


    }
}


//player death
    function gameOver() {
        console.log("player got absolutely DESTROYED git gud")
        text.innerHTML += "<br>.<br><br>.<br><br>.<br>You have died! The Zone claims another life..."
        button1.innerText = "Damn!"
        button2.innerText = "Damn!"
        button3.innerText = "Damn!"
        button4.innerText = "Damn!"
        button1.onclick = nothingHappens
        button2.onclick = nothingHappens
        button3.onclick = nothingHappens
        button4.onclick = nothingHappens
    }



//melee attack CALC 
function meleeAttackAttempt(meleeatkMax, meleeatkMin, moblvl, meleeadditives) {
    //idem but monster lvl
  let  hitmelee = Math.random() * (meleeatkMax - meleeatkMin) + meleeatkMin + meleeadditives - (Math.random() * (0.4 - 0.2) + 0.2) * moblvl;
  console.log("Player trying to slash the miscreant! " + hitmelee) ;
  return hitmelee >= 0 ? hitmelee : 1; //boom cest le choc
} //🥾
function pcMeleeDamageRoll() {    
    let damage = meleeAttackAttempt(meleeInstArray[equippedMelee].damageMax, meleeInstArray[equippedMelee].damageMin, monsters[fighting].level, meleeAdditiveCalc);
    console.log("meleeInstArray[equippedMelee].damageMax" + meleeInstArray[equippedMelee].damageMax)
    console.log("meleeInstArray[equippedMelee].damageMin" + meleeInstArray[equippedMelee].damageMin)
    console.log("monster level" + monsters[fighting].level)
    console.log("meleeAdditiveCalc" + meleeAdditiveCalc)
    return damage;
}

//miss attack CALC, binary
//here can call upon object type (either firearm or melee) to set the proper hitchance calc!
let hitroll = 0;
function Hitchance(hitvalue, hitvalbonus) { 
    console.log("what is hitvalue at " + hitvalue);
    hitroll = -1*((Math.floor(Math.random() * 100)) - hitvalue - hitvalbonus);
    console.log("Hit yes or no", hitroll) 
}


//shooty attack CALC
//should have less RESISTANCE than melee atk. also have the res calc include var dependent on the ARMOR PIERCING properties of the bullet?


//lvl 60 mob has on average 7~10 dmg res. upwards to 20 and as low as 1
//lvl 120 upward to 40 LINEAR TO LEVEL
// each 1 of rangedpene will be like removing a level from mob. so a pene of 20 on a lvl 2 mob would be a lot of bonus damage :)
function shootingAttack(rangedatkMax, rangedatkMin, moblvl, rangedadditives, rangedpenetration) {
    const rangedabsorb = (Math.floor(Math.random() * ((0.32 - 0.17) + 0.17) * (moblvl- rangedpenetration )) )*-1;
    const hitshooty = (Math.floor(Math.random() * ((rangedatkMax - rangedatkMin)) + rangedatkMin + rangedadditives)) + rangedabsorb; //idem but monster lvl
    if (rangedabsorb < 0) {
        textUpdate(`Your attack literally and entirely pierced through your foe! You dealt ${rangedabsorb} additional damage.`, false)
    } else if (rangedabsorb === 0) {
        console.log("0 absorb nice") ;
        textUpdate("Your attack negated the foe's resistance.", false);
    }
    //i mustve been fucking drunk when i designed this calculation what is going on with the parenthesis
    if (hitshooty < 0) {
        textUpdate("Oh dear, your attack didn't do much!", false);
        return hitshooty > 0 ? hitshooty : 1; //boom cest le choc
    }

}




//meleeObject[0]["special"][0] crit
//meleeObject[0]["special"][1] bleed
//meleeObject[0]["special"][2] stun
let equippedart = 0;
//equippedart - linear value that increase the MIN atk value. high enough value would result in guaranteed total dmg increase
let equippedaddons = 0;
//equippedaddons for mods and stuff? idk yet.
let meleeAdditiveCalc = equippedaddons + equippedart;
//let meleeAdditiveCalc = equippedart + equippedaddons;


let equippedMelee;
let equippedHelmet;
let equippedBody;
let equippedGun;
let equippedArti;
let equippedTool;
let crit;
let bleed;
let stun;
// more to come ???

function meleeSpecials(special1, special2, special3) {
    //crit
    crit = (Math.floor(Math.random() * (100 - special1) + special1 )) - (Math.floor(Math.random() * 100))
    //bleed
    bleed = (Math.floor(Math.random() * (100 - special2) + special2 )) - (Math.floor(Math.random() * 100))
    //stun
    stun = (Math.floor(Math.random() * (100 - special3) + special3 )) - (Math.floor(Math.random() * 100))
}


//Monster anim reset
function monsterResetAnim(_battlerNum) {
    battlerCont.children[_battlerNum].style.filter = "blur(0)";
    battlerCont.children[_battlerNum].style.mixBlendMode = "normal";
    battlerCont.children[_battlerNum].style.backgroundColor = "rgba(255, 255, 255, 0)";
}