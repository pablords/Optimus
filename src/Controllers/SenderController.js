const venom = require('venom-bot');




class SenderController {
    async send(request, response) {

        venom
            .create()
            .then((client) => start(client))
            .catch((erro) => {
                console.log(erro);
            });

        await new Promise((resolve) => setTimeout(resolve, 5000));

        async function start(client) {

            await client
                .sendText(`55${request.params.phone}@c.us`,
                    `Olá cliente, tudo bem?
                 responda SIM 
                 para receber um manual que contem informaçöes importantes de funcionamento do seu roteador
                 caso nåo queira receber, responda NAO`
                )
                .then((result) => {
                  console.log(result)
                    client.onMessage(async (message) => {
                        switch (message.body) {
                            case "SIM":
                                await client
                                    .sendFile(
                                        message.from,
                                        'src/assets/Manual-completo-Repetidor-Smart-Wi-Fi.pdf',
                                        'Manual-Repetidor-Smart-Wi-Fi.pdf',
                                        'Segue o manual do nosso repetidor wifi'
                                    )
                                break;
                            case "NAO":
                                await client
                                    .sendText(
                                        message.from,
                                        `Ok ${message.sender.pushname}, estarei aqui a disposiçao quando precisar, até mais!`
                                    )
                                break;
                            default:
                                await client
                                    .sendText(
                                        message.from,
                                        `Opçäo invalida`
                                    )
                                break;


                        }

                    })
                    .then((result) => {
                        console.log(result)

                    })
                    .catch((erro) => {
                        console.error(erro)
                    });

                })
                .catch((erro) => {
                    console.error(erro)
                });



        }
    }
}

module.exports = new SenderController