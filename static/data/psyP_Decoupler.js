



//location creator//
function update(location) {
    console.log("Updating location:", location);
    cinematics.style.display = "inline-block";
    button1.innerText = location["button texts"][0];
    button2.innerText = location["button texts"][1];
    button3.innerText = location["button texts"][2];
    button4.innerText = location["button texts"][3];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    button4.onclick = location["button functions"][3];
    textUpdate(location.text);
    closePDAuf();
    
    if (location.imageUrl) {
        updateImage(location.imageUrl);
    }
    if (location.soundUrl) {
        playSound(location.soundUrl);dwe
    }
}

function locArrival(location) {
    mapEnterButton.innerText = "Enter"
    mapEnterButton.onclick = update(location.nameLoc);
    //button2.onclick = textUpdate(`Faction: ${location.locFaction}`, false);
}

function areaArrival(blockObjL) { //not yet online. set it up below in the movement phase.
    if (currPCArea != blockObjL.nameLoc){
        screenMain.style.backgroundImage=(`url(${blockObjL.locBG})`);
        text.innerHTML = `Now entering: ${blockObjL.cellProperty}`
        currPCArea = blockObjL.nameLoc;
    }
}

//image display function
function updateImage(imageUrl) {
    console.log("Updating image:", imageUrl);
    cinematics.style.backgroundImage = `url(${imageUrl})`
    cinematics.style.display = "block"
}

function updateBackground(imageUrl) {
    console.log("Updating background:", imageUrl);
    screenMain.style.backgroundImage = `url(${imageUrl})`
}








//Blankplate functions

function nothingHappens() {
    return new Promise((resolveNA, reject) => {    
        console.log("player tried to click N/A");
        resolveNA();
    });
}


//DRAFT
mapSetupArray = Array.from({length:147}, ()=> Array.from({length:40}).fill(""))
//this might take too long.

/* function checkLocationMap(mapsArrayL){
    mapsArrayL.forEach((obj)=>{
        if (coordYX[0]==obj.yPos&&coordYX[1]==obj.xPos){
            triggerMap(obj.nameLoc)
        }
    })
} //⚠️ */

function chkCurntCell(y, x, type){
    const nxtCellBaseL = mapBases.find(cell=>cell.yPos === y && cell.xPos === x) 
    const nxtCellBlockL = mapBlock.find(cell=>cell.yPos === y && cell.xPos === x)
    console.log(`!!nxtCellBlock exists?: ${nxtCellBlockL}`)
    console.log(`!!moving to cell: Y${y} and X${x}`)   
    if (nxtCellBlockL!=undefined){
        if (nxtCellBlockL.nameLoc === "block"){
            console.log("collision detected")
            textUpdate("You cannot move further that way.", false)
            return false
        } else if(nxtCellBaseL.locIndex){
            locArrival(nxtCellBaseL)
        }
    }   
}


function autoMapBlock(cellProperty, yStart, yEnd, x1s, x1e, x2s, x2e, x3s, x3e){
for (let i=yStart; i<=yEnd; i++){
    for (let j=x1s; j<=x1e; j++){
        //const blockObjL = new MapLocations(cellProperty, i, j)
        createMapBlocks(cellProperty, i, j)    
    } 
    if (x2s){
        for (let j=x2s; j<=x2e; j++){
            //const blockObjL = new MapLocations(cellProperty, i, j)
            createMapBlocks(cellProperty, i, j)

        }
    }
    if (x3s){
        for (let j=x3s; j<=x3e; j++){
            //const blockObjL = new MapLocations(cellProperty, i, j)
            createMapBlocks(cellProperty, i, j)
            }
        }
    }
}


class MapLocations{
    constructor(nameLoc, yPos, xPos, locIndex, locFaction, locRep, locImg, locBg, locInfo){
        this.nameLoc = nameLoc;
        this.yPos = yPos;
        this.xPos = xPos;
        this.locIndex = locIndex
        this.locFaction = locFaction
        this.locRep = locRep
        this.locImg = locImg
        this.locBg = locBg
        this.locInfo = locInfo
    }
}


