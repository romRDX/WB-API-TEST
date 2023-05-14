const getTotalAttributes = require("./getTotalAttributes");

const calculateAction = (action, currentUser, initialUser, currentTarget, initialTarget) => {
    
    let results = {
        noEnergy: false,
        log: "",
    }

    const effects = {
        DAMAGE: () => {
            const userBaseDamage = (currentUser.attributes.STR*0.38)+40;
            const targetDefMultiplier = (100-((currentTarget.attributes.TOU*0.062)+5))/100;
            console.log("DMG: ", action);
            const finalDamage = (userBaseDamage*action.value)*targetDefMultiplier;
            results.log = `${currentUser.name} causou ${Math.round(finalDamage)} de dano usando ${action.name} em ${currentTarget.name}`;
            
            currentTarget.HP = currentTarget.HP - finalDamage
        },
        HEAL: () => {
            const finalHealValue = currentUser.attributes.CON*action.value;
            console.log("HEAL: ", action);
            results.log = `${currentUser.name} curou a si mesmo em ${finalHealValue} usando ${action.name}`;

            if(currentUser.HP + finalHealValue > initialUser.HP){
                currentUser.HP = initialUser.HP;
            } else {
                currentUser.HP = currentUser.HP + finalHealValue;
            }
        },
        DEBUFF: () => {
            console.log("DBUFF: ", action);
        },
        BUFF: () => {
            console.log("BUFF: ", action);
        },
    }

    // MECANICA ENERGIA
    if(currentUser.energy > action.energy){

        currentUser.energy -= action.energy;

        action.type.forEach((type) => {
            effects[type]();
        })

        // if(action.type.includes("DAMAGE")){
        //     const userBaseDamage = (currentUser.attributes.STR*0.38)+40;
        //     const targetDefMultiplier = (100-((currentTarget.attributes.TOU*0.062)+5))/100;
        //     console.log("ASD: ", action);
        //     const finalDamage = (userBaseDamage*action.value)*targetDefMultiplier;
        //     results.log = `${currentUser.name} causou ${Math.round(finalDamage)} de dano usando ${action.name} em ${currentTarget.name}`;
            
        //     currentTarget.HP = currentTarget.HP - finalDamage
        // }
        
        // if(action.type.includes("HEAL")){
        //     const finalHealValue = currentUser.attributes.CON*action.value;
            
        //     results.log = `${currentUser.name} curou a si mesmo em ${finalHealValue} usando ${action.name}`;

        //     if(currentUser.HP + finalHealValue > initialUser.HP){
        //         currentUser.HP = initialUser.HP;
        //     } else {
        //         currentUser.HP = currentUser.HP + finalHealValue;
        //     }
        // }

        // if(action.type.includes("BUFF")){
            
        // }

        // if(action.type.includes("DEBUFF")){
            
        // }

    // MECANICA ENERGIA
    } else {
        results.noEnergy = true;
    }

    return results;
};

module.exports = calculateAction;