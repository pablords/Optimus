const express = require('express')
const server = express()
const port = 3001


server.use(express.json());
const routes = require('./src/routes/routes')
server.use('/', routes);

const { step } = require('./src/Models/stages')
const { db } = require("./src/Models/banco")


const venom = require('venom-bot')
venom
    .create(
        //session
        'atendimento', //Pass the name of the client you want to start the bot
        //catchQR
        (base64Qrimg, asciiQR, attempts, urlCode) => {
            console.log('Number of attempts to read the qrcode: ', attempts);
            console.log('Terminal qrcode: ', asciiQR);
            console.log('base64 image string qrcode: ', base64Qrimg);
            console.log('urlCode (data-ref): ', urlCode);
        },
        // statusFind
        (statusSession, session) => {
            console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser
            //Create session wss return "serverClose" case server for close
            console.log('Session name: ', session);
        },
        // options
        {
            folderNameToken: 'tokens', //folder name when saving tokens
            mkdirFolderToken: '', //folder directory tokens, just inside the venom folder, example:  { mkdirFolderToken: '/node_modules', } //will save the tokens folder in the node_modules directory
            headless: true, // Headless chrome
            devtools: false, // Open devtools by default
            useChrome: true, // If false will use Chromium instance
            debug: false, // Opens a debug session
            logQR: true, // Logs QR automatically in terminal
            browserWS: '', // If u want to use browserWSEndpoint
            browserArgs: [''], // Parameters to be added into the chrome browser instance
            puppeteerOptions: {}, // Will be passed to puppeteer.launch
            disableSpins: true, // Will disable Spinnies animation, useful for containers (docker) for a better log
            disableWelcome: true, // Will disable the welcoming message which appears in the beginning
            updatesLog: true, // Logs info updates automatically in terminal
            autoClose: 60000, // Automatically closes the venom-bot only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
            createPathFileToken: false, //creates a folder when inserting an object in the client's browser, to work it is necessary to pass the parameters in the function create browserSessionToken
        }

    ).then((client) => start(client))
    .catch((erro) => {
        console.log(erro);
    });


function start(client) {
    client.onIncomingCall((call) => {
        client.sendText(call.peerJid, `Desculpa! Sou um robõ e ainda não consigo interpretar audios`);
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
