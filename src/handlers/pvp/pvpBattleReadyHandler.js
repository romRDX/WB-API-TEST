const pvpBattleReadyHandler = async (ws, battleData, battleState) => {
    const battle = battleState.find((state) => state.battleId == battleData.battleId);

    console.log('ACTIVE PVP BATTLE-1: ', battleData);
    console.log('ACTIVE PVP BATTLE-2: ', battleState);

    const response = {
        battleLog: "null?",
        dataType: "battle-start-config",
        battleData: battle,
    }

    ws.send(JSON.stringify(response));
}

module.exports = pvpBattleReadyHandler;