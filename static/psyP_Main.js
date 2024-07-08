//==============Importer==============//
/*  import { itemObject, meleeObject, ClassWeapons, meleeInstArray, tooltipCreate, consumInstArray, questInstArray } from "./data/radionItems.js";
import { table1, table2, HPBitUpdt, fullHPBitSetUp} from "./data/radionMonsters.js";

import {buttonBack, buttonPausePlay, buttonForward, whatsPlayingRadio, clickBackSFX, clickPausePlaySFX, clickForwardSFX, radioClick, radioGallery, muzik, forcePlayRadio, playRadio, currentlyPlaying, handleBackClick, handlePausePlayClick, handleForwardClick} from "./data/radionRadio.js"

import {debuffSpawn, debuffsMob, funcBleed, turnChecker, bleedDamage} from "./data/radionBuffs.js";

import {cordonEncounter} from "./data/radionLocations.js";
console.log("successfully imported from other .js modules");  */

/* const scriptRadionMonsters = document.createElement('script');
scriptRadionMonsters.src = './data/radionMonsters.js';
document.head.appendChild(scriptRadionMonsters); */



fullHPBitSetUp(1);//⚠️⚠️⚠️for all
fullHPBitSetUp("PC");

healthTotemMob.style.display = "none";
let muzikPlayTag = 0;

let rng;
let i;
let j;



let gameTime = [[1,8],[2,5]] //gameTime[0] to access hours
const GTsec = gameTime[1][1]
const GTmin = gameTime[1][0]
const GTH4 = gameTime[0][1]
const GTH2 = gameTime[0][0]

function GTset(){

}

if (gameTime[1][1]>=10){
    gameTime[1][0]+=1;
    gameTime[1][1]=gameTime[1][1]%10;
}
if (gameTime[1][0]>6){
    gameTime[0][1]+=1;
    gameTime[1][0]=0;
}
if (gameTime[0][1]>0){
    gameTime[0][0]+=1
    gameTime[0][1]=0
}
if (gameTime[0][0]>0){
    gameTime[0][0]+=1
    gameTime[0][1]=0
}

//PDA initialization:
pdaTabArr = []
for (childL of pdaScreen.children){
    if (childL.classList.contains("flexToggle")){
        console.log("EY TURN OFF", childL)
        childL.classList.toggle("flexToggle")
        pdaTabArr.push(childL)
    }
}


//temp
pda.style.transform = "translateY(100%)"

function pdaTabSwitch(tabL){
    pdaTabArr.forEach((activeTab)=>{
        if (activeTab.classList.contains("flexToggle")){
            activeTab.classList.toggle("flexToggle")
        }
    })
    if (!tabL.classList.contains("flexToggle")){
        tabL.classList.toggle("flexToggle")
    } 
    //ensure to make PDA itself visible as well. ⚙️🛠️
    pda.style.display = "flex"
    setTimeout(()=>{
        pda.style.transform = "translateY(0)"
    }, 1)
    
}

pdaBarStatus.addEventListener("click", ()=>pdaTabSwitch(statusWindow))
pdaBarInfo;
pdaBarMap.addEventListener("click", ()=>pdaTabSwitch(pdaMapTab))
pdaBarTasks.addEventListener("click", ()=>pdaTabSwitch(pdaQuestTab))
pdaBarMsg.addEventListener("click", ()=>pdaTabSwitch(pdaMsgTab))
pdaBarExit.addEventListener("click", closePDAuf)




//quest zero states
let packageQuest = 0;
let soundTemp;



//Hotkey Setup

document.addEventListener("keydown", (event) => {
    if (event.key === "b"){
    event.preventDefault();
    bagScreenFlip();
    }
})

document.addEventListener("keydown", (event) => {
    if (event.key === "t"){
    event.preventDefault();
    equipScreenFlip();
    }
})

//Observers

let txtObs = new MutationObserver(txtObsCallBack);

function txtObsCallBack(mutationsList, txtObs){ //scrolltoBot everytime theres new text + update map tab log
for (let mutation of mutationsList){
    if (mutation.type ==="childList"){
        mapTabLog.innerHTML = text.innerHTML
        scrollToBot()
        }
    } 
}

function scrollToBot() {
    logElement.scrollTop = logElement.scrollHeight;
}

const txtObsConfig = {childList: true};
txtObs.observe(text, txtObsConfig);


let statusObs = new MutationObserver(statusObsCallBack);

function statusObsCallBack(mutationsList, statusObs){ //status screen update
    for (let mutation of mutationsList){
if (mutation.type === "attributes"){

    statusCopy()
        }   
    }
}

function statusCopy() {
    statusClone.innerHTML = PCstatus.innerHTML ;
    statusClone.innerHTML += `<div id="heartMonitor" class="borderRadion1"></div>`
    console.log("!!heartmonitor InnerHTML: ", heartMonitor)
}

const statusObsConfig = {attributes: true};
statusObs.observe(statusWindow, statusObsConfig)

let buttonsObs = new MutationObserver(buttonObsCallBack);//button mutation
const buttonsCluster = [button1, button2, button3, button4]

