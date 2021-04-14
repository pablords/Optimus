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
            `${contato} o seu atendimento foi finalizado pois não houve ação sua no periodo de 5 minutos\n
            Caso queira abrir um novo atendimento, digite [#]`
        ]
    }


    switch (message.type) {
        case "ptt":
            return [
                "Por gentileza selecione uma das opcoes",
                `${contato}, Sou um robõ e ainda não consigo interpretar audios..`,
            ]
            break;
        case "video":
            return [
                "Por gentileza selecione uma das opcoes",
                `${contato}, Sou um robõ e ainda não consigo interpretar videos..`,
            ]
            break;
        case "image":
            return [
                "Por gentileza selecione uma das opcoes",
                `${contato}, Sou um robõ e ainda não consigo interpretar imagens..`,
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
        const data = {
            name: nome,
            mobilePhone: user,
            cpf: db[user].cpf[0].document,
            cidade: cidades[msg].name,
            type: db[user].subMenu[0].title,
            subType: db[user].subMenu[0].name,
            description: db[user].subMenu[0].description
        }
        client.stopTyping(user);
        client.sendText(user, `Aguarde ${nome}, já estou solicitando um atendimento Técnico para voce...`)
            .then((res) => {
                sendClient(data, cidades[msg])
            })




        async function sendClient(data, cidade) {
            await Api.post('/whats-app/store', data)
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

                        let data = new Date(res.data.created_at);
                        var day = data.getDate();
                        var month = data.getMonth() + 1;
                        var year = data.getFullYear();
                        var hora = data.getHours();          // 0-23
                        var min = data.getMinutes();
<<<<<<< HEAD
                        let dataFormatada = `${day}/${month}/${year} ${hora}:${min}`;

                   

                        const mensagem = [
                            `Pronto ${nome}, sua solicitacao foi executada.
                             Em até 24h o técnico irá até sua residencia.\n
                             ID: ${res.data.id}\n
                             DATA SOLICITACAO: ${dataFormatada}\n
                             CIDADE: ${cidade.name}
                             `
=======
                        var seg = data.getSeconds();
                        let dataFormatada = `${day}/${month}/${year} ${hora}:${min}${seg}`;

                        const mensagem = [
                            `Pronto ${nome}, sua solicitacao foi executada.
                             Em até 24h o técnico irá até sua residencia.
                             ID: ${res.data.id}
                             DATA SOLICITACAO: ${dataFormatada}
                             CIDADE: ${cidade.name}
                            `
>>>>>>> 724feeb42770759d2c2f231b50056c34f0d72bc6
                        ];

                        finalizado(user, mensagem[0], cidade)

                    }
                }).catch((err) => {
                    client.startTyping(user);
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
                        `Olá ${cidade.supervisor}, o cliente ${nome} - ${user.substring(2, 12)} da cidade ${cidade.name}entrou em contato mas nao foi possivel abrir um atendimento`
                    ]
                    client.stopTyping(user);
                    client.sendText(cidade.contato, erro[0])
                    client.sendText(user, "Enviamos sua solicitacao para o supervisor responsavel e logo entraremos em contato.")
                })

        }


    }

    function finalizado(contato, mensagem, cidade) {
        client.sendText(contato, mensagem)
            .then((res) => {
                client.forwardMessages(
                    cidade.contato,
                    [res.to._serialized]
                )
            })
            .catch((err) => {
                console.log(err)
            })
<<<<<<< HEAD
=======


>>>>>>> 724feeb42770759d2c2f231b50056c34f0d72bc6

    }



}

exports.execute = execute;