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
const insertFilme = async function(dadosFilme){
    try {
        let sql = `insert into tbl_filme
     (
        nome ,
        sinopse, 
        duracao, 
        data_lacamento, 
        data_relancamento, 
        fato_capa, 
        valor_unitario
        ) values(
            '${dadosFilme.nome}',
            '${dadosFilme.sinopse}',
            '${dadosFilme.duracao}',
            '${dadosFilme.data_lacamento}',
            '${dadosFilme.data_relancamento}',
            '${dadosFilme.fato_capa}',
            '${dadosFilme.valor_unitario}'
        )`;

        //$executeRawUnsafe() serve para executar scripts sem retorno de dados
            //(update, insert e delete)
        //$querryRawUnsafe() - serve para executar scripts com retorno de dados
            //(select)
        let result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
    


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

    if(rsFilmes.length > 0)
        return rsFilmes
    else 
        return false
}
//Função para buscar um filme do banco de dados pelo id
const selectByIdFilme = async function(){

}
//Função que filtra o filme pelo nome
const selectFilmeFiltradoNome = async function(nome){

    try {
        let sql = `select * from tbl_filme where nome like '${nome}%'` 

    let rsFilmes =await prisma.$queryRawUnsafe(sql)
    return rsFilmes
    } catch (error) {
        return false
    }
    
}

//Função que filtra o filme pelo id
const selectFilmeFiltradoId = async function(id){

    //Script SQL para executar um filme pelo ID
    try {
        let sql = `select * from tbl_filme where id=${id}`

    //Encaminha o script SQL para o DB
    let rsFilmes =await prisma.$queryRawUnsafe(sql)
        return rsFilmes

    } catch (error) {
        return false
    }
    
}


module.exports={
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectFilmeFiltradoNome,
    selectByIdFilme,
    selectFilmeFiltradoId
}