function buttonObsCallBack(mutationsList, buttonsObs){
    console.log("buttonsObsCallBack triggered")
    for (let mutation of mutationsList){
        if (mutation.type === "childList"){
            buttonsCluster.forEach((btn) =>{
                if (btn.innerHTML.includes("N/A")){
                    btn.style.display = "none";
                } else {
                    btn.style.display = "block";
                } 
            })
        }
    }

}


const btnObsConfig = {childList: true};
buttonsCluster.forEach((node) => {
    buttonsObs.observe(node, btnObsConfig)
})



//radio

let radioOpa = 0;
musicShelfBtn.addEventListener("click", ()=>{ 
    if (radioOpa == 0){
        radioHUD.style.transform = ("translateX(70vh)")
        radioHUD.style.opacity = ("0")
        radioOpa = 1;
    } else {
        radioHUD.style.transform = ("translateX(0vh)")
        radioHUD.style.opacity = ("1")
        radioOpa = 0;
    }

})

clickBackSFX.addEventListener("click", function() { radioClick.play()});
clickPausePlaySFX.addEventListener("click", function() { radioClick.play()});
clickForwardSFX.addEventListener("click", function() { radioClick.play()});

buttonBack.onclick = handleBackClick;
buttonPausePlay.onclick = handlePausePlayClick;
buttonForward.onclick = handleForwardClick;



// initializing buttons
cinematics.style.display = "none";
healthTextButton.onclick = tutorialHealth;
manaTextButton.onclick = tutorialMana;
ammoTextButton.onclick = tutorialAmmo;
xpTextButton.onclick = tutorialXP;

//buttons at launch
button1.onclick = launchIntro; 
button2.onclick = goRoad;
button3.onclick = nothingHappens;
button4.onclick = nothingHappens;


//=========Updators===========




//item creator//
function itemCreate(itemBase) {
    bagList = document.querySelector("#inventoryContainer");

    let newItem = document.createElement('li');
    let newButton = document.createElement('button');
    newButton.className = 'itemButtonElement';
    newButton.id = itemBase['itemIndex'];
    newButton.textContent = itemBase['itemName'];  

    let newImage = document.createElement('img');
    newImage.id = itemBase['itemIconID']; 
    newImage.src = itemBase['imageUrl'];

    newItem.appendChild(newImage);
    newItem.appendChild(newButton);

    newItem.classList.add('itemContainer'); 
    newItem.id = itemBase['itemFullID'] ; // set ID for the WHOLE item stuff. to move or delete later.

    itemBase['JSID'] = document.querySelector('itemFullID');
    bagList.appendChild(newItem);  

    itemAlert(itemBase);
    itemPopIcon.src = itemBase['imageUrl']; // clear ✅
    tooltipCreate(itemBase, newItem); // clear ✅
    itemIconHide(); // clear ✅
}

//exploration RNG//
function explore(){
    switch (currentLocation){
        case "cordon":
            console.log("cordon as loc. detected")
            textUpdate("You move away from the camp into the wild plains of the Cordon area, seeking adventure.")
            percenTake(cordonEncounter)
    }//⚙️need to review what event.target exactly does. Perhaps remove. 🔴🚩🚩🚩
}

//reload and ammo usage//
let loadedAmmo = 8
function ammoLoadUpdt(_spentAmmo){
    //loadedAmmo = blabla 
    //Reload/spent ammo effect: add if stuff
    if (_spentAmmo==false){
        console.log("player is reloading.")
        loadedAmmo = 8 //⚠️ change to guns[equipped] max ammo attribute.
        for (i=0;i<loadedAmmo;i++){
            magIntContPistol.children[i].classList.remove(`${"transitTopBotFadeT" + (i+1)}`)
            magIntContPistol.children[i].classList.add("transitTopBotOut")
            console.log(`!!!${"transitTopBotFadeT" + (i+1)}`)
        }
        ammoRldBtn.id=("ammoRldBtnSpin")
        userControlMainBG = false;

        setTimeout(()=>{
            console.log("TIMEOUT FINISH")
/*             for (i=0;i<loadedAmmo;i++){
                if (magIntContPistol.childElementCount<8){
                    const _ammo = document.createElement('img')
                    _ammo.classList.add("ammoImgPistol")
                    _ammo.classList.toggle("flexToggle")
                    _ammo.classList.toggle("transitTopBotFadeT"+i.toString())
                    magIntContPistol.appendChild(_ammo)
                } else if (magIntContPistol.childElementCount>=8 && !plusRad.classList.contains("flexToggle")){
                    plusRad.classList.toggle("flexToggle")
                    break;
                }
            }   */
            for (i=0;i<loadedAmmo;i++){
                //magIntContPistol.children[i].classList.toggle("flexToggle")
                magIntContPistol.children[i].classList.add(`${"transitTopBotFadeT" + (i+1)}`)
                magIntContPistol.children[i].classList.remove("transitTopBotOut");
            }
            ammoRldBtn.id=("ammoRldBtn")
            userControlMainBG = true;
        }, "1260")
        //constantly adding and removing children is detrimental. lets do toggles.
    } else {
        const _remaindAmmo = loadedAmmo - _spentAmmo
        console.log(`player has ${_remaindAmmo} bullets left.`)
        if (_remaindAmmo < 8){
            for (i=_remaindAmmo;i<8;i++){
                magIntContPistol.children[7-i].classList.add("transitTopBotOut");
            }
        }
        if (magIntContPistol.childElementCount<9 && plusRad.classList.contains("flexToggle")){
            plusRad.classList.toggle("flexToggle")
        }
    loadedAmmo -= _spentAmmo;
    }
    ammoCounterTxt.lastChild.innerHTML = loadedAmmo
}

