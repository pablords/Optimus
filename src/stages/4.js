const { menu0 } = require('../Menu/menu0')
const sub = require('../Menu/subMenu')
const { db } = require("../Models/banco");

function execute(user, msg, contato, client, message) {

    if(message.type =="ptt"){
        return [
            "```Digite uma das opcoes ou * para retornar ao menu inicial```",
            `Olá ${contato}, Sou um robõ e ainda não consigo interpretar mensagem de audio,\n`,
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


    if (msg >= "") {
        db[user].cpf.push({ document: msg })
        db[user].stage = 5;
        return ["por gentileza, confirme o *CPF* ou numero da *LINHA* do titular"];
    } 


}

exports.execute = execute;