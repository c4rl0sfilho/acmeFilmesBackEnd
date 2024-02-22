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




module.exports={
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_INVALID_CONTENT
}