let currentAmmoType = 0
ammoTypeBtn.addEventListener("click", ()=>{
    switch (currentAmmoType){
        case 0:
            ammoTypeBtn.style.backgroundImage = `url("gallery/UI/burstBullet.png")`
            currentAmmoType++;
            ammoLoadUpdt(1);//temp
            break;
        case 1:
            ammoTypeBtn.style.backgroundImage = "url(gallery/UI/autoBullet.png)"
            currentAmmoType++;
            ammoLoadUpdt(1);//temp
            break;
        case 2:
            ammoTypeBtn.style.backgroundImage = "url(gallery/UI/singleBullet.png)"
            currentAmmoType=0;
            ammoLoadUpdt(1);//temp
            break;
    }
    
})

ammoRldBtn.addEventListener("click", ()=>{
    if (userControlMainBG){
        ammoLoadUpdt(false);
    }
})


//universal item equipper. For now only melee item is checked.
inventoryContainer.addEventListener("click", function(){
    if (event.target.classList.contains("itemButtonElement")) {
        let invenLButton = event.target;
        if (invenLButton.id.slice(1) === "melee") { //melee itemchecker and equipper
            console.log("@inventory item clicked: " + invenLButton.id.slice(1))
            console.log(`equipping ${meleeInstArray[invenLButton.id.slice(0,1)].name}`);
            equipAny(meleeInstArray[invenLButton.id.slice(0,1)], meleeButton, MeleeImage)
            
            equippedMelee = meleeInstArray[invenLButton.id.slice(0,1)]["itemIndex"].slice(0,1);
            console.log("did equippedMelee properly get switched to 0 or 1? " + equippedMelee)
            console.log("!! meleeInstArray[invenLButton.id.slice(0,1)]" + meleeInstArray[invenLButton.id.slice(0,1)]["itemIndex"].slice(0,1))
        }
    }// ⚙️lets use switch statement instead?
}); // ⚙️need to review what event.target exactly does.

let uniqueIndex;
// THIS NEEDS TO BE DONE IN SIMILAR WAY VVVVVVVVVV ELSE WE CANT TAKE OFF ITEMS
meleeButton.addEventListener("click", function() {
    console.log("!!check the id for event listener " +this.id)
    console.log("!!check the sliced id, does it work " +this.id.slice(0,1))
    console.log("!!check the sliced id within array, does it work " +meleeInstArray[this.id.slice(0,1)]["itemIndex"])
    uniqueIndex = this.id.slice(0,1);
    console.log("!!Checking localIndexL = "+ uniqueIndex)
    console.log("!! the fucking parameter " +meleeInstArray[uniqueIndex]["itemIndex"])
    TkOffGearTypeCheck(meleeInstArray[uniqueIndex], meleeInstArray, meleeButton, equippedMelee, MeleeImage) //⚠️⚠️⚠️ new array type containing instances. update below to reflect instead of raw instances.
}); 




function takeOffGear(putInventoryLGear, gearLImage, gearLButton) {
    //let MeleeButton = document.querySelector(".meleeButtonElement");
    //!!!!! do same with all other gears.
    gearLButton.textContent = "Empty"
    gearLButton.id = "empty";

        //let MeleeImage = document.querySelector(".meleeImg");
    //!!!!! do same with all other gears.
    gearLImage.src = "gallery/items/empty.png";
    itemCreate(putInventoryLGear);
    equipAny(meleeObject[0], meleeButton, MeleeImage)//!!!! REPLACE AND ADD TO CORRESPONDING EMPTY (itemobject[0] most likely unless im fucking monkey.); 
    };





 // meleeEquip becomes meleeObject[0]
    
 function equipMelee(meleeEquip) {
    console.log("successfully ran equipMelee function: " + meleeEquip["name"]);
    gearAlert(meleeEquip);
    if (meleeEquip == meleeObject[0]) {
        gearPopIcon.src = "gallery/null.png"
    } else {
        gearPopIcon.src = meleeEquip['imageUrl'];
    }
    meleeButton.innerHTML = meleeEquip["name"]; //🛠️
    meleeButton.id = meleeEquip["type"]; 
    MeleeImage.src = meleeEquip["imageUrl"]; 
    equippedMelee = meleeEquip["type"][0]; //🛠️
    console.log(`typechecking equipped melee indexor: ${meleeEquip["type"][0]}`)
    console.log("reading equipped melee ID:  " + meleeEquip["itemFullID"]);
    let removableElement = document.getElementById(meleeEquip["itemFullID"]);
    if (removableElement !== null) {
        removableElement.remove()};
    soundTemp = new Audio(meleeEquip["soundUrl"]);
    console.log("trying to play audio: " + meleeEquip["soundUrl"]);
    soundTemp.play();
    } 

    //

