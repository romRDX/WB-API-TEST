const pvpBattleReadyHandler = async (ws, battleData, battleState) => {
    const battle = battleState.find((state) => state.battleId == battleData.battleId);

    // console.log('READY-2: ', battle);

    // const newPlayer = {
    //     client: ws,
    //     playerId: battleData.playerId,
    //     characterId: battleData.characterId,
    //     battleId: battle.battleId
    // }

    // pvpActiveBattle.push(newPlayer);

    // console.log('ACTIVE-BATTLE: ', pvpActiveBattle);
    const thisBattle = pvpActiveBattle.find((battle) => battle.battleId === battleData.battleId);

    const thisPlayer = thisBattle.players.find((player) => player.playerId === battleData.playerId)

    pvpActiveBattle2.add({
        client: ws,
        playerId: battleData.playerId,
        characterId: battleData.characterId,
        battleId: battle.battleId
    });

    thisPlayer.client = JSON.stringify(ws);
    // console.log('THIS-PLAYER: ', thisPlayer);

    const response = {
        teste: "RDX",
        battleLog: "null?",
        dataType: "battle-start-config",
        battleData: battle,
    }

    ws.send(JSON.stringify(response));
}

module.exports = pvpBattleReadyHandler;