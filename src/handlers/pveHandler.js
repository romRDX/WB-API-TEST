const attackAction = require("../actions/attackActions")

const pveHandler = (ws, data) => {

    const attackerCharacter = {
        id: 123,
        DMG: 50,

    };

    const receiverCharacter = {
        id: 321,
        DEF: 30,
    };

    const skill = {
        baseDamage: 15,
        cost: 5,
    };

    let x;

    if(data.action == "attack"){
        const attackResult = attackAction(attackerCharacter, receiverCharacter, skill);
        x = { respType: "attack result", type: data.type, finalDamage: attackResult };
        console.log("PVE: ", attackResult)
    }
    
    ws.send(JSON.stringify(x));
}

module.exports = pveHandler;