function TkOffGearTypeCheck(gearLType, gearLTypeArray, gearLButton, equippedLGearType, gearLImage) { 
    console.log("!!what is wrong with the 0 checker :" + gearLType["itemIndex"])
    if(gearLType["itemIndex"].includes("0")){
        console.log("player tried to remove empty slot: " + gearLType);
        textUpdate("That slot is empty.") // 🖐️
    } else {  
        gearLButton.textContent = "Empty"
        itemCreate(gearLType); 
        equipAny(gearLTypeArray[0], gearLButton, gearLImage) 
        console.log("attempting to take off instance: " + gearLType)
    }//🟨works?
} //🥾


    

function equipAny(gearLTypeArray, gearLButton, gearLImage) {
    console.log("successfully ran equipAny function: " + gearLTypeArray["itemName"]);
    gearAlert(gearLTypeArray);
    if (gearLTypeArray["itemIndex"].includes("0")) { 
        gearPopIcon.src = "gallery/null.png"
    } else {
        gearPopIcon.src = gearLTypeArray['imageUrl'];
    }
    gearLButton.innerHTML =  gearLTypeArray["itemName"]; 
    gearLButton.id = gearLTypeArray["itemIndex"]; 
    gearLImage.src = gearLTypeArray["imageUrl"]; 
    if (gearLTypeArray["itemClass"]=="meleeWpn"){
        meleeDmgMin.equipped = damageMin
        meleeDmgMax.equipped = damageMax
        meleeToHit.equipped = hitRate
    } else if (gearLTypeArray["itemClass"]=="gunWpn"){
        gunDmgMin.equipped = damageMin
        gunDmgMax.equipped = damageMax
        gunToHit.equipped = hitRate
    }
    console.log("reading equipped melee ID:  " + gearLTypeArray["itemFullID"]);
    let removableElement = document.getElementById(gearLTypeArray["itemFullID"]);
    if (removableElement !== null) {
        removableElement.remove()};
    soundTemp = new Audio(gearLTypeArray["soundUrl"]);
    soundTemp.play();
    }  






















//====================Click stuff and nice SFX :)===========//
//floating audio library
let questBip = new Audio("sounds/questupdate.ogg");
let sidoWTF = new Audio("sounds/sido_wtf.ogg");
let addonSFX = new Audio("sounds/inv_detach_addon.ogg")
let zipper1SFX = new Audio("sounds/zipperUp.mp3")
let zipper2SFX = new Audio("sounds/zipperDown.mp3")
let containerOpn1SFX = new Audio("sounds/openEquip1.wav")
let containerOpn2SFX = new Audio("sounds/closeEquip1.wav")
let buttonClick = new Audio("sounds/buttonPress1.wav")
let combatStartSound = new Audio("sounds/combatStart.wav")
let mobSound 
let combatMusic1 = new Audio("sounds/Music/Amaksi-Stomp.mp3")
//bag
let expandBag = document.querySelector("#bagOpener");
let beltUI = document.querySelector("#beltUI")
let inventoryBlock = document.querySelector("#inventoryBlock");
let bagOpenCheck = 0;
let logScreen = document.querySelector("#log")
//equipment


//ALERT

function alertPopUp (alertTextWrite) {
alertText.innerHTML = alertTextWrite;
alertBox.style.opacity = "1";
alertBox.style.right = "10vw";
};

alertDis.addEventListener("click", function () {
// Remove that shite button.
    alertBox.style.opacity = "0";
    alertBox.style.right = "-10vw";
    alertText.innerHTML = "";
});

//Item Pop-up

let itemPopIcon = document.querySelector("#itemPopIcon")

function itemAlert() {
    itemPopIcon.style.opacity = "1";
    itemPopIcon.style.right = "0";
    setTimeout(() => {
        itemPopIcon.style.opacity = "0";
        setTimeout(() => { 
            itemPopIcon.style.right = "15rem";
        }, 300);
      }, 250);
}

function gearAlert() {
    gearPopIcon.style.opacity = "1";
    gearPopIcon.style.right = "0";
    setTimeout(() => {
        gearPopIcon.style.opacity = "0";
        setTimeout(() => { 
            gearPopIcon.style.right = "-15rem";
        }, 300);
      }, 250);
}

//GUI

let settingsOpa = 0;
settingsShelfBtn.addEventListener("click", ()=>{ 
    if (settingsOpa == 0){
        settingsWindow.style.opacity="1"
        settingsWindow.style.transform="translateY(-110vh)"
        settingsOpa = 1;
    } else {
        settingsWindow.style.opacity="0"
        settingsOpa = 0;
        settingsWindow.style.transform="translateY(0)"
    }
})

let logClearConfirm = 0;
logZoomInBtn.addEventListener("click", ()=>{
    logElement.style.fontSize = "1.35rem";
})
logZoomOutBtn.addEventListener("click", ()=>{
    logElement.style.fontSize = "1rem";
})
logClearBtn.addEventListener("click", ()=>{
    if (logClearConfirm === 1){
        text.innerHTML = ""
        textUpdate("Log Cleared.");
    } else {
        textUpdate("Press the clear button again to confirm clearing the log.<br>[WARNING] This action cannot be cancelled.", false);
        logClearConfirm = 1;
        setTimeout(() => {
            logClearConfirm = 0;
            textUpdate("Cancelling log clear attempt.", false)
        }, 3700);
    }
    
})

