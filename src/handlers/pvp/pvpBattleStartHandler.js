const getTotalAttributes = require("../../utils/getTotalAttributes");
const apiWB = require("../../wbApi/axios");

// CRIAÇÃO DE BATALHA PRONTA
const pveBattleStartHandler = async (ws, battleData, battleState) => {

    const getCharactersData = async () => {
        try {
            const resp = await apiWB.get('/characters', {
                params: {
                    userId: battleData.playerId
                }
            });

            return resp;
        } catch (err){
            console.log("ERROR: ", err);
        }
    };

    const playerCharactersData = await getCharactersData();
    const selectedCharacter = playerCharactersData.data.userCharacters.find((char) => char.id == battleData.characterId);
    const playerCharacter = selectedCharacter;
    const totalPlayerAttributes = getTotalAttributes(selectedCharacter);

    const getMonstersData = async () => {
        try {
            const resp = await apiWB.get('/monsters', {
                params: {
                    monsterId: battleData.monsterId
                }
            });

            return resp;
        } catch (err){
            console.log("ERROR: ", err);
        }
    };

    const monsterData = await getMonstersData();

    const monster = monsterData.data.monsters.find((mons) => mons.id == battleData.monsterId);
    
    const characterState = {
        ...playerCharacter,
        HP: Math.round((totalPlayerAttributes.total.CON*2.5)+900),
        energy: Math.round((totalPlayerAttributes.total.INT*0.262)+(totalPlayerAttributes.total.CON*0.13)+20),
        buffs: [],
        debuffs: [],
    }

    const monsterState = {
        ...monster,
        HP:  Math.round((monster.attributes.CON*2.5)+900),
        buffs: [],
        debuffs: [],
        energy: Math.round((monster.attributes.INT*0.262)+(monster.attributes.CON*0.13)+20),
    }

    // const idsArray = 
    // const firstPlayer = items[Math.floor(Math.random()*items.length)];

    const battleStateNewItem = {
        battleId: battleData.battleId,
        playerId: battleData.playerId,
        characterId: battleData.characterId,
        monsterId: battleData.monsterId,
        characterData: { ...characterState },
        characterInitialData: { ...characterState },
        monsterData: { ...monsterState },
        monsterInitialData: { ...monsterState },
        currentTurn: 1,
        turnsData: {
            currentTurn: 1,
            turnsActions: []
        },
        battleResults: null,
        battleLogs: [
            {
                turn: 1,
                turnChange: true,
                actionOwnership: null,
            }
        ],
    }

    battleState.push(battleStateNewItem);

    const response = {
        battleLog: "null?",
        battleData: battleState[battleState.length-1],
        apiMessage: "BATTLE STARTED"
    }

    ws.send(JSON.stringify(response));
}

module.exports = pveBattleStartHandler;