function createMapBlocks(cellProperty, y, x, locIndex, locFaction, locRep, locImg, locBg, locInfo){
    const blockObjL = new MapLocations(cellProperty, y, x, locIndex, locFaction, locRep, locImg, locBg, locInfo)
    if (cellProperty.slice(0,2)=="MA"){
        //TBA⚠️ Area
    }else{
        const blockImgL = document.createElement("div")
        switch (cellProperty.slice(0,2)){
            case "bl":
                blockImgL.className="mapBlock";
                mapBlock.push(blockObjL)
                break;
            case "MB":
                blockImgL.className="mapBase"; //temp
                mapBases.push(blockObjL);
                break;
            case "MQ":
                blockImgL.className="mapQuest";
                mapQuests.push(blockObjL);
                break;
            case "MH":
                blockImgL.className="mapHunt";
                mapHunt.push(blockObjL);
                break;
            case "MK":
                blockImgL.className="mapAssassin";
                mapAssassin.push(blockObjL);
                break;
            case "MM":
                blockImgL.className="mapMove";
                mapMove.push(blockObjL);
                break;
            case "MD":
                blockImgL.className="mapDungeon";
                mapDungeon.push(blockObjL);
                break;
            case "ra":
                blockImgL.className="mapRadiation";
                mapRadiation.push(blockObjL);
                break;
        }
        blockImgL.style.top=`${(y)*25}px`
        blockImgL.style.left=`${(x)*25}px`
        blockImgL.setAttribute("name", `Y=${y}, X=${x}`)
        mapVis.appendChild(blockImgL)
    }
}



document.addEventListener('keydown', function(evt) {
    if (evt.keyCode >= 37 && event.keyCode <= 40) {
        evt.preventDefault();
    }
});

function naviContKey(evt){
    switch(evt.key){
        case "ArrowUp": 
            navigationControl("up")
            break;
        case "ArrowDown":
            navigationControl("down")
            break;
        case "ArrowRight":
            navigationControl("right")
            break;
        case "ArrowLeft":
            navigationControl("left")
            break;
    }
    //navigationControl(evt.key.slice(6).toLowerCase()) 
}  
document.addEventListener("keydown", naviContKey)

document.addEventListener("keyup", (evt)=> {
    mapJoystickBase.style.setProperty('--topJoy', '35%');
    mapJoystickBase.style.setProperty('--leftJoy', '35%');
})

upBtn.addEventListener("mousedown", ()=> navigationControl("up"))
downBtn.addEventListener("mousedown", ()=> navigationControl("down"))
rightBtn.addEventListener("mousedown", ()=> navigationControl("right"))
leftBtn.addEventListener("mousedown", ()=> navigationControl("left"))

upBtn.addEventListener("mouseup", ()=> mapJoystickBase.style.setProperty('--topJoy', '35%'))
downBtn.addEventListener("mouseup", ()=> mapJoystickBase.style.setProperty('--topJoy', '35%'))
rightBtn.addEventListener("mouseup", ()=> mapJoystickBase.style.setProperty('--leftJoy', '35%'))
leftBtn.addEventListener("mouseup", ()=> mapJoystickBase.style.setProperty('--leftJoy', '35%'))

