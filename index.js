const express = require('express')
const server = express()
const port = 3000


const venom = require('venom-bot');


server.use(express.json());


const routes = require('./src/routes/routes');

server.use('/', routes);

/*(async () => {


    venom
        .create()
        .then((client) => start(client))
        .catch((erro) => {
            console.log(erro);
        });

    function start(client) {
        client.onMessage((message) => {
            if (message.body) {
                client
                    .sendText(message.from, `Ola ${message.sender.pushname}, 
                    Sou o atendente de suporte virtual da Vivo e vou lhe apresentar algumas opçöes para que eu possa lhe ajudar`
                    )
                    .then((result) => {
                        console.log('Result: ', result); //return object success

                    })
                    .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                    });
              

            }
        });
    }

})();*/

server.listen(port, () => {
    console.log(`API ONLINE http://localhost:${port}`)
})
