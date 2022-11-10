const calculateAction = (action, user, target) => {

    
    let results = {
        targetHP: null,
        targetEffects: [],
    }

    if(action.type.includes("DAMAGE")){
        const userBaseDamage = (user.attributes.STR*0.38)+40;
        const targeDefMultiplier = (100-((target.attributes.TOU*0.062)+5))/100;

        // console.log("1: ", targeDefMultiplier);
        // console.log("2: ", userBaseDamage*targeDefMultiplier);
        // console.log("3: ", target.HP);
        // console.log("4: ", target.HP - userBaseDamage*targeDefMultiplier);

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