function navigationControl(direction){
    switch(direction){
        case "up":
            if (chkCurntCell(coordY-1, coordX) !== false){
                coordY--//reversed.
                mapJoystickBase.style.setProperty('--topJoy', '30%');
            }         
            break;
        case "down":
            if (chkCurntCell(coordY+1, coordX) !== false){
                coordY++//reversed.
                mapJoystickBase.style.setProperty('--topJoy', '40%');
            }   
            break;
        case "right":
            if (chkCurntCell(coordY, coordX+1) !== false){
                coordX++
                mapJoystickBase.style.setProperty('--leftJoy', '30%');
            }  
            break;
        case "left":
            if (chkCurntCell(coordY, coordX-1) !== false){
                coordX--
                mapJoystickBase.style.setProperty('--leftJoy', '40%');
            }  
            break;
        }
        PCpawn.style.top=`${coordY*25-10}px`
        PCpawn.style.left=`${coordX*25}px`
        mapImgGrid.scrollTop = coordY*25-120
        console.log(`coordX and coordY = ${coordX}, ${coordY}`)
    }



    
    autoMapBlock("block", 0, 145, 1, 1, 40, 40)
    autoMapBlock("block", 0, 4, 2, 39)
    autoMapBlock("block", 5, 17, 2, 13, 29, 39)
    autoMapBlock("block", 18, 20, 2, 13, 16, 18, 29, 39)
    autoMapBlock("block", 21, 23, 2, 13, 16, 39)
    autoMapBlock("block", 24, 35, 2, 5, 19, 19, 35, 39)
    autoMapBlock("block", 36, 38, 2, 5, 19, 26, 28, 39)
    autoMapBlock("block", 39, 40, 2, 26, 28, 39)
    autoMapBlock("block", 41, 47, 2, 23, 30, 39)
    autoMapBlock("block", 48, 48, 30, 39)
    autoMapBlock("block", 50, 50, 28, 31)
    autoMapBlock("block", 51, 53, 8, 13, 28, 31)
    autoMapBlock("block", 54, 56, 2, 13, 28, 39)
    autoMapBlock("block", 57, 58, 2, 9, 28, 39)
    autoMapBlock("block", 59, 62, 2, 9, 11, 16, 19, 24) 
    autoMapBlock("block", 59, 62, 28, 39)
    autoMapBlock("block", 63, 66, 2, 9, 11, 24, 28, 39)
    autoMapBlock("block", 67, 68, 2, 9, 11, 21, 31, 39)
    autoMapBlock("block", 69, 74, 4, 7, 11, 21, 31, 39)
    autoMapBlock("block", 75, 77, 11, 21, 31, 39)
    autoMapBlock("block", 78, 80, 9, 25, 28, 39)
    autoMapBlock("block", 81, 84, 17, 21, 31, 39)
    autoMapBlock("block", 85, 87, 17, 25, 31, 39)
    autoMapBlock("block", 88, 88, 17, 29, 31, 39)
    autoMapBlock("block", 89, 89, 2, 8, 17, 25, 31, 39) 
    autoMapBlock("block", 90, 90, 31, 39)
    autoMapBlock("block", 91, 96, 25, 39)
    autoMapBlock("block", 97, 102, 2, 5, 22, 39)
    autoMapBlock("block", 103, 106, 2, 5, 22, 39)
    autoMapBlock("block", 107, 109, 2, 5, 16, 19, 22, 39)
    autoMapBlock("block", 110, 111, 9, 19)
    autoMapBlock("block", 110, 112, 2, 5, 26, 29)
    autoMapBlock("block", 112, 112, 9, 15)
    autoMapBlock("block", 110, 112, 35, 39)
    autoMapBlock("block", 113, 114, 2, 5, 9, 15, 35, 39)
    autoMapBlock("block", 115, 115, 2, 5, 9, 15, 24, 29)
    autoMapBlock("block", 115, 115, 35, 39)
    autoMapBlock("block", 116, 116, 2, 5, 24, 29, 35, 39)
    autoMapBlock("block", 117, 120, 2, 5, 24, 29, 33, 39)
    autoMapBlock("block", 121, 124, 2, 7, 9, 18, 20, 30)
    autoMapBlock("block", 121, 124, 33, 39)
    autoMapBlock("block", 125, 127, 2, 7, 9, 18, 20, 30)
    autoMapBlock("block", 128, 130, 20, 30)
    autoMapBlock("block", 133, 135, 20, 28)
    autoMapBlock("block", 136, 139, 20, 39)
    autoMapBlock("block", 140, 145, 2, 39)

    autoMapBlock("radiation", 24, 35, 20, 34)
    autoMapBlock("radiation", 33, 38, 13, 18)
    autoMapBlock("radiation", 15, 17, 14, 17)
    autoMapBlock("radiation", 28, 30, 14, 15)
    autoMapBlock("radiation", 5, 6, 25, 27)
    autoMapBlock("radiation", 24, 25, 11, 18)
    autoMapBlock("radiation", 48, 58, 14, 27)
    autoMapBlock("radiation", 41, 47, 24, 29)
    autoMapBlock("radiation", 48, 50, 2, 4)
    autoMapBlock("radiation", 69, 73, 8, 10)
    autoMapBlock("radiation", 81, 89, 9, 16)
    autoMapBlock("radiation", 81, 84, 22, 30)
    autoMapBlock("radiation", 85, 87, 26, 30)
    autoMapBlock("radiation", 68, 69, 24, 27)
    autoMapBlock("radiation", 78, 78, 2, 5)
    autoMapBlock("radiation", 79, 80, 5, 5)
    autoMapBlock("radiation", 80, 80, 6, 7)
    autoMapBlock("radiation", 81, 83, 7, 7)
    autoMapBlock("radiation", 83, 83, 8, 8)
    autoMapBlock("radiation", 128, 139, 2, 3)
    autoMapBlock("radiation", 116, 117, 8, 8)
    autoMapBlock("radiation", 127, 129, 31, 37)


        
    createMapBlocks("MBcordon", 133, 16, 3, "Neutral", 0,  "The rookie village is the southernmost neutral outpost within the Zone, home to veterans and Zone newcomers alike. It is starting point of nearly all self-proclaimed stalker's adventure of a life-time, or more likely, their first step towards a gruesome fate.");
    createMapBlocks("MBcamp", 115, 18, 4, "Mercenary", 0, "The garbage hangar is home to a group of hardened mercs. Neither Duty members nor local stalkers questionned their presence so far as, compared to other groups part of the notorious mercenaries, Sergeant Kovachev and his goons proved to be less violent and open to trade.");
    createMapBlocks("MBboneyard", 137, 4, "Bandit", 0, "Once an advanced base belonging to a group of scientists, this hidden camp deep in the southern swamps of Chernobyl became the lair of renegades, calling themselves swamp pirates. They seem to be in control of most of this inhospitable region.");
    createMapBlocks("MBagropromBase", 119, 8, "Military", 400, `The de-facto local military headquarter. The agroprom soldiers rarely allow stalkers to apporach their perimeter without using them as target practice. They are known to conduct raids in the surrounding areas, shooting "intruders" on sight.`)
    createMapBlocks("MBoso", 127, 39, "Sin", 250, "You find yourself inside the tunnel service station leading to and from the Darkscape. Outside of a few still active emergency lights, there seems to be nothing but penumbra ahead. You feel like your entire body is shaking, almost physically demanding you to leave the premise.");
    createMapBlocks("MBdarkValleyBase", 112, 32, "Bandit", 300, "The valley is, and always has been a haven for bandits. As it stands, they are also in control of the only known entrance to lab X-18. Pilon is the current head of this disorganized band of criminals.");
    createMapBlocks("MByantarBunker", 108, 8, "Ecologists", 0, "The legendary lake in the sector of the same name dried up a long ago, leaving a shallow swamp in its place. The place is morbid and sodden with death.");
    createMapBlocks("MBwarehouses", 95, 22, "Freedom", 0, "A strategically important area, the vicinity of the army base used to contain a small rural village and passageway to the radar facility north of it. The anarchists from the Freedom faction have settled down in the army base.");
    createMapBlocks("MBbar", 102, 19, "Duty", 0, "The Duty faction have set up camp on the plain's edge and they always welcome stalkers in need of rest. A desert oasis of sorts - a place completely devoid of anomalies and mutants. Be sure to check out the 100 Rads bar in the vaults - it's a meeting point for stalkers from all over the Zone. The bar is run by the local trader, so if you're interested in selling or buying wares apart from the local gossip - that's the place to go to.");
    createMapBlocks("MBATP", 94, 16, "Bandit", 350, "Deeper inside the wild territory, bandits have established a stranglehold in the badlands, operating from the local vehicle station dubbed ATP. Expect tolls and racketing should you decide to proceed to Pripyat through these plains.");
    createMapBlocks("MBsportsCenter", 95, 6, "Mercenary", 750, "Deep inside the rotting husk of the dead city, mercenaries have set up fortifications in the local sports center. The makeshift base boasts an excellent vantage point over the nearby plaza and large defendable spaces.");
    createMapBlocks("MBwatchTower", 83, 12, "Neutral", 0, `Once the home of a local legend called the "Forester", the local firewatch now serves as a place of rest for the few experienced stalkers travelling through the deadly Red Forest. It is also the last "civilized" outpost before the urban battlefield that is Limansk, and further up, Chernobyl proper.`);
    createMapBlocks("MBbrainScorcher", 83, 23, "Monolith", 2500, "An underground facility referred to as X-10 in various documents. It served as the control center of the deadly Brain Scorcher, a device once dreaded by all older generation Stalkers. Access to Chernobyl was completely unthinkable back then as the Brain Scorcher would constantly emit psy tendrils, instantly frying one's brain and turning the unfortunate victim into a zombie. However, a Zone Legend known as Strelok would manage to shut the device down.");
    createMapBlocks("MBconstructionSite", 77, 6, "Monolith", 2500, "The old construction site sitting atop the hills of Limansk. A sniper's dream. Passage towards CNPP through Limansk is generally discouraged due to the area being highly radioactive and swarming with Monolithians.");
    createMapBlocks("MBculturePalace", 71, 25, "Monolith", 2500, "The Palace of culture is a landmark of Pripyat. Repurposed since a long time ago into a place of worship for members of the Monolith. Even the most well-armed and experienced of stalkers give it a wide berth.");
    createMapBlocks("MBconverterCamp", 61, 17, "Military", 350, "Staging ground for the Ukrainian military during one of their first raids upon CNPP. It now serves as camp for the local government to keep a close eye on (further) irregular activites coming from the plant.");
    createMapBlocks("MBlabX6", 49, 3, "Sin", 900, `A previously undiscovered lab in proximity to Chernobyl. Lab X-6 is theorized to be the main facility testing on human subjects for psychic development during the post-Soviet collapse. Its ex-"residents" have now taken over the premises as their main base of operations. The powerful psy waves emitting from the lab indicates research is still being actively conducted.`);
    createMapBlocks("MBwarlab", 52, 34, "USIG", 1000, "You come across the military laboratory, often referred to as Varlab by stalkers. the United Scientists International Group (USIG) now jealously guard the facility. You would expect Western eggheads to be more welcoming to trade or communication, but they seem to adopted the worse habits of inhabitants in the Zone, that is shooting everything that moves on sight."); // not added
    createMapBlocks("MBblackWater", 43, 26, "Mercenary", 1200, "Mercenary forces have set up an unlikely camp in the middle of the dry river. Do not expect them to be friendly.");
    createMapBlocks("MBlaundromat", 33, 28, "Duty", 500, "The old laundromat served as refuge to members of a military reconnaissance team. After finding out how defensible the position is, Duty frontliners led by Zulu settled in the area, serving as bulwark against Monolithians.");
    createMapBlocks("MByanov", 28, 11, "Neutral", 0, "Yanov serves as pit stop and neutral ground for potential diplomacy between the two of the major factions in the Zone: Duty and Freedom. The atmosphere always seem tense if you are on either side, but is an otherwise welcome refuge for neutral Stalkers passing through Jupiter.");
    createMapBlocks("MByanov", 29, 9, "Ecologists", 500, "The egghead bunker in Jupiter is home to a plethora of rare artifacts including the Heart of the Oasis. The local scientists are more focused on artifact research compared to their colleagues in Yantar, which has jurisdiction over psy energy research and the Noosphere itself");
    createMapBlocks("MBriverPort", 25, 33, "Monolith", 2500, "The port overviewing the Pripyat river is under Monolith control. Many stalkers attempted to find shortcuts to the heart of the Zone through waterways only to be shot down by hostile patrols alongside the river");
    createMapBlocks("MBrecycleStation", 17, 25, "Bandit", 550, `The layout of the recycling station is not too unlike a medieval fort, with walls and even a "moat" to protect from intruders. The bandit leader Sultan settled in following their ban from the Skadovsk, and turned it into a hub for arms trade and robbery.`);
    createMapBlocks("MBrangerStation", 11, 27, "Freedom", 350, "After the Skadovsk started sinking down the swamp, the majority of the stalkers in the area relocated to the ranger station up the hills. Their proximity with the bandits of the recycling station made the situation all too tense, and turned the bridge linking the two sides into a no-man's land.");
    //let mapBases = [mbCordon, mbCamp, mbAgropromMil, mbOso, mbDvBandit, mbYantarEco, mbMilWare, mbBar, mbDCityMerc, mbWatchTower, mbX10, mbConstruction, mbPalace, mbConverter, mbX6, mbVarlab, mbBlackWater, mbLaundromat, mbYanov, mbJupiterEco, mbRiverPort, mbRecycling, mbRanger]
    
    createMapBlocks("MDdarkBunker", 131, 34, "Mutants", 0, "You find a cave leading to a bunker door. There are signs of human activity with campfire ashes and empty cans around.")
    createMapBlocks("MDcrypt", 117, 10, "Mutants", 0, "You head towards the sewer grate leading to the Agroprom underground complex, always known as the crypt. Bloodsuckers are known to periodically make nests here, making it a terrible spot for shelter.")
    createMapBlocks("MDlabX18", 114, 33, "Mutants", 0, "X-18 is a laboratory that was used to study the effects of psychic radiation (based on the informational field, noosphere) on living cells using Kaymanov emitters. It was set up in the wake of the 1986 disaster, underneath an old factory. Mutations of living beings following exposure to these emissions is meticulously noted. Now said beings roam the everdark hallways of this multi-levelled horror museum.")
    createMapBlocks("MDlabX16", 105, 8, "Mutants", 0, "X-16 focused on researching one of the side discoveries of The Group's research: that living creatures are able to generate directed psy-emissions. A biological field emitter, essentially a giant brain, was grown as part of the research, using equipment from Lab X-18.")
    createMapBlocks("MDlabX10", 82, 23, "Monolith", 0, "An underground facility referred to as X-10 in various documents. It served as the control center of the deadly Brain Scorcher, a device once dreaded by all older generation Stalkers. Access to Chernobyl was completely unthinkable back then as the Brain Scorcher would constantly emit psy tendrils, instantly frying one's brain and turning the unfortunate victim into a zombie. However, a Zone Legend known as Strelok would manage to shut the device down.");
    createMapBlocks("MDsarcophagus", 54, 20, "Monolith", 0, "The Sarcophagus is the name given to a massive steel and concrete structure covering the nuclear reactor #4 building of the Chernobyl Nuclear Power Plant. It was designed to limit radioactive contamination of the environment following the 1986 Chernobyl disaster, by encasing the most dangerous area and protecting it from climate exposure. The sarcophagus locked in 200 tons of radioactive corium, 30 tons of highly contaminated dust and 16 tons of uranium and plutonium. Most stalkers believed the initial reactor melt-down is what led to the formation of the Zone, and the mythic Wish-granter.");
    createMapBlocks("MDKrug", 11, 15, "Mutants", 0, "An old antenna station comprised of a radar array with a circular layout, located in western Zaton. In the middle of the circular array is a small square-shaped building with a lower floor and a broken elevator leading to the basement area. Once the nest to a host of bloodsucking mutants, only a few of them remain, claiming the local swamps as their hunting grounds.");
    createMapBlocks("MDlabyrinth", 71, 26, "Mutants", 0, "The vast underground network of Pripyat is a dark, gas-filled labyrinth with very little of interest to the average stalker. There has been rumors that another lab was built deep within its bowels, with experimentation on humans for the purpose of producing super-soldiers.");
    createMapBlocks("MDlabX8", 29, 27, "Mutants", 0, "Lab X8 is identified as the central laboratory, the headquarters of the Group's experiments before the emergence of the Common Consciousness. Located underneath what was formerly the Yubileiny Service Center in Pripyat, the lab has become a stronghold for Monolith forces on the surface, along with Zombified Stalkers lingering throughout the lower floors of the building.");




//functions for --


//functions for --


//functions for --


//functions for --
