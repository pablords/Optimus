const { menu0 } = require('../Menu/menu0')
const sub = require('../Menu/subMenu')
const { db } = require("../Models/banco");

function execute(user, msg, contato, client, message) {


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
                "Por gentileza selecione uma das opcões",
                `${contato}, Sou um robõ e ainda não consigo interpretar audios..`,
            ]
            break;
        case "video":
            return [
                "Por gentileza selecione uma das opcões",
                `${contato}, Sou um robõ e ainda não consigo interpretar videos..`,
            ]
            break;
        case "image":
            return [
                "Por gentileza selecione uma das opcões",
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
            time: [{ agora: db[user].time[0].agora, inicio: db[user].time[0].inicio }],
        };
        return [
            menu
        ];
    }

    const select = db[user].menu[0]
    sendFiles(user, msg, select)
    if (sub[select.id][msg]) {
        switch (select.name) {
            case "INTERNET":
                db[user].subMenu.push(sub[select.id][msg])
                return [
                    "Digite [S] para Sim e [N] para Não",
                    "Você deseja receber dicas para um bom funcionamento de sua Internet?"
                ]

                break;
            case "TV":
                db[user].subMenu.push(sub[select.id][msg])
                return [
                    "Digite [S] para Sim e [N] para Não",
                    "Você deseja receber dicas para um bom funcionamento de sua TV?"
                ]
                break;
            case "LINHA":
                db[user].stage = 3;
                db[user].subMenu.push(sub[select.id][msg])
                return [
                    "```Digite # para confirmar ou * para retornar ao menu inicial```",
                    `Você selecionou a opcão *${select.name} - ${sub[select.id][msg].name}*`,
                ];
                break;

        }

    }

    if (String(msg).toUpperCase() == "N") {
        db[user].stage = 3;
        return [
            "```Digite # para confirmar ou * para retornar ao menu inicial```",
            `Você selecionou a opcão  *${select.name} - ${db[user].subMenu[0].name}*`,
        ];
    }


    function sendFiles(user, msg, select) {
        if (String(msg).toUpperCase() == "S" && select.name == "INTERNET") {
            db[user].stage = 3;

            client.startTyping(user);
            client.sendFile(user,
                'src/assets/DicasWIFI.mp4',
                'DicasWIFI',
                'Dicas w-fi'
            )
                .then(() => {
                    client.sendText(user,
                        `Voce selecionou a opção *${select.name} - ${db[user].subMenu[0].name}*
                    Digite # para confirmar ou * para retornar ao menu inicial`
                    )

                    client.stopTyping(user);

                }).catch((err) => {
                    console.log(err)
                })


        }

        if (String(msg).toUpperCase() == "S" && select.name == "TV") {
            db[user].stage = 3;

            client.startTyping(user);
            client.sendFile(user,
                'src/assets/DicasTVFibra.pdf',
                'DicasTVFibra',
                'Dicas Tv'
            )
                .then(() => {
                    client.sendText(user,
                        `Você selecionou a opcao *${select.name} - ${db[user].subMenu[0].name}*
                        Digite # para confirmar ou * para retornar ao menu inicial`
                    )

                    client.stopTyping(user);

                }).catch((err) => {
                    console.log(err)
                })


        }

    }



}

exports.execute = execute;