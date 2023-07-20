const WebSocket = require('ws');
const pveHandler = require('./handlers/pveHandler');
const pvpHandler = require('./handlers/pvpHandler');
 
function onError(ws, err) {
    console.error(`onError: ${err.message}`);
}
 
function onMessage(ws, data) {

    const parsedData = JSON.parse(data);

    console.log("PARSED-DATA: ", parsedData);

    if(parsedData.eventType === "pve"){
        console.log("ASDASDADASDASDASDASDASD");
        pveHandler(ws, parsedData);
    } 

    if(parsedData.eventType === "pvp"){
        pvpHandler(ws, parsedData);
    } 
    
    ws.send(`recebido!`);
}
 
function onConnection(ws, req) {
    ws.on('message', data => onMessage(ws, data));
    ws.on('error', error => onError(ws, error));
    console.log(`onConnection`);
}

function corsValidation(origin) {
    return process.env.CORS_ORIGIN === '*' || process.env.CORS_ORIGIN.startsWith(origin);
}

function verifyClient(info, callback) {
    if(!corsValidation(info.origin)) return callback(false);
    
    const token = info.req.url.split('token=')[1];
    
    if(token) {
        if(token === '123456') {
            return callback(true);
        }
    }
    return callback(false);
}

function broadcast(jsonObject) {
    if(!this.clients) return;
    this.clients.forEach(client => {
        if(client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(jsonObject));
        }
    });
}
 
module.exports = (server) => {
    const wss = new WebSocket.Server({
        server,
        verifyClient
    });
 
    wss.on('connection', onConnection);
    wss.broadcast = broadcast;
 
    console.log(`App Web Socket Server is running!`);
    return wss;
}