const getTotalAttributes = require("../../utils/getTotalAttributes");
const apiWB = require("../../wbApi/axios");
const { v4: uuidv4 } = require('uuid');

const pvpMatchMakingQueueHandler = async (ws, battleData) => {
    
    // console.log("PVP QUEUE: ", ws);

    if(battleData.ready){
        const enemyPlayer = pvpMatchMakingQueue.find((player) => 
            battleData.playerPVPRating*1.2 >= player.playerPVPRating &&
            battleData.playerPVPRating*0.8 <= player.playerPVPRating
        );

        if(enemyPlayer){
            pvpMatchMakingQueue = pvpMatchMakingQueue.filter((item) => item.playerId !== enemyPlayer.playerId);

            const getCharactersData = async (userId) => {
                try {
                    console.log("---------------------------------------------------------AAA: ", );
                    const resp = await apiWB.get('/characters', {
                        params: {
                            userId,
                        }
                    });
                    console.log("---------------------------------------------------------BBB: ", resp);
                    return resp;
                } catch (err){
                    console.log("ERROR: ", err);
                }
            };
            
            const playerCharactersData = await getCharactersData(battleData.playerId);
            const selectedCharacter = playerCharactersData.data.userCharacters.find((char) => char.id == battleData.characterId);
            const playerCharacter = selectedCharacter;
            const totalPlayerAttributes = getTotalAttributes(selectedCharacter);

            const characterState = {
                ...playerCharacter,
                HP: Math.round((totalPlayerAttributes.total.CON*2.5)+900),
                energy: Math.round((totalPlayerAttributes.total.INT*0.262)+(totalPlayerAttributes.total.CON*0.13)+20),
                buffs: [],
                debuffs: [],
            }

            const enemyPlayerCharactersData = await getCharactersData(enemyPlayer.playerId);
            const enemySelectedCharacter = enemyPlayerCharactersData.data.userCharacters.find((char) => char.id == enemyPlayer.characterId);
            const enemyPlayerCharacter = enemySelectedCharacter;
            const enemyTotalPlayerAttributes = getTotalAttributes(enemySelectedCharacter);

            const enemyCharacterState = {
                ...enemyPlayerCharacter,
                HP: Math.round((enemyTotalPlayerAttributes.total.CON*2.5)+900),
                energy: Math.round((enemyTotalPlayerAttributes.total.INT*0.262)+(enemyTotalPlayerAttributes.total.CON*0.13)+20),
                buffs: [],
                debuffs: [],
            }
            
            const playerData = pvpMatchMakingQueue.find((player) => player.playerId === battleData.playerId);

            const charactersIdArray = [battleData.characterId, enemyPlayer.characterId];
            
            const firstCharacterToAct = charactersIdArray[Math.floor(Math.random()*charactersIdArray.length)];

            console.log("FIRST PLAYER: ", firstCharacterToAct);

            const battleStateNewItem = {
                battleId: uuidv4(),
                currentCharacterToAct: firstCharacterToAct,
                // player1Id: battleData.playerId,
                // player1CharacterId: battleData.characterId,
                // player1CharacterData: { ...characterState },
                // player1CharacterInitialData: { ...characterState },
                // player2Id: enemyPlayer.playerId,
                // player2CharacterId: enemyPlayer.characterId,
                // player2CharacterData: { ...enemyCharacterState },
                // player2CharacterInitialData: { ...enemyCharacterState },
                players: [
                    {
                        playerId: battleData.playerId,
                        playerClient: null,
                        characterId: battleData.characterId,
                        characterData:  { ...characterState },
                        characterInitialData: { ...characterState },
                    },
                    {
                        playerId: enemyPlayer.playerId,
                        playerClient: null,
                        characterId: enemyPlayer.characterId,
                        characterData:  { ...enemyCharacterState },
                        characterInitialData:  { ...enemyCharacterState },
                    }
                ],
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

            pvpActiveBattle.push(battleStateNewItem);
            // pvpActiveBattle2.add(battleStateNewItem);

            const response = {
                apiMessage: "MATCH SUCCEEDED",
                battleData: { battleId: battleStateNewItem.battleId }
            }

            // apenas cria o registro da batalha
            apiWB.post("/pvp-battle-start", {
                    params: JSON.stringify({ battleData: battleStateNewItem })
                }
            ).then((resp) => {
                if(resp.data.success){
                    enemyPlayer.client.send(JSON.stringify(response));
                    ws.send(JSON.stringify(response));
                }
            })
            
        } else {
            // console.log("WS-ID: ", ws)
            const newPlayer = {
                client: ws,
                playerId: battleData.playerId,
                characterId: battleData.characterId,
                playerPVPRating: battleData.playerPVPRating,
            }
    
            pvpMatchMakingQueue.push(newPlayer);

            const response = {
                apiMessage: "ADDED TO QUEUE"
            }
    
            ws.send(JSON.stringify(response));
        }
        
    } else {
        pvpMatchMakingQueue = pvpMatchMakingQueue.filter((item) => item.playerId !== battleData.playerId);

        const response = {
            apiMessage: "REMOVED FROM QUEUE"
        }

        ws.send(JSON.stringify(response));
    }

    return;
}

module.exports = pvpMatchMakingQueueHandler;