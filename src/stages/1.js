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

    if (!menu0[msg]) {
        return [
            "```Digite uma das opcoes```",
            "Código inválido, digite corretamente"
        ];
    }


    let subMenu = "Digite o número que representa seu problema:\n\n";
    Object.keys(sub[msg]).forEach((value) => {
        let element = sub[msg];
        subMenu += `[${value}] - ${element[value].name}   ${element[value].description} \n`;
    });


    if (menu0[msg]) {
        db[user].menu.push(menu0[msg]);
        db[user].stage = 2;
        return [
            subMenu
        ];
    }



}

exports.execute = execute;