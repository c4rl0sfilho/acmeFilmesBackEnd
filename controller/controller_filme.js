/********************************************************************************************
 * Objetivo: Arquivo respondavel pelas validações e consistencias de dados de filme 
 * Data:01/02/2024
 * Autor: Carlos Eduardo
 * Versão:1.0
 ********************************************************************************************/

//Import do arquivo responsavel pela interação com o BD
const filmesDAO = require('../model/DAO/filme.js')

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

//Funcão que busca os filmes
const getBuscarFilme = async function(){

}

module.exports = {
    setAtualizarNovoFilme,
    setExcluirNovoFilme,
    setInserirNovoFilme,
    getBuscarFilme,
    getListarFilmes
}