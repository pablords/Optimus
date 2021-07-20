const { menu0 } = require('../Menu/menu0')
const { cidades } = require('../Menu/cidades')
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
                "Por gentileza selecione uma das opções",
                `${contato}, Sou um robõ e ainda não consigo interpretar audios..`,
            ]
            break;
        case "video":
            return [
                "Por gentileza selecione uma das opções",
                `${contato}, Sou um robõ e ainda não consigo interpretar videos..`,
            ]
            break;
        case "image":
            return [
                "Por gentileza selecione uma das opções",
                `${contato}, Sou um robõ e ainda não consigo interpretar imagens..`,
            ]
            break;


    }

    let menu = " MENU PRINCIPAL\n\n";
    Object.keys(menu0).forEach((value) => {
        let element = menu0[value];
        menu += `[${value}] - ${element.name}   ${element.description} \n`;
    });

    let cidade = " SELECIONE SUA CIDADE\n\n";
    Object.keys(cidades).forEach((value) => {
        let element = cidades[value];
        cidade += `[${value}] - ${element.name}  \n`;
    })

    switch (msg) {
        case "*":
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
            break;
        case db[user].cpf[0].document:
            db[user].stage = 6;
            return [
                "```Digite uma das opcões ou * para retornar ao menu inicial```",
                cidade
            ];
            break

        default:
            return [
                "dados não conferem, por gentileza digite corretamente o *CPF* do titular"
            ];
            break;
    }


}

exports.execute = execute;