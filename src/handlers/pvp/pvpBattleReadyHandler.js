const pvpBattleReadyHandler = async (ws, battleData, battleState) => {
    const battle = battleState.find((state) => state.battleId == battleData.battleId);

    console.log('ACTIVE PVP BATTLE-1: ', battleData);
    console.log('ACTIVE PVP BATTLE-2: ', battleState);

    // battleState[stateIndex].battleResults = {
    //     status: "escaped",
    //     message: "Você escapou!"
    // };

    const response = {
        battleLog: "null?",
        dataType: "battle-start-config",
        battleData: battle,
    }

    // battleState.splice(stateIndex, 1);

    // FAZER AGORA O HANDLER PARA AS AÇÕES DA BATALHA
    // FRONT JÁ ESTA REDIRECIONANDO PARA A PAGINA DE BATALHA PVP E PUXANDO ESSES DADOS INICIAIS DAQUI

    ws.send(JSON.stringify(response));
}

module.exports = pvpBattleReadyHandler;