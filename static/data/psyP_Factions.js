


class factionsClass{
    constructor(facName, facRep, facRel, facDesc){
        this.facName = facName;
        this.facRep = facRep
        this.facRel = facRel
        this.facDesc = facDesc
    }
}

let facRelGuide ={
    Neutral: 0,
    Bandit: 0,
    Duty: 0,
    Freedom: 0,
    Military: 0,
    Ecologists: 0,
    Mercenary: 0,
    Monolith: 0,
    Sin: 0,
    USIG: 0,
}

let neutralRel = [2500, -1000, 400, 600, -500, 250, -500, -1500, -1500, -1500]
let banditRel = [-500, 2500, -750, 0, -500, 0, -500, -1500, -1500, -1500]
let dutyRel = [400, -750, 2500, -1000, 0, 450, -500, -1500, -1500, -1500]
let freedomRel = [600, 0, -1000, -2500, -750, 450, -500, -1500, -1500, -1500]
let militaryRel = [600, 0, -1000, -2500, -750, 450, -500, -1500, -1500, -1500]
let ecologistRel = [250, 0, 450, 450, 450, 450, 2500, -1500, -1500, 0]
let mercenaryRel = [0, 450, 450, 450, 450, 2500, -1500, -1500, 0]
