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
                    const resp = await apiWB.get('/characters', {
                        params: {
                            userId,
                        }
                    });
        
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

            const battleStateNewItem = {
                battleId: uuidv4(),
                player1Id: battleData.playerId,
                player1CharacterId: battleData.characterId,
                player1CharacterData: { ...characterState },
                player1CharacterInitialData: { ...characterState },
                player2Id: enemyPlayer.playerId,
                player2CharacterId: enemyPlayer.characterId,
                player2CharacterData: { ...enemyCharacterState },
                player2CharacterInitialData: { ...enemyCharacterState },
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

            console.log("ASD1: ", battleStateNewItem.battleId);
            // console.log("ASD2: ", enemyPlayer); 

            pvpActiveBattle.push(battleStateNewItem);

            const response = {
                apiMessage: "MATCH SUCCEEDED",
                battleData: { battleId: battleStateNewItem.battleId }
            }

            // apenas cria o registro da batalha
            apiWB.post("/pvp-battle-start", {
                    params: JSON.stringify({ battleData: battleStateNewItem })
                }
            ).then((resp) => {
                console.log("XX: ", resp.data);
                if(resp.data.success){
                    enemyPlayer.client.send(JSON.stringify(response));
                    ws.send(JSON.stringify(response));
                }
            })
        
            // enemyPlayer.client.send(JSON.stringify(response));
            // ws.send(JSON.stringify(response));
            
        } else {
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
    
    // console.log("PVP BATTLE STATE 1: ", pvpMatchMakingQueue);
    // console.log("-------------------------------------------");

    // const response = {
    //     battleLog: "null?",
    //     apiMessage: "BATTLE STARTED"
    // }

    // ws.send(JSON.stringify(response));

    return;
}

module.exports = pvpMatchMakingQueueHandler;