const getTotalAttributes = require("./getTotalAttributes");

const calculateAction = (action, user, target) => {

    let results = {
        targetHP: target.HP,
        userEnergy: user.energy || 500,
        targetEffects: [],
    }

    // MECANICA ENERGIA
    // if(results.userEnergy > action.energy){

        // let calculatedUser = getTotalAttributes(user);
        // let calculatedTarget = getTotalAttributes(target);

        results.userEnergy -= action.energy;

        if(action.type.includes("DAMAGE")){
            const userBaseDamage = (user.attributes.STR*0.38)+40;
            const targeDefMultiplier = (100-((target.attributes.TOU*0.062)+5))/100;
            
            results.targetHP = target.HP - userBaseDamage*targeDefMultiplier
        }
        
        if(action.type.includes("HEAL")){
            
        }

        if(action.type.includes("BUFF")){
            
        }

        if(action.type.includes("DEBUFF")){
            
        }

    // MECANICA ENERGIA
    // } else {
    //     console.log("NO ENERGY");
    // }

    return results;
};

module.exports = calculateAction;