/**
 * Autor: Carlos Eduardo
 * Objetivo: Projeto Empresa – “Filmes Online Acme”
 * Data: 25/01/2024
 * Versão:1.0
 */

var filmes = require('../module/filmes.js')
const filmesJson = filmes.filmes

const getFilmes = function(){
    
    let arrayLocal = []
    let JSonLocal ={}

    filmesJson.filmes.forEach(function(movies){
        let filmesLocal = {}
        filmesLocal.nome = movies.nome
        filmesLocal.data_lancamento = movies.data_lancamento
        filmesLocal.data_relancamento = movies.data_relancamento
        filmesLocal.duracao = movies.duracao
        filmesLocal.sinopse = movies.sinopse
        filmesLocal.valor_unitario = movies.valor_unitario

        arrayLocal.push(filmesLocal)
        JSonLocal.filmes = arrayLocal
    })
    
    return(JSonLocal)
}

const getFilmesId = function(id){
 
    let idRecebido = id



}

console.log(getFilmes())
module.exports = {
    getFilmes,
    getFilmesId
}