let themeImgArr = ["alterna1.png", "deathrods1.png", "kontrol1.png", "alarm1.gif"];
let themeImgCurr=0;

themeImgPrev.addEventListener("click", ()=>{
    if (themeImgCurr <= 0){
        themeImgCurr = themeImgArr.length-1;
    } else {
        themeImgCurr-=1;
    }
    console.log("current index for themeImgPreview: " + themeImgCurr);
    themeImgPreview.style.backgroundImage = `url(gallery/theme/${themeImgArr[themeImgCurr]})`
})
themeImgSelect.addEventListener("click", ()=>{
    bgTheme.style.backgroundImage = `url(gallery/theme/${themeImgArr[themeImgCurr]})`
})
themeImgNext.addEventListener("click", ()=>{
    if (themeImgCurr == themeImgArr.length-1){
        themeImgCurr=0;
    } else {
        themeImgCurr+=1;
    }
    console.log("current index for themeImgPreview: " + themeImgCurr);
    themeImgPreview.style.backgroundImage = `url(gallery/theme/${themeImgArr[themeImgCurr]})`
})

//themeImageSelect WIP ⚙️

statusShelfBtn.addEventListener("click", ()=>pdaTabSwitch(statusWindow))
mapShelfBtn.addEventListener("click", ()=>pdaTabSwitch(pdaMapTab))

//BAG
function itemIconHide(){
    let invenButtons = document.querySelectorAll(".itemContainer");
    //this could cause performance issues. how about moving the selector only to when item is dynamically created??
    if (bagOpenCheck === 0){
        invenButtons.forEach((element) => element.style.opacity = "0");
    } else {
        invenButtons.forEach((element) => element.style.opacity = "1");
    }
}

expandBag.addEventListener("click", function() {
    bagScreenFlip();
});

expandEquipScreen.addEventListener("click", function(){
    equipScreenFlip();
})
let stickyGearOpenCheck = 0;

function bagScreenFlip (){
    if (bagOpenCheck === 0){  
        //Open that bitch//  
        inventoryBlock.style.height = "40vh"; 
        inventoryBlock.style.overflowY = "scroll";
        beltUI.style.right = "15vh";
        bagOpenCheck = 1;
        expandBag.innerText = "Close Bag";
        bagList.style.height = "40vh";
        if(window.innerWidth < 1080) {
            logScreen.style.marginTop = "34vh";
            console.log("RESIZED!")
        }
        itemIconHide()
        addonSFX.play();
    } else if (bagOpenCheck === 1){
        //close it//
        inventoryBlock.style.height = "9vh";
        inventoryBlock.style.overflowY = "hidden";
        beltUI.style.right = "0vh";
        inventoryBlock.scrollTop = 0;
        bagOpenCheck = 0;
        expandBag.innerText = "Open Bag";
        logScreen.style.marginTop = "1vh";
        itemIconHide()
    }
}

function equipScreenFlip (){
    if (stickyGearOpenCheck === 0){
        stickyGearSlots.style.transform = "translateY(-36.5vh)"
        stickyPortrait.style.transform = "translateY(-16vh)"
        stickyGearOpenCheck = 1;
        containerOpn1SFX.play();
    } else if (stickyGearOpenCheck === 1){
        stickyGearSlots.style.transform = "translateY(0vh)"
        stickyPortrait.style.transform = "translateY(0vh)"
        stickyGearOpenCheck = 0;
        containerOpn2SFX.play();
    }
}



function tutorialHealth() {
    console.log("clicked on health");
    text.innerHTML += "<br> <span style='color: rgb(189, 33, 29)'>[HEALTH]</span> Your current health. you lose if it reaches 0. You can use stimpaks to restore some health or rest at camps.";
}

function tutorialMana() {
    console.log("clicked on mana");
    text.innerHTML += "<br> <span style='color: rgb(57, 138, 222)'>[RADION]</span> A special form of energy only present in the Zone surrounding Chernobyl. Used to cast special abilities such as fireballs! Recharge radion by using artefacts.";
}

function tutorialAmmo() {
    console.log("clicked on bullets");
    text.innerHTML += "<br> <span style='color: rgb(228, 172, 90)'>[AMMO]</span> Your ammunition used to shoot your firearm. Can be purchased in bulk from traders.";
}

function tutorialXP() {
    console.log("clicked on XP");
    text.innerHTML += "<br> <span style='color: rgb(68, 189, 29)'>[EXPERIENCE]</span> Your accumulated experience. Every 100th will grant you additional maximum health and radion. Can also be used as favors to trade for items.";
}


