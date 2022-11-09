const attackAction = require("../actions/monstersActions");
const getTotalAtributes = require("../func/getTotalAtributes");
const apiWB = require("../wbApi/axios");

const pveHandler = async (ws, battleData, battleState) => {

    const stateIndex = battleState.findIndex((state) => state.battleId == battleData.battleId);

    if(stateIndex !== -1){
        // console.log("ACHEI: ", battleState[stateIndex]);

        console.log("ACHEI: ", battleData.turn);

        if(battleData.turn){
            
        }
        
    } else {
        console.log("NÃO ACHEI");

        let playerCharacter;
        let monster;
        let totalPlayerAtributes;
        let totalMonsterAtributes;

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
        playerCharacter = selectedCharacter;
        totalPlayerAtributes = getTotalAtributes(selectedCharacter);

        console.log('RESP-DATA1: ', playerCharacter);
        console.log('RESP-DATA2: ', totalPlayerAtributes);

        // apiWB.get('/characters', {
        //     params: {
        //         userId: battleData.playerId
        //     }
        // }).then((resp) => {
            // const playerCharacterData = resp.data.userCharacters.find((char) => char.id == battleData.characterId)
            // playerCharacter = playerCharacterData;
            // totalPlayerAtributes = getTotalAtributes(playerCharacterData);
            // console.log("YOUR CHAR: ", resp.data.userCharacters);
        // });

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

        monster = monsterData.data.monsters.find((mons) => mons.id == battleData.monsterId);
        
        const characterState = {
            ...playerCharacter,
            HP: Math.round((totalPlayerAtributes.total.CON*2.5)+900),
            buffs: [],
            debuffs: [],
        }

        const monsterState = {
            ...monster,
            HP:  Math.round((monster.attributes.CON*2.5)+900),
            buffs: [],
            debuffs: [],
        }

        console.log('MS: ', monster);

        battleState.push(
            {
                battleId: battleData.battleId,
                playerId: battleData.playerId,
                characterId: battleData.characterId,
                monsterId: battleData.monsterId,
                characterData: characterState,
                characterInitialData: characterState,
                monsterData: monsterState,
                monsterInitialData: monsterState,
                turnsData: [[battleData.playerId, battleData.skillId]],
            },
        )
        // console.log("CRIA NOVO");
    }

    // console.log("BATTLE STATE: ", battleState);



    // actionType: "pve-battle-action", skillId, battleId, playerId: authData.id, characterId: selectedCharacter.id

    // apiWB.get('/skills', {
    //     params: { skillId: 1 }
    // }).then((resp) => {
    //     console.log(resp.data);
    //     // ws.send(JSON.stringify(resp.data));
    // }); 
    
}

module.exports = pveHandler;