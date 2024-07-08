/* import {itemObject, ClassWeapons, meleeInstArray} from "./radionItems.js";

//import { , } from "./ "; */


//⚙️combine all tables into 1 please.

let table1 = {
    lootName: ["medusa", "stimpak"],
    lootChance: [0.05, 0.06,],
    referenceID: [itemObject[2], itemObject[1],],
}

let table2 = {
    lootName: ["ammo", "stimpak",],
    lootChance: [0.2, 0.04,],
    referenceID: [itemObject[5], itemObject[1],],
}


function fullHPBitSetUp(_mobNum){ //
    let _healthTotem = healthBarPC
    if (_mobNum != "PC"){
        _healthTotem = document.getElementById("healthBarMob" + _mobNum)
    } 
    for (let i = 0; i < 50; i++) {
        let _healthBit = document.createElement("div")
        _healthBit.className = "hpBitMob"
        _healthTotem.appendChild(_healthBit)
    }
} 


//run example: function HPBitUpdt(currentLhealth, maxLhealth, _mobNum, reset)
function HPBitUpdt(_mobNum, _purpose){ 
    if (_mobNum != "PC"){
        //we can use the current hp for the currentLhealth parameter. maxHealth should be decided on the monster object.
        const _localBattler = activeBattlers["activeBattler" + _mobNum]
        const _battlerChild = _localBattler["DOMID"].children
        const _healthTotem = document.getElementById("healthBarMob" + _mobNum)
        const _percent = (_localBattler["currentHealth"]/_localBattler["health"])*100;
    } else {
        const _healthTotem = healthBarPC;
        const _percent = (health/maxHealth)*100;
    }
    const _currentHealthBars = Math.ceil((_percent/100)*50)
        
    for (let i = _currentHealthBars; i < _healthTotem.children.length; i++){
        console.log("what is _healthTotem.children[i] at ? " + [i] +"and the actual child? " + _healthTotem.children[i])
        //⚙️could add style to instead translate upwards + opacity to 0.
        if (i>0){
        _healthTotem.children[i].style.transform = "translateY(1vh)";
        _healthTotem.children[i].style.opacity = "0"
        }
    }

    switch(_purpose){
        case "heal":
            console.log("healing.")
            _length = _healthTotem.children.length
            break;
        case "reset":
            console.log("resetting health")
            _length = 50            
            break;
        default:
            _length = 0;
    }
    for (i = 0; i < _length; i++){
        _healthTotem.children[i].style.transform = "translateY(0)";
        _healthTotem.children[i].style.opacity = "1"
    }
    
    
};//🟨need to test


/*     if (currentHealthLBars > _healthTotem.children.length){
        for (let i = _healthTotem.children.length; i < currentHealthLBars; i++){
            _healthTotem.children[i].style.transform = "translateY(0)";
            _healthTotem.children[i].style.opacity = "1"
        }//⚙️same but reverse.
    }   */  //⚙️ what happens if i do this⚠️
    //_healthTotem.children.length always 50.





/* 
console.log("exporting radionMonsters.js")
//============EXPORTER============//
export { table1, table2, HPBitUpdt, fullHPBitSetUp}; */