//locations storage//
const eventsLib = [
    {
        name: "introduction",
        "button texts": ["Introduction", "Start your adventure", "N/A", "N/A"],
        "button functions": [launchIntro, goRoad, nothingHappens, nothingHappens],
        text: "Would you like a quick introduction to the game before proceeding? (Recommended for new players)",    
    },
    {
        name: "startofintro",
        "button texts": ["Introduction", "Start your adventure", "N/A", "N/A"],
        "button functions": [launchIntro, goRoad, nothingHappens, nothingHappens],
        text: "Your name is Strelok. You are a part of a group of treasure hunters called the \"Stalkers\", seeking rare artifacts with supernatural properties within the Chernobyl Exclusion Zone.",
        imageUrl: "gallery/strelok.jpg",
        soundUrl: "sounds/greeting2.ogg",
    },
    {
        name: "road to Chernobyl",
        "button texts": ["South (Cordon)", "West (Camp)", "East (Forest)", " North (CNPP)",],
        "button functions": [goCordon, goCamp, goForest, goCNPP,],
        text: "You stand at a crossroad. The path in front of you will lead closer to CNPP, the site of the Chernobyl accident.<br>.<br>You see lights coming from both the western and eastern ends of the roads.",
        imageUrl: "gallery/crossroad.png",
        soundUrl: "sounds/amb_crickets.wav",
    },

    {
        name: "Cordon",
        "button texts": ["Talk (Sidorovich)", "Trade (Nimble)", "Explore", "Crossroad",],
        "button functions": [sidoConvo, nimbleConvo, explore, goRoad,],
        text: "You are in Cordon, a small abandoned village now turned into a camp for rookie Stalkers seeking fortune in this desolate place.",
        imageUrl: "gallery/cordon.png",
        soundUrl: "sounds/guitar_6.ogg",
    },
    {
        name: "Camp",
        "button texts": ["Talk (Kiril)", "Trade (Skinflint)", "Fight (Dire wolves)", "Crossroad",],
        "button functions": [kirilConvo, skinflintConvo, nothingHappens, goRoad,],
        text: "You arrive at the mercenary camp. People are not too friendly here but perhaps you could engage in some trade.",
        imageUrl: "gallery/merc.png",
        soundUrl: "sounds/greeting3.ogg",
    },
    {
        name: "Forest",
        "button texts": ["Fight (Dragon)", "Crossroad", "N/A", "N/A",],
        "button functions": [nothingHappens, goRoad, nothingHappens, nothingHappens,],
        text: "You emerge in a grove in the middle of the deadly Red Forest. You can hear the howls of mutated monsters.",
        imageUrl: "gallery/redforest.png",
        soundUrl: "sounds/night_forest_amb.wav",
    },
    {
        name: "CNPP",
        "button texts": ["Fight (Final Boss)", "Crossroad", "N/A", "N/A",],
        "button functions": [nothingHappens, goRoad, nothingHappens, nothingHappens,],
        text: "You close in to the chernobyl nuclear power plant. The site of accident that caused the apparition of the Zone of Alienation. Dangerous creatures roam the area.",
        imageUrl: "gallery/cnpp.png",
        soundUrl: "sounds/windcave.wav",
    },
]

//NPCs storage//

//Sidorovich
const NPC = [
    {
        name: "Sidorovich",
        "button texts": ["Talk (Quest)", "Buy Ammo", "Heal", "Leave",],
        "button functions": [sidoQuestOne, sidoAmmo, sidoHeal, goCordon,],
        text: "You meet with Sidorovich, the greedy bastard in charge of trading at the Cordon camp. <br>\"Hey Strelok! Off to hunt? Let me know if you need supplies.\"",
        imageUrl: "gallery/sido.png",
        soundUrl: "sounds/sido_greet.ogg",
    },
    {
        name: "Sidorovich Quest Start",
        "button texts": ["Accept", "\"Maybe later.\"", "N/A", "N/A",],
        "button functions": [sidoQuest, sidoConvo, nothingHappens, nothingHappens,],
        text: "The old goat smirks. <br>\"Ah, I knew you would be interested. There's some mercenary guys holding the perimeter at a camp north of here. Amongst them you might find a certain bloke called Sgt. Kovachev. Deliver him this package and tell him it's from Sidorovich. That's all you need to do.\"",
        imageUrl: "gallery/sidopackage.png",
        soundUrl: "sounds/sido_quest.ogg",
    },
    {
        name: "Sidorovich ammo",
        "button texts": ["Buy (-20 EXP)", "Cancel", "N/A", "N/A",],
        "button functions": [buyingAmmo, sidoConvo, nothingHappens, nothingHappens,],
        text: "\"Need some bullets for your peashooter?\"<br>You can buy 5 ammo for 20 experience. Life isn't cheap in the Zone.",
        imageUrl: "gallery/sidoammo.png",
        soundUrl: "sounds/sido_trade.ogg",
    },
    {
        name: "Sidorovich health",
        "button texts": ["Buy (-10 EXP)", "Cancel", "N/A", "N/A",],
        "button functions": [buyingHealth, sidoConvo, nothingHappens, nothingHappens,],
        text: "\"Need to get patched up? I can give you a medkit but you'll have to cough up the dough first.\"<br>You can get 10 health back for 10 experience.",
        imageUrl: "gallery/sidomedkit.png",
        soundUrl: "sounds/sido_trade.ogg",
    },
]

