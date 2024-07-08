//draft for buff/debuff system


//dependent on turnTicker system.

//need add HTML div + css for setting de/buffs ON the monsters and ON the player!
//add icons too obv.

let bleedDamage = 0;

//add this to Turnticker function.
function turnChecker () {
    //if buffcounter <= 1, remove
    //else buffcounter --
    //use objects.forEach method?? so first convert all de/buffs into object array, then set their tickers.
    debuffsMob.forEach(obj => {

            if (obj['counterCurr'] >1) {
                obj['counterCurr'] --;
                let counterAffiched = document.getElementById(obj["dbTickerID"]);
                counterAffiched.innerHTML = obj["counterCurr"];

                //!!!! UPDATE THE DEBUFFMOBCONTAINER!
            } else if (obj['counterCurr']<=1) {
                obj["active"] = 0;
                if (obj["active"] == 0) {
                    let removableDBElement = document.getElementById(obj["dbID"]);
                    if (removableDBElement !== null) {
                        removableDBElement.remove()};
                }
            }
        
    });
    //worry about the actual effects later. lets see if the screen and ticking even works...
}


let debuffsMob = [
{
    dbName: "bleed",
    dbID: "bleedMobID",
    dbTickerID: "bleedMobTickerID",
    description: "target takes damage proportional to remaining health, depending on severity",
    icon: "gallery/skills/bleed.png",
    counterCurr: 0,
    counterMax: 4,
    active: 0,
},
{
    dbName: "dead",
    dbID: "bleedMobID",
    dbTickerID: "bleedMobTickerID",
    description: "target takes damage proportional to remaining health, depending on severity",
    icon: "gallery/skills/bleed.png",
    counterCurr: 0,
    counterMax: 4,
    active: 0,
},
]

class deAndBuffs{
    constructor(dbName, dbID, dbTickerID, icon, counterCurr, counterMax, rank, active, description){
        this.dbName = dbName;
        this.dbId = dbID;
        this.dbTickerID = dbTickerID;
        this.icon = icon;
        this.counterCurr = counterCurr;
        this.counterMax = counterMax;
        this.rank = rank;
        this.active = active;
        this.description = description;
    }
}

let bleedDB = new deAndBuffs("Bleed", "0bleedDB", "bleedMobTickerID", "gallery/skills/bleed.png", 0, 4, 1, false, "Target takes damage proportional to remaining health, depending on severity")
let toxinDB = new deAndBuffs("Toxicity", "0toxinDB", "toxinMobTickerID", "gallery/skills/bleed.png", 0, 6, 1, false, "Target takes fixed damage depending on severity of the effect.")


//⚙️copy to work with
//debuffSpawn(activeBattler3, bleedDB, 1)
function debuffSpawn(_target, _chosenDebuff, _severity) {
    if (_target == "PC"){
        
    } else {
        _target["debuffs"][_chosenDebuff.dbID] = _chosenDebuff//make sure debuffs is an array /use console command to check the state.
    }  //battler0 .debuffs. bleedDB = bleedDB
        /* 
            battler0 = {
                debuffs = {
                    empty : ''
                    blablaDB: ''
                    bleedDB: {
                                dbName = 0bleedDB
                                severity = 2
                                turns left = 5
                }
            }
        */

    if (debuffsMob[debuffObjArray]["active"] != 1) {
    let debuffMobContainer = document.querySelector("#debuffMobContainer");
    console.log("attempting to invoke debuff " + debuffsMob[debuffObjArray]["dbName"] )
    let newDebuff = document.createElement('li');
    newDebuff.id = debuffsMob[debuffObjArray]["dbID"];

    let newDebuffImage = document.createElement('img');
    newDebuffImage.src = debuffsMob[debuffObjArray]["icon"];
    
    let newDebuffCounter = document.createElement('span');
    newDebuffCounter.className = "orbitPlsRed";
    newDebuffCounter.id = debuffsMob[debuffObjArray]["dbTickerID"];
    debuffsMob[debuffObjArray]["counterCurr"] = debuffsMob[debuffObjArray]["counterMax"];
    newDebuffCounter.innerHTML = debuffsMob[debuffObjArray]["counterCurr"];
    
    debuffsMob[debuffObjArray]["active"] = 1;
    newDebuff.appendChild(newDebuffCounter);
    newDebuff.appendChild(newDebuffImage);

    debuffMobContainer.appendChild(newDebuff);
    }
}   

function debuffSpawn(debuffObjArray) {
    if (debuffsMob[debuffObjArray]["active"] != 1) {
    let debuffMobContainer = document.querySelector("#debuffMobContainer");
    console.log("attempting to invoke debuff " + debuffsMob[debuffObjArray]["dbName"] )
    let newDebuff = document.createElement('li');
    newDebuff.id = debuffsMob[debuffObjArray]["dbID"];

    let newDebuffImage = document.createElement('img');
    newDebuffImage.src = debuffsMob[debuffObjArray]["icon"];
    
    let newDebuffCounter = document.createElement('span');
    newDebuffCounter.className = "orbitPlsRed";
    newDebuffCounter.id = debuffsMob[debuffObjArray]["dbTickerID"];
    debuffsMob[debuffObjArray]["counterCurr"] = debuffsMob[debuffObjArray]["counterMax"];
    newDebuffCounter.innerHTML = debuffsMob[debuffObjArray]["counterCurr"];
    
    debuffsMob[debuffObjArray]["active"] = 1;
    newDebuff.appendChild(newDebuffCounter);
    newDebuff.appendChild(newDebuffImage);

    debuffMobContainer.appendChild(newDebuff);
    }
}   


//functions??

function funcBleed(mobLHealth, mobLLevel) {
       bleedDamage = Math.floor(mobLHealth*(0.1 + debuffsMob[0].counterCurr * 0.03) - mobLLevel);    
    //add icon element with blabla
    //
};
/* 
//============EXPORTER============//
export {debuffSpawn, debuffsMob, bleedDamage, funcBleed, turnChecker}; */