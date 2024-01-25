const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors');
const { filmes } = require('./module/filmes.js');

// Criando um objeto para manipular as requisoções da API
const app = express();

//      request - recebe algum dado
//      response - saída de dados da API

//Função para manipular as restrições da API (HEADER)
app.use((request, response, next) =>{
    //Permite especificar quem poderá acessar a API('*' - libera o acesso publico, 'IP' - libera acesso apenas para aquela máquina)
    response.header('Access-Control-Allow-Origin', '*')
    //Permite especificar como a API, será requisitada (GET, POST, PUT e DELETE)
    response.header('Access-Control-Allow-Methods','GET')

//Ativa as configurações de permissão do cors
    app.use(cors());

    next();
})


//EndPoints:

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
app.listen('8080', function(){
    console.log('Api Funcionando!!')
})