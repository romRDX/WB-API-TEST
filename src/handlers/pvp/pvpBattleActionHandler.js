const calculateAction = require("../../utils/calculateAction");

const pveBattleActionHandler = async (ws, battleData, battleState) => {
    const stateIndex = battleState.findIndex((state) => state.battleId == battleData.battleId);

    const actingCharacter =  battleState[stateIndex].players.find((player) => player.playerId === battleData.playerId);

    const enemyCharacter = battleState[stateIndex].players.find((player) => player.playerId !== battleData.playerId);

    // console.log("ASD-1: ", actingCharacter);
    // console.log("ASD-2: ", enemyCharacter);

    const playerDamageResults = calculateAction(
        actingCharacter.characterData.skills.find((skill) => skill.id == battleData.skillId),
        actingCharacter.characterData,
        actingCharacter.characterInitialData,
        enemyCharacter.characterData,
        enemyCharacter.characterInitialData,
    );

    if(playerDamageResults.noEnergy){
        console.log("NO ENERGY!");
    } else {

        battleState[stateIndex].turnsData.turnsActions.push({
            turn: battleState[stateIndex].turnsData.currentTurn,
            playerId: battleData.playerId,
            characterId: actingCharacter.characterData.id,
            actionId: battleData.skillId,
        });

        const logData = {
            turn: battleState[stateIndex].turnsData.currentTurn,
            actionOwnership: actingCharacter.characterData.id,
            log: playerDamageResults.log,
        }

        battleState[stateIndex].battleLogs.push(logData);

        // if(actingCharacter.characterData.HP <= 0){
        //     battleState[stateIndex].battleResults = {
        //         status: "lose",
        //         message: "Você perdeu!",
        //     };
        // }
        
// fazer alterações no ranking?
        if(enemyCharacter.characterData.HP <= 0){
            battleState[stateIndex].battleResults = {
                status: "finished",
                winnerId: battleData.characterId,
                loserId: battleData.enemyCharacterId,
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

    // enemyCharacter.playerClient.send(JSON.stringify(response));

    // ws.send(JSON.stringify(response)); xx

    const battle = pvpActiveBattle.find((activeBattle) => activeBattle.battleId === battleData.battleId);

    let battle2;

    console.log('------------ 456');

    // FUNCIONA PORRA, FUNCIONAAAAAAAAAAAAAA
    pvpActiveBattle2.forEach((activeBattle) => {
        // if(activeBattle.battleId === battleData.battleId){
        //     battle2 = activeBattle;
        // }

        activeBattle.client.send(JSON.stringify(response)); // xx
    });

    // const enemyPlayer = battle2.players.find((player) => player.playerId !== battleData.playerId);

    // console.log("SET-: ", enemyPlayer);
    // const enemyPlayerClient = JSON.parse(enemyPlayer.client);
    // enemyPlayerClient.send(JSON.stringify(response));

    // PARECE QUE O SET NÃO FUNCIONA, TENTA SALVAR APENAS O CLIENT/WS NO SET AO INVÉS DA BATALHA INTEIRA
    // SALVAR O WS DIRETO NO SET FUNCIONA, PORÉM PRECISO ARMAZENAR A IDENTIFICAÇÃO TAMBÉM // xx

    // https://www.sohamkamani.com/reactjs/chat-application/
    // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Set

    // console.log("THIS PLAYER: ", battleData);
    // console.log("ENEMY PLAYER: ", enemyPlayer);
    // console.log("ACTIVE PLAYERS: ", battle.players);
    
    // broadcast(JSON.stringify(response));
}

module.exports = pveBattleActionHandler;