//experience lvl up test framework
let maxXp = xpLvlPanel[1][expReq];
let currentLevel = xpLvlPanel[1][level];
let currentRank = xpLvlPanel[1][rank];






//INITIALIZE   let playerLvl = 1;
xpLvlPanel = [
{
    level: 0,
    rank: Nothing,
    expReq: 0,
},
{
    level: 1,
    rank: Rookie,
    expReq: 100,
},
{
    level: 2,
    rank: Rookie,
    expReq: 210,
},
{
    level: 3,
    rank: Rookie,
    expReq: 450,
},
{
    level: 4,
    rank: Rookie,
    expReq: 600,
},
{
    level: 5,
    rank: Experienced,
    expReq: 1000,
},
{
    level: 6,
    rank: Experienced,
    expReq: 1500,
},
{
    level: 7,
    rank: Experienced,
    expReq: 2200,
},
{
    level: 8,
    rank: Experienced,
    expReq: 3050,
},
{
    level: 9,
    rank: Experienced,
    expReq: 4050,
},
{
    level: 10,
    rank: Veteran,
    expReq: 5500,
},
]
//Rookie, Experienced, Veteran, Specialist, Expert, Master, Grandmaster, Legend, Myth of the Zone
//maxXpText.innerHTML = 210

//might need to move this to JS or move all the xp related things here.
function levelUpCheck(){
    if (xp >= maxXp) {
        currentLevel ++;
        maxXp = xpLvlPanel[currentLevel][expReq];
        currentRank = xpLvlPanel[currentLevel][rank];
    }
}

perksT1 = [
    {
        name: "DEUS EX MACHINA",
        perkIcon: "gallery/skills/dominus.png",
        description: "DEUS EX MACHINA <br>DEUS EX MACHINA <br>DEUS EX MACHINA <br>DEUS EX MACHINA <br>DEUS EX MACHINA <br>DEUS EX MACHINA <br>",
        chance: "0.001",
        acquired: "no",
    },
    {
        name: "healthy",
        perkIcon: "gallery/skills/stamina.png",
        description: "You are as healthy as a buck! You gain 20 bonus maximum HP.",
        chance: "1",
        acquired: "no",
    },
    {
        name: "pugilist",
        perkIcon: "gallery/skills/knifeSkill.png",
        description: "You've gotten pretty good with a knife. Your chance to hit in melee combat is increased by a flat 7% regardless of weapon.",
        chance: "0.5",
        acquired: "no",
    },
    {
        name: "iron hook",
        perkIcon: "gallery/skills/boxer.png",
        description: "Following in the footsteps of Iron Mike and Klitschko brothers, you're starting to develop a good liver shot! Chance to stun increased by a flat 5% regardless of weapon.",
        chance: "0.6",
        acquired: "no",
    },
    {
        name: "tracker",
        perkIcon: "gallery/skills/tracker.png",
        description: "You're becoming familiar with the Zone. Chances of finding good events increased by 7% globally.",
        chance: "0.6",
        acquired: "no",
    },
    {
        name: "radion affinity",
        perkIcon: "gallery/skills/radionBonus.png",
        description: "You've gained better connection with the Noosphere and can channel your newfound psi powers further. +10 maximum radion.",
        chance: "1",
        acquired: "no",
    },
    {
        name: "artefact seeker",
        perkIcon: "gallery/skills/artefact.png",
        description: "Like all self-respecting stalkers, you seek treasure. and treasure you shall find! chance of artefact discovery via detectors increased by 4.5%.",
        chance: "1",
        acquired: "no",
    },
    {
        name: "charged-up",
        perkIcon: "gallery/skills/upCharge.png",
        description: "All this jogging around increased your lung capacity. +20 combat stamina.",
        chance: "0.7",
        acquired: "no",
    },
    {
        name: "psi-shield",
        perkIcon: "gallery/skills/grid.png",
        description: "You've developed a neat, but incredibly powerful talent. You can generate a psi-shield similar to those of Sin faction members and Burer mutants! You gain a psi shield worth 10 points, recharging after every combat encounter.",
        chance: "0.3",
        acquired: "no",
    },
    {
        name: "dogfighter",
        perkIcon: "gallery/skills/soldier.png",
        description: "You have experienced battlefields not too different from actual wars outside the Zone. You gain a 15% bonus to experience acquisition through battle.",
        chance: "0.8",
        acquired: "no",
    },
    {
        name: "chemically adept",
        perkIcon: "gallery/skills/chemres.png",
        description: "You've used plenty of chems and medical supplements to protect yourself from the many dangers of the Zone. Eventually you've become better at using them whilst becoming more resistant to their side-effects. +1 chem usable per battle before toxicity.",
        chance: "1",
        acquired: "no",
    },
    







]