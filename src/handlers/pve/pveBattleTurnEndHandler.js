const monstersActions = require("../../actions/monstersActions");
const calculateAction = require("../../utils/calculateAction");

const pveHandler = async (ws, battleData, battleState) => {
    const stateIndex = battleState.findIndex((state) => state.battleId == battleData.battleId);

    const currentMonsterAction = monstersActions.find((ma) => ma.id == battleState[stateIndex].monsterData.id);
    const monsterAction = currentMonsterAction.actions(battleState[stateIndex].currentTurn);

    const monsterDamageResults = calculateAction(
        monsterAction,
        battleState[stateIndex].monsterData,
        battleState[stateIndex].monsterInitialData,
        battleState[stateIndex].characterData,
        battleState[stateIndex].characterInitialData,
    );

    // battleState[stateIndex].characterData.HP = monsterDamageResults.targetHP;

    const monsterlogData = {
        turn: battleState[stateIndex].turnsData.currentTurn,
        actionOwnership: battleState[stateIndex].monsterData.id,
        log: monsterDamageResults.log,
    }

    battleState[stateIndex].battleLogs.push(monsterlogData);

    battleState[stateIndex].currentTurn = battleData.turn+1;

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

    battleState[stateIndex].characterData.energy = battleState[stateIndex].characterInitialData.energy;

    battleState[stateIndex].turnsData.turnsActions.push({
        turn: battleState[stateIndex].turnsData.currentTurn,
        monsterId: battleState[stateIndex].monsterData.id,
        monsterActionId: currentMonsterAction.id,
    });

    battleState[stateIndex].turnsData.currentTurn += 1;

    const logData = {
        turn: battleState[stateIndex].turnsData.currentTurn,
        turnChange: true,
        actionOwnership: null,
    }

    battleState[stateIndex].battleLogs.push(logData)
    
    const response = {
        battleData: battleState[stateIndex],
    }

    if(battleState[stateIndex].battleResults !== null){
        battleState.splice(stateIndex, 1);
    }

    ws.send(JSON.stringify(response));
}

module.exports = pveHandler;