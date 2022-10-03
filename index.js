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

function onMessage(ws, data) {

    const parsedData = JSON.parse(data);

    // if(parsedData.eventType === "pve"){
    //     pveHandler(ws, parsedData);
    // } 

    // if(parsedData.eventType === "pvp"){
    //     pvpHandler(ws, parsedData);
    // } 
    console.log("XX: ", parsedData);
    ws.send(`recebido!`);
}

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));


  const { Server } = require('ws');

  const wss = new Server({ server });

  wss.on('connection', (ws) => {
    console.log('Client connected');
    ws.on('message', data => onMessage(ws, data));
    ws.on('close', () => console.log('Client disconnected'));
  });