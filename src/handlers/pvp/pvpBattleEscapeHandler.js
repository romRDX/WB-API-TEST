const pveBattleEscapeHandler = async (ws, battleData, battleState) => {
    const stateIndex = battleState.findIndex((state) => state.battleId == battleData.battleId);

    battleState[stateIndex].battleResults = {
        status: "escaped",
        message: "Você escapou!"
    };

    const response = {
        battleLog: "null?",
        battleData: battleState[stateIndex],
    }

    battleState.splice(stateIndex, 1);

    ws.send(JSON.stringify(response));
}

module.exports = pveBattleEscapeHandler;