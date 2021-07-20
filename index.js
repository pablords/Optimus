const express = require('express')
const server = express()
const port = 3000


server.use(express.json());
const routes = require('./src/routes/routes')
server.use('/', routes);

const { step } = require('./src/Models/stages')
const { db } = require("./src/Models/banco")


const venom = require('venom-bot')
function main() {
    venom
        .create('atendimento',
            (base64Qrimg, asciiQR, attempts, urlCode) => {
                console.log('Number of attempts to read the qrcode: ', attempts);
                console.log('Terminal qrcode: ', asciiQR);
                console.log('base64 image string qrcode: ', base64Qrimg);
                console.log('urlCode (data-ref): ', urlCode);
            },
            (statusSession, session) => {
                console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser
                if (statusSession == "qrReadFail" || "chatsAvailable") {
                    main()
                    
                }
                console.log('Session name: ', session);
            },
            {
                disableSpins: true,
                disableWelcome: true

            }).then((client) => start(client))
        .catch((erro) => {
            console.log(erro);
        });
}

main()

function start(client) {
    client.onIncomingCall((call) => {
        client.sendText(call.peerJid, `Ops! Sou um robô e ainda não consigo interpretar áudios`);
    });

    client.onMessage((message) => {
        let resp = step[getStage(message.from)].obj.execute(
            message.from,
            message.body,
            message.sender.pushname,
            client,
            message
        );

        for (let index = 0; index < resp.length; index++) {
            const element = resp[index];
            client.startTyping(message.from);
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
            cpf: [],
            cidade: [],
            time: []
        };
        return db[user].stage;
    }
}

server.listen(port, () => {
    console.log(`API ONLINE http://localhost:${port}`)
})
