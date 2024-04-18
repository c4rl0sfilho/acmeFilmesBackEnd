//Import do arquivo responsavel pela interação com o BD
const filmesDAO = require('../model/DAO/filme.js')

//Import do arquivo de configuração do projeto
const message = require('../module/config.js')

const setInsertNovoGenero = async function(nome){
    let novoGeneroJSON = {}

    if(nome == ''   || nome == undefined   ||  nome == null){
        return message.ERROR_REQUIRED_FIELDS  //400
    }else{
        novoGeneroJSON.nome == nome
    }
    //TERMINAR ESSA FUNÇÃO
}