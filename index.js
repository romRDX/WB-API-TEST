// const app = require('./src/app');
// const appWs = require('./src/app-ws');

// const port = process.env.PORT || 3001;
 
// const server = app.listen(port, () => {
//     console.log(`App Express is running!`);
// })

// const wss = appWs(server);

const express = require('express');
const PORT = process.env.PORT || 3005;
const INDEX = '/index.html';

const pveBattleActionHandler = require('./src/handlers/pve/pveBattleActionHandler');
const pveBattleStartHandler = require('./src/handlers/pve/pveBattleStartHandler');
const pveBattleEscapeHandler = require('./src/handlers/pve/pveBattleEscapeHandler');
const pveBattleTurnEndHandler = require('./src/handlers/pve/pveBattleTurnEndHandler');

const pvpMatchMakingQueueHandler = require('./src/handlers/pvp/pvpMatchMakingQueueHandler');
const pvpBattleReadyHandler = require('./src/handlers/pvp/pvpBattleReadyHandler');
const pvpBattleActionHandler = require('./src/handlers/pvp/pvpBattleActionHandler');

// BATTLE CONTINUOUS DATA

global.pvpMatchMakingQueue = [];
global.pvpActiveBattle = [];
global.pvpActiveBattle2 = new Set();

// var pvpMatchMakingQueue = [];

// const pvpActiveBattlePlayers = [];

// const pvpActiveBattle = [];

const pveActiveBattle = [];


// -----------------

function onMessage(ws, data) {
  const parsedData = JSON.parse(data);

  const handlers = {
    ["pve-battle-escape"]: () => pveBattleEscapeHandler(ws, parsedData, pveActiveBattle),
    ["pve-battle-start"]: () => pveBattleStartHandler(ws, parsedData, pveActiveBattle),
    ["pve-battle-action"]: () => pveBattleActionHandler(ws, parsedData, pveActiveBattle),
    ["pve-battle-end-turn"]: () => pveBattleTurnEndHandler(ws, parsedData, pveActiveBattle),

    ["pvp-match-making-queue"]: () => pvpMatchMakingQueueHandler(ws, parsedData),
    ["pvp-battle-ready"]: () => pvpBattleReadyHandler(ws, parsedData, pvpActiveBattle),
    ["pvp-battle-action"]: () => pvpBattleActionHandler(ws, parsedData, pvpActiveBattle),
  }

  // console.log("CLIENTS: ", wss.clients);
  // const response = {
  //   teste: "RDX"
  // }

  // funciona para fazer broadcast
  // wss.clients.forEach((client) => ( client.send(JSON.stringify(response))) );

  handlers[parsedData.actionType]();

  // if(parsedData.actionType === "pve-battle-escape"){
  //   pveBattleEscapeHandler(ws, parsedData, pveActiveBattle);
  // } else if(parsedData.actionType === "pve-battle-escape"){
  //   pveBattleEscapeHandler(ws, parsedData, pveActiveBattle);
  // } else if(parsedData.actionType === "pve-battle-start"){
  //   pveBattleStartHandler(ws, parsedData, pveActiveBattle);
  // } else if(parsedData.actionType === "pve-battle-action"){
  //   pveBattleActionHandler(ws, parsedData, pveActiveBattle);
  // } else {
  //   ws.send(JSON.stringify({ data: "erro" }));
  // }

  // if(parsedData.eventType === "pvp"){
  //     pvpHandler(ws, parsedData);
  // }
  
}

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));


const { Server } = require('ws');

const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('message', data => onMessage(ws, data));
  ws.on('close', () => {
      ws.send('closed');
      console.log('Client disconnected')
  });
});