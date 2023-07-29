const calculateAction = require("../../utils/calculateAction");

const pveBattleActionHandler = async (ws, battleData, battleState) => {
    const stateIndex = battleState.findIndex((state) => state.battleId == battleData.battleId);

    const playerDamageResults = calculateAction(
        battleState[stateIndex].characterData.skills.find((skill) => skill.id == battleData.skillId),
        battleState[stateIndex].characterData,
        battleState[stateIndex].characterInitialData,
        battleState[stateIndex].monsterData,
        battleState[stateIndex].monsterInitialData,
    );
    
    // FRONT JÁ MOSTRA TODAS AS INFORMAÇÕES EM TELA
    // AGORA FALTA FAZER A ACTION FUNCIONAR SENDO QUE TEMOS
    // { players: [ {}, {}] }

    if(playerDamageResults.noEnergy){
        console.log("NO ENERGY!");
    } else {

        battleState[stateIndex].turnsData.turnsActions.push({
            turn: battleState[stateIndex].turnsData.currentTurn,
            playerId: battleData.playerId,
            characterId: battleState[stateIndex].characterData.id,
            actionId: battleData.skillId,
        });

        const logData = {
            turn: battleState[stateIndex].turnsData.currentTurn,
            actionOwnership: battleState[stateIndex].characterData.id,
            log: playerDamageResults.log,
        }

        battleState[stateIndex].battleLogs.push(logData);

        if(battleState[stateIndex].characterData.HP <= 0){
            battleState[stateIndex].battleResults = {
                status: "lose",
                message: "Você perdeu!",
            };
        }

        if(battleState[stateIndex].monsterData.HP <= 0){
            battleState[stateIndex].battleResults = {
                status: "win",
                message: "Você venceu!",
            };
        }
    }

    const response = {
        // battleLog: "null?",
        battleData: battleState[stateIndex],
    }

    if(battleState[stateIndex].battleResults !== null){
        battleState.splice(stateIndex, 1);
    }

    ws.send(JSON.stringify(response));
}

module.exports = pveBattleActionHandler;