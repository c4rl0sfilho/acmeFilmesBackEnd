/********************************************************************************************
 * Objetivo: Arquivo responsavel pela manipulação de dados no banco de dados MySql, 
 *           aqui realizamos o CRUD utilizando a linguagem SQL 
 * Data:01/02/2024
 * Autor: Carlos Eduardo
 * Versão:1.0
 ****************************************
 ****************************************************/

//Importando a biblioteca do prisma client
const {PrismaClient} = require('@prisma/client');
 
 //Instancia da classe prisma client
 const prisma = new PrismaClient()



//Função para inserir novo filme no banco de dados
const insertFilme = async function(){

}

//Função para Atualizar um filme no banco de dados
const updateFilme = async function(){

}

//Função para excluir um filme no banco de dados
const deleteFilme = async function(){

    

}

//Função para listar todos os filmes do banco de dados
const selectAllFilmes = async function(){
    
    let sql = 'select * from tbl_filme';

    
    //$QuerryRawUnsafe(sql)         possibilita enviar uma variavel
    //$QuerryRaw('select * from tbl_filme;')  executa o script dentro
    
    let rsFilmes =await prisma.$queryRawUnsafe(sql)

    if(rsFilmes.lenght > 0)
        return rsFilmes
    else 
        return false
}
//Função para buscar um filme do banco de dados pelo id
const selectByIdFilme = async function(){

}

module.exports={
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme
}