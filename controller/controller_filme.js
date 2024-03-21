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
const setInserirNovoFilme = async function(dadosFilme, contentType){

    try{

    

        //Validação de content-type(apenas application/json)
        if (String(contentType).toLowerCase() == 'application/json') {
            
    
            
            //cria um objeto JSON para devolver os dados criados na requisição
            let novoFilmeJSON  = {}

            //Validação de campos obrigatorios ou com digitação invalida
            if(dadosFilme.nome == ''                     || dadosFilme.nome == undefined             || dadosFilme.nome == null || dadosFilme.nome.length > 80 || 
            dadosFilme.sinopse == ''                  || dadosFilme.sinopse == undefined          || dadosFilme.sinopse == null || dadosFilme.sinopse.length > 65000 ||
            dadosFilme.duracao == ''                  || dadosFilme.duracao == undefined          || dadosFilme.duracao == null || dadosFilme.duracao.length > 8 ||
            dadosFilme.data_lancamento == ''          || dadosFilme.data_lancamento == undefined  || dadosFilme.nome == null || dadosFilme.data_lancamento.length != 10||
            dadosFilme.foto_capa == ''                || dadosFilme == undefined                  || dadosFilme.nome == null || dadosFilme.foto_capa.length > 200 || 
            dadosFilme.valor_unitario.length > 6
            ){
                    return message.ERROR_REQUIRED_FIELDS; //400
            }else
                {
                    let validateStatuus = false

                    if (dadosFilme.data_relancamento != null && dadosFilme.data_relancamento !=' '&& dadosFilme.data_relancamento != undefined){

                        if(dadosFilme.data_relancamento.length != 10)   
                            return message.ERROR_REQUIRED_FIELDS //400
                        else 
                            validateStatuus = true
                    }else 
                        validateStatuus = true

                //Validação para verificar se a variavel booleana é verdadeira
                if(validateStatuus){
                    
                    
                    //Encaminha os dados do novo filme para o DAO inserir no DB
                    let novoFilme = await filmesDAO.insertFilme(dadosFilme)
                    
                    //Validação para verificar se o DAO inseriu os dados no DB
                    if (novoFilme) {
                        //Cria o JSON de retorno de dados
                        novoFilmeJSON.filme = dadosFilme
                        novoFilmeJSON.status = message.SUCESS_CREATED_ITEM.status
                        novoFilmeJSON.status_code = message.SUCESS_CREATED_ITEM.status_code
                        novoFilmeJSON.message = message.SUCESS_CREATED_ITEM.message
                        
                        return novoFilmeJSON; //201
                    }else{
                        return message.ERROR_INTERNAL_SERVER_DB //500
                    
                    }
                }
            }
            
        }    else{
            return message.ERROR_CONTENT_TYPE //415
        }
    }catch(error){
        return message.ERROR_INTERNAL_SERVER //500 - erro na controller
    }
}

//Função para atualizar um filme
const setAtualizarFilme = async function(id, dadosFilme, contentType) {

    try{

        let idFilme = id;

        if(idFilme == '' || idFilme == undefined || isNaN (idFilme)){
            return message.ERROR_INVALID_ID
            
        }else{

        if(String(contentType).toLowerCase() == 'application/json'){
            let updateFilmeJson = {}
            
            if( dadosFilme.nome == ''                     || dadosFilme.nome == undefined               ||  dadosFilme.nome == null               || dadosFilme.nome.length > 80             || 
                dadosFilme.sinopse == ''                  || dadosFilme.sinopse == undefined            ||  dadosFilme.sinopse == null            || dadosFilme.sinopse.length > 65000       ||
                dadosFilme.duracao == ''                  || dadosFilme.duracao == undefined            ||  dadosFilme.duracao ==  null           || dadosFilme.duracao.length > 8           ||
                dadosFilme.data_lancamento == ''          || dadosFilme.data_lancamento == undefined    ||  dadosFilme.data_lancamento == null    || dadosFilme.data_lancamento.length != 10 ||
                dadosFilme.foto_capa == ''                || dadosFilme.foto_capa == undefined          ||  dadosFilme.foto_capa ==  null         || dadosFilme.foto_capa.length > 200       ||
                dadosFilme.valor_unitario.length > 6      
        ){
            return message.ERROR_REQUIRED_FIELDS
        } else {
            let validateStatus = false

            if (dadosFilme.data_relancamento != null    &&
                dadosFilme.data_relancamento != ''      &&
                dadosFilme.data_relancamento != undefined) {

                if (dadosFilme.data_relancamento.length != 10) {
                    return message.ERROR_REQUIRED_FIELDS
                }else{
                    validateStatus = true
                }
            } else {
                validateStatus = true 
            }

            if (validateStatus){
                let uptadeFilme = await filmesDAO.updateFilme (id, dadosFilme)
                

                if(uptadeFilme) {
   
                    updateFilmeJson.filme = dadosFilme                
                    updateFilmeJson.status = message.SUCCESS_UPDATE_ITEM.status
                    updateFilmeJson.status_code = message.SUCCESS_UPDATE_ITEM.status_code
                    console.log(uptadeFilme)
                    updateFilmeJson.message = message.SUCCESS_UPDATE_ITEM.message

                    return updateFilmeJson
                } else {
                     return message.ERROR_INTERNAL_SERVER_DB 
                }
            }
        }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }

}
//Função para excluir um filme
const setExcluirNovoFilme = async function(id){
        //Recebe o ID filme 
        let idFilme = id


        //Validação para verificar se o ID é valido (vazio, indefinodo e não numerico)
        if(idFilme == "" || idFilme == undefined || isNaN(idFilme)){
            return message.ERROR_INVALID_ID //400    
        }else{

            //Encaminha para o DAO localizar dados do filme
            let result = await filmesDAO.deleteFilme(idFilme)

            //Validação para verificar se existe dados de retorno
            
                if(result){
                    return true                    
                }else{
                    return message.ERROR_NOT_FOUND //404
                }

               
            
        }


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
    setAtualizarFilme,
    setExcluirNovoFilme,
    setInserirNovoFilme,
    getBuscarFilme,
    getFilmeFiltrado,
    getListarFilmes
}