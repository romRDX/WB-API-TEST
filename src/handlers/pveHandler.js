const attackAction = require("../actions/attackActions");
const apiWB = require("../wbApi/axios");

const pveHandler = (ws, battleData, battleState) => {

    const stateIndex = battleState.findIndex((state) => state.battleId == battleData.battleId);

    if(stateIndex !== -1){
        // console.log("ACHEI: ", battleState[stateIndex]);
    } else {
        // console.log("ASD: ", battleData);

        let playerCharacter;

        apiWB.get('/characters', {
            params: {
                userId: battleData.playerId
            }
        }).then((resp) => {
            playerCharacter = resp.data.userCharacters.find((char) => char.id == battleData.characterId)
            // console.log("YOUR CHAR: ", playerCharacter);
        });

        const characterState = {
            ...playerCharacter,
            HP: "",
            buffs: [],
            debuffs: [],
        }

        battleState.push(
            {
                battleId: battleData.battleId,
                playerId: battleData.playerId,
                characterId: battleData.characterId,
                monsterId: battleData.monsterId,
                characterData: characterState,
                characterInitialData: characterState,
                monsterData: "",
                monsterInitialData: "",
                turnsData: [[battleData.playerId, battleData.skillId]],
            },
        )
        console.log("CRIA NOVO");
    }

    // console.log("BATTLE STATE: ", battleState);



    // actionType: "pve-battle-action", skillId, battleId, playerId: authData.id, characterId: selectedCharacter.id

    // apiWB.get('/skills', {
    //     params: { skillId: 1 }
    // }).then((resp) => {
    //     console.log(resp.data);
    //     // ws.send(JSON.stringify(resp.data));
    // }); 
    
}

module.exports = pveHandler;