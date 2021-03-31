const { db } = require("../Models/banco");

function execute(user, msg, contato) {


    db[user].stage = 0;
    return [
        `Pronto ${contato}, sua solicitacao foi executada, em até 24h o técnico irá até sua residencia`
    ];



}

exports.execute = execute;