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


    if (msg >= "") {
        db[user].cpf.push({ document: msg })
        db[user].stage = 5;
        return ["por gentileza, confirme o *CPF* ou número da *LINHA* do titular"];
    } 


}

exports.execute = execute;