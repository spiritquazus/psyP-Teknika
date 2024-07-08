
//import { , } from "./ ";
//import { , } from "./ ";





//Items Storage//

class ClassItems {
    constructor(itemName, itemIconID, itemIndex, itemFullID, special, consum, soundUrl, imageUrl, description, descriptionDeux, itemClass){
        this.itemName = itemName;
        this.itemIconID = itemIconID;
        this.itemIndex = itemIndex
        this.itemFullID = itemFullID
        this.special = special //attach function according to what it does
        this.consum = consum
        this.soundUrl = soundUrl
        this.imageUrl = imageUrl
        this.description = description
        this.descriptionDeux = descriptionDeux
        this.itemClass = itemClass
    } 
}

const consumItem0 = new ClassItems("Stimpak", "stimpakIcon", "0consum", "consumStimpak", StimpakHeal(), "", "sounds/genericHolstering.ogg", "gallery/items/stimpakgreen.png", 
"Military-grade medicated injector developped in the Yantar lab. Greatly helps wound recovery", "Use to heal yourself for 20% of your maximum life.","consummable")

const consumItem1 = new ClassItems("Money", "walletIcon", "1consum", "consumWallet", getCashT1(), "", "sounds/genericHolstering.ogg", "gallery/items/wallet.png", 
"Someone's lost wallet. But it's yours now. Most of the currency circulated around in the Zone have been digitalized, but a lot of the stalkers still prefer to have some extra change.", "Use to get some rubles.","consummable")

const consumItem2 = new ClassItems("Tourist's Delight", "canFoodIcon", "2consum", "consumfood1", eatShit(), "", "sounds/genericHolstering.ogg", "gallery/items/tourist.png", 
"Presumably, these canned goods were looted by stalkers from an army ration depot. Without any kind of label on the can, it's hard to say for sure. Should still be good to eat, if you believe the best before date.", "Use to sate hunger and restore some health","consummable")

const consumItem3 = new ClassItems("Water Bottle", "waterIcon", "3consum", "consumfood1", eatShit(), "", "sounds/genericHolstering.ogg", "gallery/items/water.png", 
`Bottled mineral water of the brand "Mordoshka", a real luxury in the Zone, where all natural sources are irradiated.`, "Use to sate hunger and restore some health. Also helps with flushing out radiation from your body.","consummable")

let consumInstArray = [consumItem0, consumItem1, consumItem2, consumItem3,]

function StimpakHeal(){
};

function getCashT1(){
};

function eatShit(){

}

const questItem0 = new ClassItems("Package", "packageIcon", "0quest", "questSidoPackage", "", "", "sounds/genericHolstering.ogg", "gallery/items/package.png", 
"A plain-looking cardboard box. Whatever's in it is quite heavy.", "Essential Item", "impItem")

let questInstArray = [questItem0,]

const itemObject = [
    {
        name: "Package",
        itemIconID: "packageIcon" , 
        imageUrl: "gallery/items/package.png",
        itemFullID: "packageID",
        type: "questItem",
        itemIndex: "0",
    },
    {
        name: "Stimpak",
        itemIconID: "stimpakIcon" ,
        imageUrl: "gallery/items/stimpak.png",
        itemFullID: "stimpakID",
        type: "consumable",
        itemIndex: "1",
    },
    {
        name: "Medusa",
        itemIconID: "medusaIcon" ,
        imageUrl: "gallery/items/medusa.png",
        itemFullID: "medusaID",
        type: "artifact",
        itemIndex: "2",
    },
    {
        name: "Crystal",
        itemIconID: "crystalIcon" ,
        imageUrl: "gallery/items/crystal.png",
        itemFullID: "crystalID",
        itemIndex: "3",
    },
    {
        name: "Stimpak",
        itemIconID: "stimpakIcon" ,
        imageUrl: "gallery/items/stimpak.png",
        itemFullID: "stimpakID",
        itemIndex: "4",
    },
    {
        name: "Stimpak",
        itemIconID: "stimpakIcon" ,
        imageUrl: "gallery/items/stimpak.png",
        itemFullID: "stimpakID",
        itemIndex: "5",
    },
]

//weapons MELEE//

const meleeObject = [
    {
        name: "Empty",
        itemIconID: "empty1Icon",
        imageUrl: "gallery/items/empty.png",
        itemFullID: "emptyID",
        type: "0melee",
        damageMax: 10,
        damageMin: 5,
        hitRate: 70,
        special: [12, 0, 16],
    },
    ////special: "1st crit rate, 2nd is bleed rate, 3rd is stun rate"
    //meleeObject[0]["special"][0];
    //why as array instead of stat lines like the rest? cuz i wann dynamically add other effects depending on the weaponb heehehe
    {
        name: "Old Knife",
        itemIconID: "knife1Icon",
        imageUrl: "gallery/items/knife1.png",
        itemFullID: "knife1ID",
        type: "1melee",
        description: "An old, rusty piece of trash. Can serve as a weapon in a pinch, perhaps cause tetanos in your enemies...",
        damageMax: 12,
        damageMin: 9,
        hitRate: 68,
        special: [7, 12, 9],
        soundUrl: "sounds/drawKnife.ogg",
    },
    { 
        name: "Hunting Knife",
        itemIconID: "knife2Icon",
        imageUrl: "gallery/items/knife2.png",
        itemFullID: "knife2ID",
        itemIndex: "2melee",
        description: "A traditionnal knife used to skin animals. Can penetrate tough hide an thick fur decently.",
        damageMax: 15,
        damageMin: 10,
        hitRate: 70,
        special: [12, 15, 5],
        soundUrl: "sounds/drawKnife.ogg",
    },
    { 
        name: "Shovel",
        itemIconID: "knife3Icon",
        imageUrl: "gallery/items/shovel.png",
        itemFullID: "knife3ID",
        itemIndex: "3melee",
        description: "Aluminium shovel with a polished wooden handle. Appreciated by stalkers and gravediggers alike. An excellent implement to bonk people too!",
        damageMax: 14,
        damageMin: 12,
        hitRate: 70,
        special: [10, 0, 21],
        soundUrl: "sounds/drawKnife.ogg",
    },
]


