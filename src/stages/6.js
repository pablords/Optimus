const { menu0 } = require('../Menu/menu0')
const { cidades } = require('../Menu/cidades')
const { db } = require("../Models/banco");
const api = require('../../services/api')


function execute(user, msg, contato) {

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





    if (cidades[msg]) {
        const data = {
            name: contato,
            mobilePhone: user,
            cpf: db[user].cpf[0].document,
            cidade: cidades[msg].name,
            type: db[user].subMenu[0].title,
            subType: db[user].subMenu[0].name,
            description: db[user].subMenu[0].description
        }
        sendClient(data)

        //db[user].stage = 7;
        return [`Aguarde, já estou solicitando um atendimento Técnico para voce ${contato}`];

        async function sendClient(data) {
            const res = await api.getMobilePhone(data)
            if (res) {
                db[user].stage = 0;
                return [
                    `Pronto ${contato}, sua solicitacao foi executada, em até 24h o técnico irá até sua residencia`
                ];
    
            }
            console.log(res)
        }
    }

   



}

exports.execute = execute;