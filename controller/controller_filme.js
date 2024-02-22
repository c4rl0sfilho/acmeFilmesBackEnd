/********************************************************************************************
 * Objetivo: Arquivo respondavel pelas validações e consistencias de dados de filme 
 * Data:01/02/2024
 * Autor: Carlos Eduardo
 * Versão:1.0
 ********************************************************************************************/

//Import do arquivo responsavel pela interação com o BD
const filmesDAO = require('../model/DAO/filme.js')

//Import do arquivo de configuração do projeto
const message = require('../module/config.js')

//Fução para inserir novo filme
const setInserirNovoFilme = async function(){

}

//Função para atualizar um filme
const setAtualizarNovoFilme = async function(){

}

//Função para excluir um filme
const setExcluirNovoFilme = async function(){

}

//Função que lista os filmes
const getListarFilmes = async function(){

    //cria um objeto JSON
    let filmesJSON = {}

    //Chama a função DAO que retorna os dados do BD
    let dadosFilmes = await filmesDAO.selectAllFilmes()

    //Validação pra verificar see o DAO retornou os dados
    if(dadosFilmes){
        //Cria o JSON para retornar as informações para o app
        filmesJSON.filmes = dadosFilmes
        filmesJSON.quantidade = dadosFilmes.lenght
        filmesJSON.status_code = 200

        return filmesJSON
    }else
        return false



}
//Função que filtra um filme pelo nome
const getFilmeFiltrado = async function(nome){
    let nomeFilme = nome

    let filmesJSON = {}

    if(nomeFilme == '' || nomeFilme == undefined){
        return message.ERROR_INVALID_CONTENT //400    
    }else{
        let dadosFilmes = await filmesDAO.selectFilmeFiltradoNome(nomeFilme)

        if(dadosFilmes){

            if(dadosFilmes.length > 0){

                filmesJSON.filmes = dadosFilmes
                filmesJSON.status_code = 200

                return filmesJSON
            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_DB //500
        }
    }
}

//Funcão que busca os filmes
const getBuscarFilme = async function(id){

    //Recebe o ID filme 
    let idFilme = id

    //Cria o objeto JSON
    let filmesJSON = {}

    //Validação para verificar se o ID é valido (vazio, indefinodo e não numerico)
    if(idFilme == "" || idFilme == undefined || isNaN(idFilme)){
        return message.ERROR_INVALID_ID //400    
    }else{

        //Encaminha para o DAO localizar dados do filme
        let dadosFilme = await filmesDAO.selectFilmeFiltradoId(idFilme)

        //Validação para verificar se existe dados de retorno
        if (dadosFilme) {
            //Cria o JSON de retorno
            if(dadosFilme.length > 0){
                
                filmesJSON.filme = dadosFilme
                filmesJSON.status_code = 200
            }else{
                return message.ERROR_NOT_FOUND //404
            }

            return filmesJSON
        }else
        return message.ERROR_INTERNAL_SERVER_DB //500
    }



}

module.exports = {
    setAtualizarNovoFilme,
    setExcluirNovoFilme,
    setInserirNovoFilme,
    getBuscarFilme,
    getFilmeFiltrado,
    getListarFilmes
}