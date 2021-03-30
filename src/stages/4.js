const { menu0 } = require('../Menu/menu0')
const sub = require('../Menu/subMenu')
const { db } = require("../Models/banco");

function execute(user, msg) {
    //console.log(db[user])

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
            cpf: []
        };
        return [
            menu
        ];
    }


    if (msg >= "") {
        db[user].cpf.push({ document: msg })
        db[user].stage = 5;
        return ["Foi aberto um atendimento para voce."];
    } 


}

exports.execute = execute;