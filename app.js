const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const { filmes } = require('./module/filmes.js');

/**
 *  Para realizar a integração com o banco de dados devemos utilizar uma das seguintes bibliotecas:
 *        -SEQUELIZE    (BIBLIOTECA ANTIGA, E POSSUI MAIS CONTEUDOS EXPLICATIVOS NA WEB)
 *        -PRISMA ORM   (A BIBLIOTECA MAIS ATUAL - UTILIZADA NESSE PROJETO)
 *        -FASTFY ORM   (A BIBLIOTECA MAIS ATUAL)
 * 
 * 
 *      Para a instalação do Prisma ORM
 *      npm instal --save   (É responsávem pela conexão como o DB)
 *      npm install @prisma/client --save   (É responsavel por executar scripts SQL mo DB)
 *  
 *      Para inocializar o prisma no projeto
 * 
 *      npx prisma init
 */

// Criando um objeto para manipular as requisoções da API
const app = express();

//      request - recebe algum dado
//      response - saída de dados da API

//Função para manipular as restrições da API (HEADER)
app.use((request, response, next) =>{
    //Permite especificar quem poderá acessar a API('*' - libera o acesso publico, 'IP' - libera acesso apenas para aquela máquina)
    response.header('Access-Control-Allow-Origin', '*')
    //Permite especificar como a API, será requisitada (GET, POST, PUT e DELETE)
    response.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS')

//Ativa as configurações de permissão do cors
    app.use(cors());

    next();
})

/***************************************** Import dos arquivos do controller do projeto***********************/
    const controllerFilmes = require('./controller/controller_filme.js')


/*********************************************************************************************************** */

//Criando um objeto para controlar os dados que chegam da requisição em formato JSON
const bodyParserJSON = bodyParser.json()


//EndPoints:
    //Versão 1.0 que retorna os dados de um arquivo de filmes
    //Periodo de utilização 01/2024 até 02/2024
app.get('/v1/acmeFilmes/filmes', cors(), async function(request, response, next){
    //http://localhost:8080/v1/acmeFilmes/filmes
    
    let controleFilmes = require('./controller/funcoes.js');
    
    let listaFilmes = controleFilmes.getFilmes();

    if(listaFilmes){
        response.json(listaFilmes)
        response.status(200)
    }else{
        response.status(404)
    }
})

    //Versão 2.0 que retorna os dados de filmes do Banco de Dados
app.get('/v2/acmeFilmes/filmes',cors(),async function(request, response, next){

    //Chama a função da controller para retornar todos os filmes
    let dadosFilmes = await controllerFilmes.getListarFilmes()

    //Validação para verificar se existe dados a serem retornados
    if (dadosFilmes) {
        response.json(dadosFilmes)
        response.status(200)
    }else{
        response.json({message: 'Nenhum registro encontrado'})
        response.status(404)
    }
})

app.get('/v2/acmeFilmes/filmes/filtro',cors(), async function(request, response){
    //  /v2/acmeFilmes/filmes/filtro?nome=valor

    // const variavel = req.query.nomeDaVariavel;
    let nome = request.query.nome

   

    let dadosFilmes = await controllerFilmes.getFilmeFiltrado(nome)

    response.status(dadosFilmes.status_code)
    response.json(dadosFilmes)


   
})

//Retorna os dados de um filme pelo ID
app.get('/v2/acmeFilmes/filme/:id', cors(), async function(request, response){
    const idFilme = request.params.id

    //Encaminha para a controller verificar se ha dados
    let dadosFilme = await controllerFilmes.getBuscarFilme(idFilme)

    

    response.status(dadosFilme.status_code)
    response.json(dadosFilme)

})

app.post('/v2/acmeFilmes/filme', cors(), bodyParserJSON, async function(request, response){

    //Recebe todos os dados encaminhados na requisição pelo body
    let dadosBody = request.body;

    //Encaminha os dados para o controller enviar para o DAO
    let resultDadosNovoFilme = await controllerFilmes.setInserirNovoFilme(dadosBody)

    response.status(resultDadosNovoFilme.status_code);
    response.json(resultDadosNovoFilme)

})


app.listen('8080', function(){
    console.log('Api Funcionando!!')
})


