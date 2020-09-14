require('module-alias/register')
const banco = require('@data/user/user')
const User = require('@models/Users')
const escolha = require("@data/escolha");
const setStage = require('@helpers/setStage')
const getMenu = require('@helpers/getMenu');
const cadastardb = require('../../helpers/02.cadastrarDB')

key = 0

//Guarda o endereço
let endereco;
//guarda o valor do troco
let trocoPara;
//guarda a forma de pagamento Ex:Dinheiro
let formaPagamento;
//EX: "RETIRAR NO BALCAO" ,"Entregar"
let dadosEntrega;
//A observação do produto
let observacao;

async function execute(user, msg) {

    let menu
    await getMenu.getMenu().then((res) => menu = res.toString())

    const frase = '🔤  Se desejar, digite alguma *OBSERVAÇÃO PARA O SEU PEDIDO*.\n\n───────────────\n[ N ] NÃO TENHO OBSERVAÇÃO'
    const frase1 = 'Se desejar, digite alguma *OBSERVAÇÃO PARA O AGENDAMENTO DO SEU PEDIDO*.\n\nPor exemplo: dia e horário que deseja agendar.\n\n───────────────\n*[ N ]* CONTINUAR SEM OBSERVAÇÃO'

    if (msg.toUpperCase() === "V" && key == 0) {
        escolha.db = []
        setStage.envStageDb(user, 1)
        banco.db[user].stage = 1;
        return [menu];
    }
    if (msg.toUpperCase() === "V" && key == 1) {
        key = 0
        return ["👏  *Está quase no final.*\nVamos definir os dados de entrega e o pagamento.", ' 🔢  Como deseja receber o pedido:\n\n*[ 1 ]* ENTREGAR NO ENDEREÇO\n*[ 2 ]* RETIRAR NO BALCAO\n*[ 3 ]* COMER AQUI NO LOCAL\n*[ 4 ]* AGENDAR A RETIRADA\n\n───────────────\n*[ V ]* MENU ANTERIOR'];
    }
    //se a msg digitada é diferente da quantidade de opçoes
    if (msg > 4) {
        return ['Opção Invalida escolha dentre esses numeros']
    }


    //If 2 RETIRAR NO BALCAO
    if (msg == 2 && key == 0) {
        key = 5
        dadosEntrega = "RETIRAR NO BALCAO"
        return [frase1]
    }
    //If 2 COMER AQUI NO LOCAL
    if (msg == 3 && key == 0) {
        dadosEntrega = "COMER AQUI NO LOCAL"
        key = 5
        return [frase1]
    }
    //If 2 AGENDAR A RETIRADA
    if (msg == 4 && key == 0) {
        dadosEntrega = "AGENDAR A RETIRADA"
        key = 5
        return [frase1]
    }

    //If 1 ENtregar no endereço
    //Cadastra o endereço
    if (msg == 1 && key == 0 || key == 2 && msg == 2) {
        dadosEntrega = 'ENTREGAR NO ENDEREÇO'
        key = 1
        return ['🏠  Digite seu endereço (nome da rua, número, complemento e ponto de referência) para entregar.\n\n───────────────\n*[ V ]* MENU ANTERIOR']
    }
    //endereço muito pequeno trata o endereço
    if (key == 1 && msg.length < 10) {

        return ['*O endereço está muito curto.*\nPreciso que digite *endereço* completo, com número e ponto de referência.\n\n───────────────\n*[ V ]* MENU ANTERIOR']
    }

    if (key == 1) {
        key = 2
        endereco = msg
        cadastardb.EnvAddressDb(user, endereco)
        return ['🏠  É para entregar no endereço abaixo?\n\n' + msg.toUpperCase() + '\n\n───────────────\n*[ 1 ]* CONFIRMAR ENDEREÇO 👈\n*[ 2 ]* ALTERAR O ENDEREÇO']
    }

    if (key == 2 && msg > 2) {
        return ['Opção Invalida']
    }

    //Manda o endereço para o Banco de Dados
    if (key == 2 && msg == 1) {

        key = 3
        return ['Como você deseja *pagar*?\nValor total com taxa de entrega: *R$ 11,00*\n\n*[ 1 ]*  DINHEIRO\n*[ 2 ]*  CARTAO DE CREDITO\n*[ 3 ]*  CARTAO DE DEBITO\n\n───────────────']
    }
    //trata o item acima
    if (key == 3 && msg > 3) {
        return ['Opção De Pagamento Invalida']
    }
    if (key == 3 && msg == 2) {
        cadastardb.EnvPaymentNote(user, observacao, formaPagamento)
        key = 5
        formaPagamento = 'CARTAO DE CREDITO'
        return [frase]
    }
    if (key == 3 && msg == 3) {
        cadastardb.EnvPaymentNote(user, observacao, formaPagamento)
        formaPagamento = 'CARTAO DE DEBITO'
        key = 5
        return [frase]
    }
    if (key == 3 && msg == 1) {
        cadastardb.EnvPaymentNote(user, observacao, formaPagamento)
        key = 4
        formaPagamento = 'Dinheiro'
        return ['💰  11,00  = valor total com a taxa de entrega.\n\nPrecisa de troco para quanto?\nPor exemplo: troco para 50\n\n*[ N ]* NÃO PRECISA DE TROCO']
    }
    if (key == 4 && msg.toUpperCase() == "N") {
        trocoPara = "Não Precisa De Troco"
        key = 5
        return [frase]
    }
    //também tratar se o troco é menor que o valor do pedido
    if (key == 4 && msg.split("").filter(n => (Number(n) || n == 0)).join("") < 50 || key == 4 && !Number(msg.split("").filter(n => (Number(n) || n == 0)).join(""))) {

        return ["Por favor Informe Um troco Valido"]
    }
    //Pega o valor do troco 
    if (key == 4) {
        trocoPara = msg.split("").filter(n => (Number(n) || n == 0)).join("")
        key = 5
        return [frase]
    }



    //Mostra o pedido
    //Passar a key 5 e 6 para o estagio 3
    if (key == 5) {
        observacao = msg

        key = 6
        return ['Mostra o pedido']
    }
    if (key == 6 && msg.toUpperCase() == 'C') {
        return ['Corrigi O produto']
    }
    //Finalizar Boot para o cliente
    if (key == 6 && msg.toUpperCase() == 'OK') {
        return ['Seu pedido foi realizado com sucesso']
    }
    if (key == 6) {
        return ['Comando Invalido Digite Ok ou C']
    }

    if (msg === "*") {
        setStage.envStageDb(user, 0)

        banco.db[user].stage = 0;
        banco.db[user] = ""
        return ["Pedido cancelado com sucesso"];
    }

    if (msg === "#") {
        setStage.envStageDb(user, 3)

        banco.db[user].stage = 3;
        return ["Digite o endereço completo por favor :"];
    }

    let resumo = "  RESUMO DO PEDIDO \n";
    let total = 0;
    //Pegar esses itens do Banco de Dados
    banco.db[user].itens.forEach((value) => {
        console.log(value);
        resumo += `${value.descricao} --- ${value.preco} \n`;

        total += value.preco;
    });

    resumo += "-------------------------\n";
    resumo += ` Total R$ ${total}`;

    return [resumo, "Para confirmar digite # ou para cancelar digite * "];
}

exports.execute = execute;