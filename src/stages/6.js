const { menu0 } = require('../Menu/menu0')
const { cidades } = require('../Menu/cidades')
const { db } = require("../Models/banco")
const Api = require('../../services/api')





function execute(user, msg, nome, client, message) {

    const agora = new Date();
    var timeDiff = Math.abs(agora.getTime() - db[user].time[0].agora);
    //var diffminutes = Math.ceil(timeDiff / (1000 * 3600 * 24 * 60));

    if (timeDiff >= 300000) {
        db[user] = {
            stage: 0,
            menu: [],
            subMenu: [],
            cpf: [],
            cidade: [],
            time: []
        };
        return [
            `${nome} o seu atendimento foi finalizado pois não houve ação sua no periodo de 5 minutos\n
            Caso queira abrir um novo atendimento, digite [#]`
        ]
    }


    switch (message.type) {
        case "ptt":
            return [
                "Por gentileza selecione uma das opções",
                `${nome}, Sou um robõ e ainda não consigo interpretar audios..`,
            ]
            break;
        case "video":
            return [
                "Por gentileza selecione uma das opções",
                `${nome}, Sou um robõ e ainda não consigo interpretar videos..`,
            ]
            break;
        case "image":
            return [
                "Por gentileza selecione uma das opções",
                `${nome}, Sou um robõ e ainda não consigo interpretar imagens..`,
            ]
            break;

    }

    let menu = " MENU PRINCIPAL\n\n";
    Object.keys(menu0).forEach((value) => {
        let element = menu0[value];
        menu += `[${value}] - ${element.name}   ${element.description} \n`;
    });

    if (msg === "*") {
        db[user] = {
            stage: 1,
            menu: [],
            subMenu: [],
            cpf: [],
            cidade: [],
            time: [{ agora: db[user].time[0].agora, inicio: db[user].time[0].inicio }]
        };
        return [
            menu
        ];
    }



    if (cidades[msg]) {
        client.startTyping(user);
        const dados = {
            name: nome,
            mobilePhone: user,
            cpf: db[user].cpf[0].document,
            cidade: cidades[msg].name,
            type: db[user].subMenu[0].title,
            subType: db[user].subMenu[0].name,
            description: db[user].subMenu[0].description
        }
        client.stopTyping(user);
        client.sendText(user, `Aguarde ${nome}, já estou solicitando um atendimento Técnico para você...`)
            .then((res) => {
                sendClient(dados, cidades[msg], user)
            })




        async function sendClient(dados, cidade, user) {
            await Api.post('/whats-app/store', dados)
                .then((res) => {
                    if (res.status == 200) {
                        db[user] = {
                            stage: 0,
                            menu: [],
                            subMenu: [],
                            cpf: [],
                            cidade: [],
                            time: []
                        };

                        const date = new Date(res.data.created_at);
                        var day = date.getDate();
                        var month = date.getMonth() + 1;
                        var year = date.getFullYear();
                        var hora = date.getHours();          // 0-23
                        var min = date.getMinutes();
                        let dataFormatada = `${day}/${month}/${year} ${hora}:${min}`;



                        const mensagem = [
                            `Pronto ${nome}, sua solicitacão foi executada.
                             Em até 24h o técnico irá até sua residência.\n
                             ID: ${res.data.id}\n
                             DATA SOLICITACAO: ${dataFormatada}\n
                             CIDADE: ${cidade.name}
                             `
                        ];

                        finalizado(user, mensagem[0], cidade)

                    }
                }).catch((err) => {
                    db[user] = {
                        stage: 0,
                        menu: [],
                        subMenu: [],
                        cpf: [],
                        cidade: [],
                        time: []
                    };
                    console.log(err)

                    const erro = [
                        `Olá ${cidade.supervisor}, o cliente ${nome} - ${user.substring(2, 12)} da cidade ${cidade.name} entrou em nome mas não foi possivel abrir um atendimento`
                    ]

                    client.sendText(cidade.nome, erro[0])
                    client.sendText(user, "Enviamos sua solicitacão para o supervisor responsável e logo entraremos em nome.")
                })

        }


    }

    function finalizado(user, mensagem, cidade) {
        client.sendText(user, mensagem)
            .then((res) => {
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

exports.execute = execute;