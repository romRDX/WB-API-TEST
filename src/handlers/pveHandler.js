const monstersActions = require("../actions/monstersActions");
const attackAction = require("../actions/monstersActions");
const calculateAction = require("../utils/calculateAction");
const getTotalAttributes = require("../utils/getTotalAttributes");
const apiWB = require("../wbApi/axios");

const pveHandler = async (ws, battleData, battleState) => {

    const stateIndex = battleState.findIndex((state) => state.battleId == battleData.battleId);

    if(stateIndex !== -1){

        const playerDamageResults = calculateAction(
            battleState[stateIndex].characterData.skills.find((skill) => skill.id == battleData.skillId),
            battleState[stateIndex].characterData,
            battleState[stateIndex].monsterData,
        );

        console.log("ENERGY: ", battleState[stateIndex].characterData.energy);

        battleState[stateIndex].monsterData.HP = playerDamageResults.targetHP;
        
        const currentMonsterAction = monstersActions.find((ma) => ma.id == battleState[stateIndex].monsterData.id);
        const monsterAction = currentMonsterAction.actions(battleState[stateIndex].currentTurn);

        const monsterDamageResults = calculateAction(
            monsterAction,
            battleState[stateIndex].monsterData,
            battleState[stateIndex].characterData,
        );

        battleState[stateIndex].characterData.HP = monsterDamageResults.targetHP;

        battleState[stateIndex].currentTurn = battleData.turn+1;

        const response = {
            battleLog: "null?",
            battleData: battleState[stateIndex],
        }

        ws.send(JSON.stringify(response));

    } else {

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
        }

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
            turnsData: [[battleData.playerId, battleData.skillId]],
        }

        battleState.push(battleStateNewItem);

        const playerDamageResults = calculateAction(
            battleState[battleState.length - 1].characterData.skills.find((skill) => skill.id == battleData.skillId),
            battleState[battleState.length - 1].characterData,
            battleState[battleState.length - 1].monsterData,
        );

        console.log("ENERGY: ", playerDamageResults);

        battleState[battleState.length - 1].monsterData.HP = playerDamageResults.targetHP;
        battleState[battleState.length - 1].characterData.energy = playerDamageResults.userEnergy;

        const currentMonsterAction = monstersActions.find((ma) => ma.id == battleState[battleState.length - 1].monsterData.id)
        
        const monsterAction = currentMonsterAction.actions(battleState[battleState.length - 1].currentTurn);

        const monsterDamageResults = calculateAction(
            monsterAction,
            battleState[battleState.length - 1].monsterData,
            battleState[battleState.length - 1].characterData,
        );

        battleState[battleState.length - 1].characterData.HP = monsterDamageResults.targetHP;

        const response = {
            battleLog: "null?",
            battleData: battleState[battleState.length-1],
        }

        ws.send(JSON.stringify(response));
    }
}

module.exports = pveHandler;