class ClassWeapons {
    constructor(itemName, itemIconID, itemIndex, itemFullID, damageMax, damageMin, hitRate, special, soundUrl, imageUrl, description, itemClass){
        this.itemName = itemName;
        this.itemIconID = itemIconID;
        this.itemIndex = itemIndex
        this.itemFullID = itemFullID
        this.damageMax = damageMax
        this.damageMin = damageMin
        this.hitRate = hitRate
        this.special = special //this is an array. melee is crit/bleed/stun, gun is for crit/burst
        this.soundUrl = soundUrl
        this.imageUrl = imageUrl
        this.description = description
        this.itemClass = itemClass
    } 
    //can add methods here such as for debuffs?  hmmm.😢
}

const meleeInstance0 = new ClassWeapons("Empty", "empty1Icon", "0melee", "knife0ID", 10, 5, 70, [12, 0, 13], "sounds/genericHolstering.ogg", "gallery/items/empty.png", 
"Your hands, supposedly. Calloused and dirty but adapted to the rough lifestyle of the Zone.", "meleeWpn")
const meleeInstance1 = new ClassWeapons("Old Knife", "knife1Icon", "1melee", "knife1ID", 12, 9, 68, [7, 11, 9], "sounds/drawKnife.ogg", "gallery/items/knife1.png", 
"An old, rusty piece of trash. Can serve as a weapon in a pinch, perhaps cause tetanos in your enemies...", "meleeWpn") 
const meleeInstance2 = new ClassWeapons("Hunting Knife", "knife2Icon", "2melee", "knife2ID", 15, 10, 70, [12, 15, 5], "sounds/drawKnife.ogg", "gallery/items/knife2.png", 
"A traditionnal knife used to skin animals. Can penetrate tough hide an thick fur decently.", "meleeWpn") 
const meleeInstance3 = new ClassWeapons("Shovel", "knife3Icon", "3melee", "knife3ID", 14, 12, 72, [10, 0, 21], "sounds/drawKnife.ogg", "gallery/items/shovel.png", 
"Aluminium shovel with a polished wooden handle. Appreciated by stalkers and gravediggers alike. An excellent implement to bonk people too!", "meleeWpn") 


let meleeInstArray = [];
meleeInstArray.push(meleeInstance0, meleeInstance1, meleeInstance2, meleeInstance3) //⚙️and so forth ⚠️ may need to move to core, as there will be scoping issues for editing.

//console.log(`melee instance: ${meleeInstArray[1].itemName}`) 🟩
//console.log(`melee instance: ${meleeInstArray[1]["itemName"]}`) 🟩
//console.log(`melee instance: ${meleeInstArray[1][itemName]}`) 🔴

const gunInstance0 = new ClassWeapons("Empty", "empty1Icon", "0gun", "gun0ID", 0, 0, 0, [0, 0], "sounds/genericHolstering.ogg", "gallery/items/empty.png", 
"Your hands, supposedly. Calloused and dirty but adapted to the rough lifestyle of the Zone.", "gunWpn")
const gunInstance1 = new ClassWeapons("Empty", "pistol1Icon", "1gun", "gun0ID", 0, 0, 0, [0, 0], "sounds/genericHolstering.ogg", "gallery/items/rustyboi.png", 
"Barely functional PPM pistol. Can put lead in malcontents that would dare attack you, should it not jam.", "gunWpn")


let gunInstArray = [];
gunInstArray.push(gunInstance0, gunInstance1) //⚙️and so forth

//Tooltip creator
function tooltipCreate(itemBase, newItem) {
    //let tooltipButton = document.getElementById(itemBase["itemIndex"]);
    let newTooltipBox = document.createElement("div"); 
    
    let newTooltip = document.createElement("span");
    newTooltip.className = "tooltiptext";  
    
    newTooltip.innerHTML = `${itemBase["itemName"]}<br><br>`;

    if (itemBase["itemClass"].includes("Wpn")){
        newTooltip.innerHTML += `Damage: ${itemBase["damageMin"]} ~ ${itemBase["damageMax"]}<br>Precision: ${itemBase["hitRate"]}%`
        if (itemBase["itemIndex"].includes("melee")){ //tooltip for MELEE
            newTooltip.innerHTML += `<br>Critical: ${itemBase["special"][0]}%  Bleed: ${itemBase["special"][1]}%  Stun: ${itemBase["special"][2]}%`
        } else if (itemBase["itemIndex"].includes("gun")){ //tooltip for SHOOTY
            newTooltip.innerHTML += `<br>Critical: ${itemBase["special"][0]}%  Ammo used per attack: ${itemBase["special"][1]} rounds`
        } 
    }

    if (itemBase["descriptionDeux"]){
        newTooltip.innerHTML += `${itemBase["descriptionDeux"]}`
    }
    newTooltip.innerHTML += `<br><br>${itemBase["description"]}`;

    newTooltipBox.id = itemBase["itemFullID"];
    
    newTooltipBox.appendChild(newTooltip);
    newItem.className += " tooltip"; 
    newItem.appendChild(newTooltip);
    }






/* console.log("exporting radionItems.js")
//============EXPORTER============//
export { itemObject, meleeObject, tooltipCreate, ClassWeapons, meleeInstArray, gunInstArray, consumInstArray, questInstArray}; */