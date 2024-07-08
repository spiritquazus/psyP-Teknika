
/* function percenTake(objParam){
    let arrayL =  Object.entries(objParam).sort((a,b)=> {return b[1]-a[1]})
    const totalWeightL = arrayL.reduce((acc, num) => acc + num[1], 0,);
    const visuRange = rangeSetter(arrayL, totalWeightL);
    console.log(`the pushed new array: ${visuRange}`)
    let scL = Math.random()*visuRange[visuRange.length-1][2];
    console.log(`rolled a ${scL}`)
    let coinFlipL = 0;

    for(let i=0; i<visuRange.length && coinFlipL < 2; i++){
        if (scL < visuRange[i][2]){
            console.log(`${visuRange[i][0]} chosen as choice ${coinFlipL+1}.`);
            if (coinFlipL < 1){
                headsBtn.onclick = window[visuRange[i][0]]();
            } else {
                tailsBtn.onclick = window[visuRange[i][0]]();
            }
            coinFlipL += 1;
            i=0;
            scL = Math.random()*visuRange[visuRange.length-1][2];
            console.log(`rolled a ${scL}`)
        }
    }         
    text.innerHTML += "<br>Pick your poison...";
    coinFlipScreen.style.opacity = "1"; 
}
 */

class EventsRoam{
    constructor(name, internalId, type, weight){
        this.name = name;
        this.internalId = internalId;
        this.type = type;
        this.weight = weight;
    }
}

let eventSlime = new EventsRoam("slime", "0", "battle", 400)
let eventBlindDog = new EventsRoam("blindDog", "1", "battle", 300)

let eventStash = new EventsRoam("stash", "0", "positive", 150)
let eventRadiationT1 = new EventsRoam("radiationT1", "0", "negative", 175)

let eventRadiationT2 = new EventsRoam("radiationT2", "1", "negative", 200)

let cordonEncounter=[
    eventSlime, eventStash, eventRadiationT1
]     

const eventsNegativeArr = [
    {
        name: "Irradiated!",
        internalName: "radiationT1",
        index: 0,
        imageUrl: "",
        soundUrl: "",
        text: "You got a bit too close to an irradiated area. Thankfully you managed to pull back as your geiger counter started crackling. You only got slightly contaminated."
    },
    {
        name: "Irradiated!",
        internalName: "radiationT2",
        index: 1,
        imageUrl: "",
        soundUrl: "",
        description: "You ran smack-dab onto a puddle of radioactive water!"
    },
    {
        name: "Irradiated!",
        internalName: "radiationT3",
        index: 2,
        imageUrl: "",
        soundUrl: "",
        description: "As you try to push through some debris blocking your path, you receive a large dose of radiation. This might be a good time to take some antirads..." 
    },
    {
        name: "Fruit Punch",
        internalName: "chemAnoT1",
        index: 3,
        imageUrl: "",
        soundUrl: "",
        "button texts": ["Search artifacts"], //⚙️need to add camp feature.
        "button functions": [artiHunt],
        description: `You see green, boiling patches of slimy liquid accompanied by the typical sizzle of a "Fruit Punch" anomaly cluster. Its corrosive properties are exhibited by its intense and rapid damage to all living tissue and inorganic matter, metal and plastic alike. You could easily circumvent the puddles, or perhaps decide to take a closer look in search of artifacts...`
    },
    {
        name: "Head Vise",
        internalName: "psiAnoT1",
        index: 4,
        imageUrl: "",
        soundUrl: "",
        description: `You come across vertical waves of distorted space. Your eyes can barely understand what is in front of you. Your PDA entry describes these anomalies as "Head Vise", a form of psy-emitting pulses that could fry out brain matter in seconds... Rumors have it that, for a psychotrope like you however, this dangerous phenomenom could be a key to unlock your potentials.`
    }
]

function artiHunt(item, chance){

}

/* const eventsNegativeBtnPrototype = { // ⚠️⚠️⚠️this will have to be moved to main file.
    "button texts": ["N/A", "N/A", "Head back", "Keep exploring"],
    "button functions": [nothingHappens, nothingHappens, goBack, explore],
} 

eventsNegativeArr.forEach(event => Object.setPrototypeOf(event, eventsNegativeBtnPrototype)); */

function eventPopN(eventL){
    update(eventL);

    eventSoundL = new Audio(eventsNegativeArr[shown].soundUrl);// in update() already?
    eventSoundL.play();
}

function eventPopP(){


}

function eventLocation(){}//might need to move this back to main.JS.

/* 
function goFight(numL, musicL) {
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
    monsterResetAnim()

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
} */



// Inject a script to load radionJS2.js






/* console.log("exporting radionLocations.js")
//============EXPORTER============//
export{cordonEncounter} */