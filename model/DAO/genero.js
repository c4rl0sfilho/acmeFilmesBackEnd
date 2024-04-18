//Importando a biblioteca do prisma client
const {PrismaClient} = require('@prisma/client');
 
 //Instancia da classe prisma client
 const prisma = new PrismaClient()


 const insertGenero = async function(nome){
    let nomeGenero = nome

    try {
        let sql = `insert into tbl_genero(nome) values("${nomeGenero}");`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
    
        }else{
            return false

        }
    } catch (error) {
        return false
    }
 }


 module.exports={
    insertGenero
 }