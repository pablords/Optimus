const express = require('express')
const server = express()
const port = 3001


server.use(express.json());
const routes = require('./src/routes/routes');
server.use('/', routes);

const { step } = require('./src/Models/stages')
const { db } = require("./src/Models/banco");


const venom = require('venom-bot')
venom
    .create('atendimento')
    .then((client) => start(client))
    .catch((erro) => {
        console.log(erro);
    });


function start(client) {
    client.onMessage((message) => {
        //console.log(message)
        let resp = step[getStage(message.from)].obj.execute(
            message.from,
            message.body,
            message.sender.pushname
        );
        for (let index = 0; index < resp.length; index++) {
            const element = resp[index];
            //console.log(element)
            client.sendText(message.from, element);
        }
    });
}

function getStage(user) {
    if (db[user]) {
        return db[user].stage;
    } else {
        db[user] = {
            stage: 0,
            menu: [],
            subMenu: [],
            cpf: []
        };
        return db[user].stage;
    }
}

server.listen(port, () => {
    console.log(`API ONLINE http://localhost:${port}`)
})
