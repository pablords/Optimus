const { menu0 } = require('../Menu/menu0')
const sub = require('../Menu/subMenu')
const { db } = require("../Models/banco");

function execute(user, msg) {
    if (!msg == "#" || !msg == "*") {
        return [
            "```Digite # para confirmar ou * para retornar ao menu inicial```",
            "Código inválido, digite corretamente"
        ];
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


    if (msg == "#") {
        db[user].stage = 4;
        return ["por gentileza, informe o *CPF* do titular"];
    }



}

exports.execute = execute;