//Kiril
const NPC2 = [
    {
        name: "Sgt. Kovachev",
        "button texts": ["Talk (Quest)", "Buy Stimpak", "Artifact", "Leave",],
        "button functions": [kirilQuestOne, kirilStimpak, kirilSymbiont, goCamp,],
        text: "You enter the makeshift office of the mercenary.<br>\"Good day Strelok. You may not know me but I know who you are, Stalker. I am Sgt. Kovachev but you can refer to me as Kiril.\"",
        imageUrl: "gallery/kiril.png",
        soundUrl: "sounds/accept_2.ogg",
    },
    {
        name: "Kiril Wolves",
        "button texts": ["Accept", "\"Sounds easy.\"", "Refuse", "N/A",],
        "button functions": [goCamp, nothingHappens, kirilConvo, nothingHappens,],
        text: "Kiril stares at the window for a few seconds before turning back his attention to you.<br>\"We're having some issues with the wolves outside of the camp perimeter. Mutant wolves. They're not difficult for my boys to take care of when on patrol, but the real annoying part is when they assault lone, weak supply delivery boys like you or when someone goes to take a shit at night. Sneaky bastards... Take care of them and I'll give you something good as a reward.\"",
        imageUrl: "gallery/sidopackage.png",
    },
    {
        name: "Kiril Stimpak",
        "button texts": ["Buy (-50 EXP)", "Cancel", "N/A", "N/A",],
        "button functions": [buyingStimpak, kirilConvo, nothingHappens, nothingHappens,],
        text: "\"Yes, we do have some surplus of stimpaks to spare. But obviously they don't come cheap. I hope you have something of value to trade for them.\"<br>You can buy a stimpak for 50 experience. These can be used during combat to restore 25 health.",
        imageUrl: "gallery/mercstimpak.png",
    },
]

//monsters//




//Quests//
const Quest = []



//Screengoing stuff//






//items//








// locations (on click what happens? how do buttons change?)

function launchIntro() {
    // Function logic goes here
    update(eventsLib[1]);
    console.log("intro button clicked.");
}

function goRoad() {
    update(eventsLib[2]);
    if (initializerCheck === 0){
    equipAny(meleeInstArray[0], meleeButton, MeleeImage);
    equippedMelee = meleeInstArray[0]["itemIndex"].slice(0,1);
    itemCreate(meleeInstArray[1]);
    initializerCheck++
    }
    console.log("going to the road");
}//🥾

function goCordon() {
    update(eventsLib[3]);
    console.log("player tried to click Cordon");
}

function goCamp() {
    update(eventsLib[4]);
    console.log("player tried to click Camp");
}

function goForest() {
    update(eventsLib[5]);
    console.log("player tried to click Forest");
}
function goCNPP() {
    update(eventsLib[6]);
    console.log("player tried to click CNPP");
}




//conversations

function sidoConvo() {
// Function meeting Sidorovich
       update(NPC[0]);
       console.log("sido talk"); 
       if(packageQuest ===0) {
        textUpdate(`"By the way, you are going to see the mercenaries, I may have a <span style='color: goldenrod'>quest</span> for you."`)
       }
}

function sidoQuestOne() {
// initiating quest for package (NPC array 1) OR get told its taken.
    if(packageQuest === 0) {
        update(NPC[1]);
    } else if(packageQuest === 1) {
            textUpdate(`"I already gave you the package. Move your ass!"`);
            sidoWTF.play();
            console.log("sido already gave package");    
    }
    console.log("sido talk about package"); 
}

function sidoQuest() {
// Accepting the package
    update(NPC[0]);
    textUpdate(`"Here it is. Be careful, it's fragile. And don't make the mercs wait. I heard the Sergeant has quite the temper."`);
    questBip.play();
    itemCreate(questInstArray[0]);
    alertPopUp("You received your first quest! The item has been added to your inventory.<br> You can check its description by hovering over the icon.");
    console.log("got quest! sido package");

    console.log("sido talkquest accepted. back to main convo (like sido talk"); 
}



function sidoAmmo() {
// talking to sido about ammo. given choice to purchase or not
    update(NPC[2]);
    console.log("sido buy ammo"); 
}

function buyingAmmo() {
// actually purchasing ammo    
    if(xp>=20) {
        xp -= 20;
        ammo += 5;
        ammoText.innerText = ammo;
        xpText.innerText = xp;
        console.log("Bought ammo. -20xp +5ammo");
        textUpdate(`You purchased a handful of ammunition.`);
        questBip.play();
    } else {
        console.log("Player is broke, purchase of ammo cancelled");
        textUpdate(`"You don't have enough credits for that, Strelok."`);
    }
}

function sidoHeal() {
    // Function logic goes here
    update(NPC[3]);
    console.log("sido buy heal"); 
}

function buyingHealth() {
    // actually buying health    
        if(xp>=10 && health<=maxHealth-10) {
            xp -= 10;
            health += 10;
            healthText.innerText = ammo;
            xpText.innerText = xp;
            console.log("+10hp -20xp");
            textUpdate(`You healed yourself for 10 health points.`);
            questBip.play();
        } else if (xp>=10 && health>=maxHealth-10) {
            console.log("Player already full HP");
            textUpdate(`"You already look healthy! A medkit won't do much."<br>You need to be wounded (more than 10 health missing) to properly use a medkit.`);
        } else {
            console.log("Player is broke, purchase of HP cancelled");
            textUpdate(`"You don't have enough credits for that, Strelok."`);
    }
}

function nimbleConvo() {
    // Function logic goes here
    console.log("nimble talk"); 
}


