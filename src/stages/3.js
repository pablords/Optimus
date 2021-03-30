const { menu0 } = require('../Menu/menu0')
const sub = require('../Menu/subMenu')
const { db } = require("../Models/banco");

function execute(user, msg) {
    console.log(msg)
    if (!msg == "#" || !msg == "*") {
        console.log("diferente")
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
        console.log("voltou pro inicio")
        db[user] = {
            stage: 1,
            menu: [],
            subMenu: [],
            cpf: []
        };
        return [
            menu
        ];
    }


    if (msg == "#") {
        console.log("ok")
        db[user].stage = 4;
        return ["por gentileza, informe o numero de sua *LINHA TELEFONICA* ou *CPF*"];
    }



}

exports.execute = execute;