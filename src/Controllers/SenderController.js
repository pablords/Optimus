
const venom = require('venom-bot')
const db = require("../../database/db");



class SenderController {

    async send(request, response) {

        venom
            .create('massivo'

            ).then(async (client) => {

                const res = await db.select()


                //console.log(result)
                for (let index = 0; index < res.length; index++) {
                    const element = res[index];

                    await client
                        .sendText(`${element.contato}@c.us`,
                            `Bom dia, ${element.nome}\n
                    Passamos por uma pequena manutenção de emergência essa madrugada, onde causou uma pequena falha nos serviços de voz, banda larga e tv de alguns clientes.\n
                    Estamos pedindo o prazo de até às 14:00 do dia de hoje para a normalização do mesmo.\n
                    A Vivo agradece e tenha um ótimo dia!`
                        )
                        .then((result) => {
                            ///console.log(result)

                        })
                        .catch((erro) => {
                            //console.error(erro)
                        });

                }
            })
            .catch((erro) => {
                console.log(erro);
            });





    }


}

module.exports = new SenderController