function skinflintConvo() {
    // Function logic goes here
    console.log("skinflint talk"); 
}

function kirilConvo() {
    update(NPC2[0]);
    console.log("kiril talk"); 
    if(packageQuest ===1) {
     textUpdate(`"I believe you have something for me? From that fat goat Sidorovich."`);
    }
}

function kirilQuestOne() {
// giving package (or its missing)
if(packageQuest === 1) {
    packageQuest ++;
    textUpdate(`"I see you have the package. Good."<br>The mercenary carefully inspects the exterior of the box, most likely to check if it had been tampered with. He quickly puts it away and looks back at you.<br>"Now if you are tired of being an errand boy, I may some interesting tasks to give you. Talk with me again if you'd like to proceed."`);
    questSidoPackage.remove();
    questBip.play();
    console.log("player giving package to Kiril."); 
    } else if(packageQuest === 0) {
        textUpdate(`"Not right now Strelok. Go bother someone else."`);
        console.log("player didnt take package from sido...");    
    } else if(packageQuest === 2) { 
        update(NPC2[1]);
    }
}

function kirilStimpak() {
    update(NPC2[2]);
    console.log("kiril buy stim??"); 
}

function buyingStimpak() {   
    console.log("Player accepted to buy stim. money??"); 
    if (xp >= 50) {
        xp -= 50
        xpText = xp
        itemCreate(itemObject[1]);
        textUpdate(`You purchased a stimpak.`);
    } else if (xp >= 50 && stimpakID) {
        //⚠️⚠️⚠️ERROR LEFTOVER 
        textUpdate(`ERROR LEFTOVER`);
    } else {
        textUpdate(`The sergeant stares at you with a stern face.<br>"This isn't a fucking charity. Come back when you can afford it."`);
    }
//attempting to purchase stim.  
}

// remove this shit afterwards, placeholder/
let Symbiont = 0
//
function kirilSymbiont() {
    if(Symbiont ===1){
        
    } else {
        textUpdate(`"I have an artefact for trade. A rare piece at that. But I don't have any immediate uses except maybe "donating" it to the scientists in Yantar. It is yours if you can bring me 3 "Crystal" Artifacts."<br>[NOTE] The "Crystal" Artifact can commonly be found close to high temperature anomalies.`);
    }
    
}


//===========event Runner============

//percenTake(cordonEncounter)


function rangeSetter(arrayL, totalWeightL, indexL = 0, startL = 0, rangeL = []){
    if (indexL >= arrayL.length) return rangeL;
    const weightL = arrayL[indexL]["weight"]
    const endL = startL + (weightL * 100 / totalWeightL) 

    rangeL.push([arrayL[indexL]["name"], startL, endL]);//✅
    return rangeSetter(arrayL, totalWeightL, indexL+1, endL, rangeL)//✅
}


function percenTake(arrParam){
    let arrayL =  (arrParam).sort((a,b)=> {return b["weight"]-a["weight"]})//✅
    console.log("!!what is the arrayL " + arrayL[0]["name"])//✅

    //const totalWeightL = arrayL.reduce((acc, num) => acc + num[1], 0,);
    const totalWeightL = arrayL.reduce((acc, num) => acc + num["weight"], 0,);//✅
    console.log("!!did reduce work? " + totalWeightL)//✅

    const visuRange = rangeSetter(arrayL, totalWeightL);//✅

    console.log(`!!the pushed new array: ${visuRange}`)
    let scL = Math.random()*visuRange[visuRange.length-1][2];
    console.log(`rolled a ${scL}`)
    let coinFlipL = 0;
  
    for(let i=0; i<visuRange.length && coinFlipL < 2; i++){

        function injectorL(){
            console.log("reading??" + arrayL[i])
            
            coinFlipScreen.style.opacity = "0";  
            switch(arrayL[i]["type"]){
                case "battle":
                    goFight(arrayL[i]["internalId"]);
                    break;
                case "positive":
                    //headsBtn.addEventListener("click", function(){⚙️eventPOSITIVE(arrayL[i]["internalId"])})
                    break;
                case "negative":
                    //headsBtn.addEventListener("click", function(){⚙️eventNEGATIVE(arrayL[i]["internalId"])})
                    break;
            }
            headsBtn.removeEventListener("click", injectorL);
            console.log("Removed event listener?" + tailsBtn)
            tailsBtn.addEventListener("click", injectorL)
        }

        if (scL < visuRange[i][2] && coinFlipL < 2){
            console.log(`${[visuRange[i][0]]} chosen as choice ${coinFlipL+1}.`);//✅

            if (coinFlipL < 1){
                    headsBtn.addEventListener("click", injectorL)
                    coinFlipL += 1;
                    i=0;
                    scL = Math.random()*visuRange[visuRange.length-1][2];
                    console.log(`rolled a ${scL}`) 
                    
            } else {
                    tailsBtn.addEventListener("click", injectorL)
                    coinFlipL += 1;    
            }
        }         

    }
    textUpdate("Pick your poison...");
    console.log("!!How many times did we run injector??")
    coinFlipScreen.style.opacity = "1";  

}  //function percenTake end


function coinFlip() {
    rng = Math.random();
    rng = rng >= 0.5? "sun" : "moon";
    return rng;
}












//test ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++




