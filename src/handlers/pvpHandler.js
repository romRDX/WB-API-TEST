const pvpHandler = (ws, data) => {

    const fakeAttackAction = {
        type: "pve",
        battleId: 1,
        characterId: 1,
        actionId: 1,
    }

    console.log("PVP VAIx")
    const x = { resp: "vai pvp", type: data.type };
    ws.send(JSON.stringify(x));
}

module.exports = pvpHandler;