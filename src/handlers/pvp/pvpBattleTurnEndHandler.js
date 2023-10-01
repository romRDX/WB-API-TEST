const monstersActions = require("../../actions/monstersActions");
const calculateAction = require("../../utils/calculateAction");

const pvpBattleTurnEndHandler = async (ws, battleData, battleState) => {
    
    console.log("ASD-999: ", battleData);
    

    const stateIndex = battleState.findIndex((state) => state.battleId == battleData.battleId);

    const currentBattleState = battleState[stateIndex];

    console.log("ASD-111: ", currentBattleState.players[0]);

    // tirar a parter do monsters

    // const enemyAction = monstersActions.find((ma) => ma.id == battleState[stateIndex].monsterData.id);
    // const monsterAction = currentMonsterAction.actions(battleState[stateIndex].currentTurn);

    // const monsterDamageResults = calculateAction(
    //     monsterAction,
    //     battleState[stateIndex].monsterData,
    //     battleState[stateIndex].monsterInitialData,
    //     battleState[stateIndex].characterData,
    //     battleState[stateIndex].characterInitialData,
    // );

    // battleState[stateIndex].characterData.HP = monsterDamageResults.targetHP;

    // const monsterlogData = {
    //     turn: battleState[stateIndex].turnsData.currentTurn,
    //     actionOwnership: battleState[stateIndex].monsterData.id,
    //     log: monsterDamageResults.log,
    // }

    // battleState[stateIndex].battleLogs.push(monsterlogData);

    // battleState[stateIndex].currentTurn = battleData.turn+1;

    // if(battleState[stateIndex].characterData.HP <= 0){
    //     battleState[stateIndex].battleResults = {
    //         status: "lose",
    //         message: "Você perdeu!",
    //     };
    // }

    // if(battleState[stateIndex].monsterData.HP <= 0){
    //     battleState[stateIndex].battleResults = {
    //         status: "win",
    //         message: "Você venceu!",
    //     };
    // }


    // RDX RDX


    // battleState[stateIndex].characterData.energy = battleState[stateIndex].characterInitialData.energy;

    // battleState[stateIndex].turnsData.turnsActions.push({
    //     turn: battleState[stateIndex].turnsData.currentTurn,
    //     monsterId: battleState[stateIndex].monsterData.id,
    //     monsterActionId: currentMonsterAction.id,
    // });

    currentBattleState.turnsData.currentTurn += 1;
    currentBattleState.currentTurn += 1;
    currentBattleState.currentCharacterToAct = battleData.enemyCharacterId;
    currentBattleState.players.forEach((player) => {
        if(player.characterData.id !== battleData.characterId){
            player.characterData.energy = player.characterInitialData.energy;
        }
    })

    const logData = {
        turn: currentBattleState.currentTurn,
        turnChange: true,
        actionOwnership: null,
    }

    currentBattleState.battleLogs.push(logData);
    
    const response = {
        battleData: battleState[stateIndex],
    }

    console.log('------------ 123');
    console.log('------------ XXX: ', pvpActiveBattle2);


// funciona, mas deve enviar para TODAS as batalhas ativas
    pvpActiveBattle2.forEach((activeBattle) => {
        // if(activeBattle.battleId === battleData.battleId){
            // activeBattle.players.forEach((player) => {
            //     player.client.send(JSON.stringify(response));
            // });

            
        // }

        activeBattle.client.send(JSON.stringify(response)); // xx
    });

    

    // ws.send(JSON.stringify(response));
}

module.exports = pvpBattleTurnEndHandler;