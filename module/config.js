/**************************************************************************************************
 * Objetivo: Arquivo Responsavel pela padronização de variaveis e constantes globais do projeto
 * Data:22/02/2024
 * Autor: Carlos Eduardo
 * Versão:1.0
 *******************************************************************************************/

/***************************   MENSAGENS DE ERRO DO PROJETO   ************************** */

const ERROR_INVALID_ID = {status: false, status_code: 400, message: 'O ID encaminhado na requisição não é válido'}

const ERROR_INVALID_CONTENT = {status: false, status_code: 400, message: 'O conteúdo encaminhado na requisição não é válido'}

const ERROR_NOT_FOUND = {status: false, status_code: 404, message: 'Não foi encontrado nenhum item'}

const ERROR_INTERNAL_SERVER_DB = {status: false, status_code: 500, message: 'Não foi possivel processar a requisição, devido a um acesso ao Banco de dades.Contate o administrafor da API'}

const ERROR_INTERNAL_SERVER = {status: false, status_code: 500, message: 'Não foi possivel processar a requisição, devido a um problema na camada de negócio/controle da aplicação'}

const ERROR_REQUIRED_FIELDS = {status: false, status_code: 400, message:'Existem campos requeridos que não foram preenchidos, ou não atendem aos critérios de digitação'}

const ERROR_CONTENT_TYPE = {status: false, status_code: 415, message:'O content-type enbcaminhado na requisição não pe suportado pelo servidor. Deve-se encaminhar apenas requisicões com appliation/json'}





/***************************   MENSAGENS DE SUCESSO DO PROJETO   ************************** */

const SUCESS_CREATED_ITEM = {status: true, status_code: 201, message: 'Item criado com sucesso'}

const SUCCESS_UPDATE_ITEM = {status: true, status_code: 200, message: 'Item atualizado com sucesso!!!'}



module.exports={
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_INVALID_CONTENT,
    ERROR_REQUIRED_FIELDS,
    ERROR_INTERNAL_SERVER,
    ERROR_CONTENT_TYPE,
    SUCESS_CREATED_ITEM,
    SUCCESS_UPDATE_ITEM
}