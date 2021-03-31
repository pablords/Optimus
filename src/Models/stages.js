var stages = {
    0: {
        descricao: "Boas Vindas",
        obj: require("../stages/0"),
    },
    1: {
        descricao: "Menu",
        obj: require("../stages/1"),
    },
    2: {
        descricao: "Sub Menu",
        obj: require("../stages/2"),
    },
    3: {
        descricao: "Confirmar Solicitacao",
        obj: require("../stages/3"),
    },
    4: {
        descricao: "CPF",
        obj: require("../stages/4"),
    },
    5: {
        descricao: "CONFIRMAR CPF",
        obj: require("../stages/5"),
    },
    6: {
        descricao: "CHAMADA API",
        obj: require("../stages/6"),
    },
    7: {
        descricao: "ENCERRAMENTO",
        obj: require("../stages/7"),
    },
  
  
  
};

exports.step = stages;