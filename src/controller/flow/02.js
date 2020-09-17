require('module-alias/register')
const banco = require('@data/user/user')
const escolha = require("@data/escolha");
const setStage = require('@helpers/setStage')
const getMenu = require('@helpers/getMenu');
const cadastardb = require('../../helpers/02.cadastrarDB')
const enviaParaFrontend = require('../../server')
const formataReal = require('@helpers/formataReal')
const connection = require('@database/configSQL')
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

let valorTotalSemTaxaEntrega
async function execute(user, msg, contato) {

    valorTotalSemTaxaEntrega = 0
    let menu
    await getMenu.getMenu(user).then((res) => menu = res.toString())
    await escolha.db[user].itens.forEach(e => {
        valorTotalSemTaxaEntrega += e.itensEscolhido.price * e.quantity
    })
    const frase = '🔤  Se desejar, digite alguma *OBSERVAÇÃO PARA O SEU PEDIDO*.\n\n───────────────\n[ N ] NÃO TENHO OBSERVAÇÃO'
    const frase1 = 'Se desejar, digite alguma *OBSERVAÇÃO PARA O AGENDAMENTO DO SEU PEDIDO*.\n\nPor exemplo: dia e horário que deseja agendar.\n\n───────────────\n*[ N ]* CONTINUAR SEM OBSERVAÇÃO'


    if (msg.toUpperCase() === "V" && key == 0) {
        escolha.db[user].escolha = []
        setStage.envStageDb(user, 1)
        banco.db[user].stage = 1;
        return [menu];
    }
    if (msg.toUpperCase() === "V" && key == 1) {
        key = 0
        return ["👏  *Está quase no final.*\nVamos definir os dados de entrega e o pagamento.", ' 🔢  Como deseja receber o pedido:\n\n*[ 1 ]* ENTREGAR NO ENDEREÇO\n*[ 2 ]* RETIRAR NO BALCAO\n*[ 3 ]* COMER AQUI NO LOCAL\n*[ 4 ]* AGENDAR A RETIRADA\n\n───────────────\n*[ V ]* MENU ANTERIOR'];
    }
    //se a msg digitada é diferente da quantidade de opçoes
    if (msg > 4 && key == 0) {
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
        return ['Como você deseja *pagar*?\nValor total com taxa de entrega: *' + formataReal.dinheiroReal(valorTotalSemTaxaEntrega) + '*\n\n*[ 1 ]*  DINHEIRO\n*[ 2 ]*  CARTAO DE CREDITO\n*[ 3 ]*  CARTAO DE DEBITO\n\n───────────────']
    }
    //trata o item acima
    if (key == 3 && msg > 3) {
        return ['Opção De Pagamento Invalida']
    }
    if (key == 3 && msg == 2) {
        //  cadastardb.EnvPaymentNote(user, observacao, formaPagamento)
        key = 5
        formaPagamento = 'CARTAO DE CREDITO'
        return [frase]
    }
    if (key == 3 && msg == 3) {
        //    cadastardb.EnvPaymentNote(user, observacao, formaPagamento)
        key = 5
        formaPagamento = 'CARTAO DE DEBITO'
        return [frase]
    }
    if (key == 3 && msg == 1) {
        //    cadastardb.EnvPaymentNote(user, observacao, formaPagamento)
        key = 4
        formaPagamento = 'Dinheiro'
        return ['💰  ' + valorTotalSemTaxaEntrega + '  = valor total com a taxa de entrega.\n\nPrecisa de troco para quanto?\nPor exemplo: troco para 50\n\n*[ N ]* NÃO PRECISA DE TROCO']
    }
    if (key == 4 && msg.toUpperCase() == "N") {
        trocoPara = "Não Precisa De Troco"
        key = 5
        return [frase]
    }
    //também tratar se o troco é menor que o valor do pedido
    if (key == 4 && msg.split("").filter(n => (Number(n) || n == 0)).join("") < valorTotalSemTaxaEntrega || key == 4 && !Number(msg.split("").filter(n => (Number(n) || n == 0)).join(""))) {

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
        let end = ''
        let obs = ''
            //pagamento
        let pgm = ''
        let product
        observacao = msg
        if (msg.toUpperCase() != 'N') {
            obs = '\n' + observacao
        }
        if (endereco) {
            end = '\n' + endereco
        }
        if (formaPagamento) {
            pgm = '*Pagamento:*' + formaPagamento + '\n'
        }
        key = 6

        async function getProdutos() {
            let renderProdutos = ''
                //Cardapio Obtido Do Banco de Dados só Obtem as classes
            await escolha.db[user].itens.forEach((e) => {
                return renderProdutos += '\n*' + e.class.toUpperCase() + '*\n' + e.itensEscolhido.name + '\n```' + e.quantity + ' X ' + e.itensEscolhido.price + '``` = ```' + e.itensEscolhido.price * e.quantity + '```\n'
            })
            return renderProdutos
        }
        await getProdutos().then(res => product = res.toString())

        return ['' + escolha.db[user].nome + '\n' + dadosEntrega + '' + end + obs + '\n\n*[ PRODUTOS ]*\n' + product + '\n' + pgm + '*Total produto:* ' + formataReal.dinheiroReal(valorTotalSemTaxaEntrega) + '\nTaxa entrega: R$ 0,00\n*Total do pedido: ' + formataReal.dinheiroReal(valorTotalSemTaxaEntrega) + '*\n\nTel: ' + contato + ' WHATSAPP\nSeq: 2 | 14/09/2020 16:26\nStatus: Cliente novo', '*Etapa final.*\n\n*[ OK ] PARA CONFIRMAR O PEDIDO*\n*[ C ]* PARA CORRIGIR O PEDIDO']
    }
    if (key == 6 && msg.toUpperCase() == 'C') {
        //key 7 ainda não feita
        key = 7
        return ['📝  *ABAIXO O QUE JÁ ESCOLHEU:*\n\n*[ 1 ] LANCHES*\n```COMBO LANCHE + BEBIDA```\n```5 X 23,00``` = ```115,00```\n\n*Parcial do pedido R$ 115,00*\n\n_Digite o número que é para apagar_\n\n───────────────\n*[ F ]* PARA FECHAR O PEDIDO\n*[ E ]* ESCOLHER OUTRO PRODUTO']
    }
    //Sai do fluxo
    if (key == 6 && msg.toUpperCase() == 'OK') {
        //socket io

        //console.log(escolha.db[user])
        async function EnviarRequest() {
            await escolha.db[user].itens.forEach(e => {
                console.log(e)
                if (!formaPagamento) {
                    let sql = `INSERT INTO menu_requests ('MenuNameId', 'UserId',profit, spent, createdAt ) VALUES ('${e.id}','1', ${e.profit}, ${e.spent}, ${Date.now()});`
                    connection.connection.query(sql, (err, result) => {
                        console.log(result)
                    })
                } else {
                    let sql = `insert into menu_requests (MenuNameId,UserId,quantity,status,profit, spent, createdAt,updatedAt) values (${e.id},'1','1','0','${e.profit}','${e.spent}','${Date.now()}','${Date.now()}');`
                    connection.connection.query(sql, (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log("Enviado menu_requests:  " + result)
                        }
                    })
                }
            })
        }
        EnviarRequest()

        key = 7
        enviaParaFrontend.enviaParaFrontend({
            name: escolha.db[user].name,
            telephone: user,
            total: valorTotalSemTaxaEntrega,
            OrderTime: 3,
            Address: endereco,
            formaPagamento,
            request: escolha.db[user].itens,
        })
        return ['✅  Seu pedido foi *realizado*.\n\nObrigado por realizar seu pedido.\n\n```Desenvolvido por Matheus & IsaacDSC```']
    }
    if (key == 6) {
        return ['Você precisa digitar *OK* para que eu possa preparar seu pedido.']
    }

}



exports.execute = execute;