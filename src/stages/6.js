const { menu0 } = require('../Menu/menu0')
const { cidades } = require('../Menu/cidades')
const { db } = require("../Models/banco")
const Api = require('../../services/api')





function execute(user, msg, nome, client, message) {

    if (message.type == "ptt") {
        return [
            "```Digite uma das opcoes ou * para retornar ao menu inicial```",
            `Olá ${nome}, Sou um robõ e ainda não consigo interpretar mensagem de audio,\n`,
        ]
    }

    let menu = " MENU PRINCIPAL\n\n";
    Object.keys(menu0).forEach((value) => {
        let element = menu0[value];
        menu += `${value} - ${element.name}   ${element.description} \n`;
    });

    if (msg === "*") {
        db[user] = {
            stage: 1,
            menu: [],
            subMenu: [],
            cpf: [],
            cidade: []
        };
        return [
            menu
        ];
    }



    if (cidades[msg]) {
        const data = {
            name: nome,
            mobilePhone: user,
            cpf: db[user].cpf[0].document,
            cidade: cidades[msg].name,
            type: db[user].subMenu[0].title,
            subType: db[user].subMenu[0].name,
            description: db[user].subMenu[0].description
        }
        //db[user].stage = 7;
        client.sendText(user, `Aguarde ${nome}, já estou solicitando um atendimento Técnico para voce...`)
            .then((res) => {
                sendClient(data, cidades[msg])
            })



        async function sendClient(data, cidade) {
            await Api.post('/whats-app/getContact', data)
                .then((res) => {
                    if (res.status == 200) {
                        db[user] = {
                            stage: 0,
                            menu: [],
                            subMenu: [],
                            cpf: [],
                            cidade: []
                        };

                        let data = new Date(res.data.created_at);
                        var day = data.getDate();
                        var month = data.getMonth() + 1;
                        var year = data.getFullYear();
                        var hora = data.getHours();          // 0-23
                        var min = data.getMinutes();
                        var seg = data.getSeconds(); 
                        let dataFormatada = `${day}/${month}/${year} ${hora}:${min}${seg}`;

                        const mensagem = [
                            `Pronto ${nome}, sua solicitacao foi executada.`,
                            `Em até 24h o técnico irá até sua residencia.`,
                            `ID: ${res.data.id}`,
                            `DATA SOLICITACAO: ${dataFormatada}`,
                            `CIDADE: ${cidade.name}`
                        ];

                        finalizado(user, mensagem, cidade)

                    }
                }).catch((err) => {
                    db[user] = {
                        stage: 0,
                        menu: [],
                        subMenu: [],
                        cpf: [],
                        cidade: []
                    };
                    console.log(err)
                    const erro = [
                        `Olá ${cidade.supervisor}, o cliente ${nome} - ${user.substring(2, 12)} da cidade ${cidade.name}entrou em contato mas nao foi possivel abrir um atendimento`
                    ]
                    client.sendText(cidade.contato, erro[0])
                    client.sendText(user, "Enviamos sua solicitacao para o supervisor responsavel e logo entraremos em contato.")
                })

        }


    }

    function finalizado(contato, mensagem, cidade) {
        for (let index = 0; index < mensagem.length; index++) {
            const element = mensagem[index];
            console.log(element)
            client.sendText(contato, element)
            .then((res) => {
                //console.log(res.to._serialized)
                client.forwardMessages(
                    cidade.contato,
                    [res.to._serialized]
                )
            })
            .catch((err) => {
                console.log(err)
            })
        }
    

    }



}

exports.execute = execute;