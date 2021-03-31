
const { menu0 } = require("../Menu/menu0");
const { db } = require("../Models/banco");


function execute(user, msg, contato) {
    // Obtem a hora atual do PC para definir se vai ser Bom dia, tarde ou noite.
    stamp = new Date();
    hours = stamp.getHours();
    if (hours >= 18 && hours < 24) {
        time = "Boa noite 🌙"
    } else if (hours >= 12 && hours < 18) {
        time = "Boa tarde ☀️"
    } else if (hours >= 0 && hours < 12) {
        time = "Bom dia ☀️"
    }

    db[user].stage = 1;

  


    let menu = " MENU PRINCIPAL \n\n";
    Object.keys(menu0).forEach((value) => {
        let element = menu0[value];

        menu += `${value} - ${element.name}   ${element.description} \n`;

    });


    return [
        menu,
        `Olá ${contato}, ${time}\n
    Sou o atendente de suporte 🤖 virtual da Vivo.\n\n 
    Vou lhe apresentar algumas *OPÇÕES* de atendimento\n\n`,
    ];
}

exports.execute = execute;