const monstersActions = [
    {
        id: 1,
        actions: (turn) => {
            
            if(turn == 1 || turn == 2 || turn == 5 || turn > 6){
                
                return {
                    id: 1,
                    energy: 0,
                    value: 1.4,
                    type: ["DAMAGE"],
                    cooldown: 0,
                    effect: null,
                    name: "Grandes garras",
                };
            }

            if(turn == 3 || turn == 6){
                
                return {
                    id: 2,
                    energy: 0,
                    value: 1.2,
                    type: ["DAMAGE", "DEBUFF"],
                    cooldown: 0,
                    effect: { type: "DMG", value: 20, turns: 3 },
                    name: "Garras empoderadoras",
                };
            }

            if(turn == 4){
                
                return  {
                    id: 3,
                    energy: 0,
                    value: 100,
                    type: ["HEAL"],
                    cooldown: 0,
                    effect: null,
                    name: "Vigor ursino",
                };
            }
        },
    }
]



const x = [
    {
        id: 1,
        energy: 0,
        value: 50,
        type: ["damage"],
        cooldown: 0,
        effect: null,
    },
    {
        id: 2,
        energy: 0,
        value: 30,
        type: ["damage"],
        cooldown: 0,
        effect: { type: "DMG", value: 20, turns: 3 }
    },
    {
        id: 3,
        energy: 0,
        value: 100,
        type: ["heal"],
        cooldown: 0,
        effect: null,
    },
    // BOSS SKILLS
    {
        id: 4,
        energy: 100,
        value: 0,
        type: ["damage"],
        cooldown: 0,
        effect: null,
    },
    {
        id: 5,
        energy: 0,
        value: 200,
        type: ["heal"],
        cooldown: 0,
        effect: null
    },
]

module.exports = monstersActions;