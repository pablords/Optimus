const { menu0 } = require('../Menu/menu0')
const sub = require('../Menu/subMenu')
const { db } = require("../Models/banco");

function execute(user, msg) {

    if (!menu0[msg]) {
        return [
            "```Digite uma das opcoes```",
            "Código inválido, digite corretamente"
        ];
    }

    let menu = " MENU PRINCIPAL\n\n";
    Object.keys(menu0).forEach((value) => {
        let element = menu0[value];
        menu += `${value} - ${element.name}   ${element.description} \n`;
    });

    let subMenu = " Digite o numero que representa seu problema\n\n";
    Object.keys(sub[msg]).forEach((value) => {
        let element = sub[msg];
        subMenu += `${value} - ${element[value].name}   ${element[value].description} \n`;
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