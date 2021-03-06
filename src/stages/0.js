
const { menu0 } = require("../Menu/menu0");
const { db } = require("../Models/banco");


function execute(user, msg, contato, client) {


    function adicionaZero(numero) {
        if (numero <= 9)
            return "0" + numero;
        else
            return numero;
    }

    const date = new Date();
    const hour = date.getHours()
    const minutes = date.getMinutes()
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()

    const horaAtualFormatada = (adicionaZero(hour.toString()) + ":" + (adicionaZero(minutes).toString()));
    const dataAtualFormatada = (adicionaZero(day.toString()) + "/" + (adicionaZero(month + 1).toString()) + "/" + year);


    db[user].time.push({ agora: date.getTime(), inicio: dataAtualFormatada + " " + horaAtualFormatada })

    if (hour >= 18 && hour < 24) {
        time = "Boa noite 🌙"
    } else if (hour >= 12 && hour < 18) {
        time = "Boa tarde ☀️"
    } else if (hour >= 0 && hour < 12) {
        time = "Bom dia ☀️"
    }

    db[user].stage = 1;

    let menu = " MENU PRINCIPAL \n\n";
    Object.keys(menu0).forEach((value) => {
        let element = menu0[value];

        menu += `[${value}] - ${element.name}   ${element.description} \n`;

    });

    var nomeCliente 
    if(contato == "undefined"){
      nomeCliente = ""
    }else{
        nomeCliente = contato
    }

    return [
        menu,
        `Olá ${nomeCliente}, ${time}\n
    Meu nome é Optimus sou o robõ 🤖 virtual da Vivo Leste MG.\n\n 
    Vou lhe apresentar algumas *OPÇÕES* de atendimento\n\n`,
        `Inicio do atendimento: ${db[user].time[0].inicio}`,
    ];

}

exports.execute = execute;