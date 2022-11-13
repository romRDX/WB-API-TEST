const getTotalAttributes = require("./getTotalAttributes");

const calculateAction = (action, user, target) => {

    let results = {
        targetHP: target.HP,
        targetEffects: [],
    }

    let calculatedUser = getTotalAttributes(user);
    let calculatedTarget = getTotalAttributes(target);

    console.log("ASD1: ", calculatedUser);
    console.log("ASD2: ", calculatedTarget);
    console.log("ASD3: ", action);

    if(action.type.includes("DAMAGE")){
        const userBaseDamage = (user.attributes.STR*0.38)+40;
        const targeDefMultiplier = (100-((target.attributes.TOU*0.062)+5))/100;

        console.log("2: ", target.HP);
        
        results.targetHP = target.HP - userBaseDamage*targeDefMultiplier
    }
    
    if(action.type.includes("HEAL")){
        
    }

    if(action.type.includes("BUFF")){
        
    }

    if(action.type.includes("DEBUFF")){
        
    }

    return results;
};

module.exports = calculateAction;