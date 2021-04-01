const { menu0 } = require('../Menu/menu0')
const { cidades } = require('../Menu/cidades')
const { db } = require("../Models/banco");

function execute(user, msg, contato) {

    let menu = " MENU PRINCIPAL\n\n";
    Object.keys(menu0).forEach((value) => {
        let element = menu0[value];
        menu += `${value} - ${element.name}   ${element.description} \n`;
    });

    let cidade = " SELECIONE SUA CIDADE\n\n";
    Object.keys(cidades).forEach((value) => {
        let element = cidades[value];
        cidade += `${value} - ${element.name}  \n`;
    })

    switch (msg) {
        case "*":
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
            break;
        case db[user].cpf[0].document:
            db[user].stage = 6;
            return [
                "```Digite uma das opcoes ou * para retornar ao menu inicial```",
                cidade
            ];
            break

        default:
            return [
                "dados nao conferem, por gentileza digite corretamente o *CPF* do titular"
            ];
            break;
    }


}

exports.execute = execute;