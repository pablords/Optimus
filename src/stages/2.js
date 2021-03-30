const { menu0 } = require('../Menu/menu0')
const sub = require('../Menu/subMenu')
const { db } = require("../Models/banco");

function execute(user, msg) {
    console.log(msg)

    const select = db[user].menu[0]
  
    let menu = " MENU PRINCIPAL\n\n";
    Object.keys(menu0).forEach((value) => {
        let element = menu0[value];
        menu += `${value} - ${element.name}   ${element.description} \n`;
    });


    if (msg === "*") {
        console.log("voltou")
        db[user] = {
            stage: 1,
            menu: [],
            subMenu: [],
            cpf: []
        };
        return [menu];
    }


    if (sub[select.id][msg]) {
        console.log("passou")
        db[user].subMenu.push(sub[select.id][msg])
        db[user].stage = 3;
        return [
            "```Digite # para confirmar ou * para retornar ao menu inicial```",
            `Voce selecionou a opcao *${select.name} - ${sub[select.id][msg].name}*`,
        ];
    }

    if (!sub[msg]) {
        console.log("invalido")
        return [
            "```Digite uma das opcoes ou * para retornar ao menu inicial```",
            "Código inválido, digite corretamente"
        ];
    }




}

exports.execute = execute;