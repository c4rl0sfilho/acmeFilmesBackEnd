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
    let sql;
    try {
        if(
            dadosFilme.data_relancamento!=''    &&
            dadosFilme.data_relancamento!=null    &&
            dadosFilme.data_relancamento!=undefined
        ){
            sql = `insert into tbl_filme
            (
               nome ,
               sinopse, 
               duracao, 
               data_lancamento, 
               data_relancamento, 
               foto_capa, 
               valor_unitario
               ) values(
                   '${dadosFilme.nome}',
                   '${dadosFilme.sinopse}',
                   '${dadosFilme.duracao}',
                   '${dadosFilme.data_lancamento}',
                   '${dadosFilme.data_relancamento}',
                   '${dadosFilme.foto_capa}',
                   '${dadosFilme.valor_unitario}'
               )`;
        }else{
            sql = `insert into tbl_filme
            (
               nome ,
               sinopse, 
               duracao, 
               data_lancamento, 
               data_relancamento, 
               foto_capa, 
               valor_unitario
               ) values(
                   '${dadosFilme.nome}',
                   '${dadosFilme.sinopse}',
                   '${dadosFilme.duracao}',
                   '${dadosFilme.data_lancamento}',
                   null,
                   '${dadosFilme.foto_capa}',
                   '${dadosFilme.valor_unitario}'
               )`;
        }
       

        console.log(sql)
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

const getLastID = async function(){

    let sql;
    try {
        sql = `select cast(last_insert_id() as DECIMAL) as id from tbl_filme limit 1;`

        let result = await prisma.$queryRawUnsafe(sql);
    } catch (error) {
        
    }


}


//Função para Atualizar um filme no banco de dados
const updateFilme = async function(id, dadosFilme) {

    try {
        
        let sql

        if( dadosFilme.data_relancamento != ''      &&
            dadosFilme.data_relancamento != null    &&
            dadosFilme.data_relancamento != undefined
        ){

            sql = `update tbl_filme set nome =              '${dadosFilme.nome}',
                                        sinopse =           '${dadosFilme.sinopse}',
                                        duracao =           '${dadosFilme.duracao}',
                                        data_lancamento =   '${dadosFilme.data_lancamento}',
                                        data_relancamento = '${dadosFilme.data_relancamento}',
                                        foto_capa =         '${dadosFilme.foto_capa}',
                                        valor_unitario =    '${dadosFilme.valor_unitario}'
                                        where id =           ${id}`

        } else {
            sql = `update tbl_filme set nome =              '${dadosFilme.nome}',
                                        sinopse =           '${dadosFilme.sinopse}',
                                        duracao =           '${dadosFilme.duracao}',
                                        data_lancamento =   '${dadosFilme.data_lancamento}',
                                        data_relancamento = '${dadosFilme.data_relancamento}',
                                        foto_capa =         '${dadosFilme.foto_capa}',
                                        valor_unitario =    '${dadosFilme.valor_unitario}'
                                        where id =           ${id}`
        }

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false

        } catch (error) {
            return false
    }
}

//Função para excluir um filme no banco de dados
const deleteFilme = async function(id){

    try {
        let sql = `DELETE FROM tbl_filme WHERE id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        console.log(result);
            
            if (result) {
                return true
        
            }else{
                return false

            }
    } catch (error) {
        return false
        
    }
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
    selectFilmeFiltradoId,
    getLastID
}