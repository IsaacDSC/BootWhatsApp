const fs = require('fs');
//const { create } = require('venom-bot');
const { create, Client, ev } = require('@open-wa/wa-automate');
const path = require('path')
const statusConnection = require('../helpers/statusConnection')
//dependencies files.js
const banco = require('@data/user/user') //arquivo que contem o USER e o stagio que ele se encontra
const escolha = require('@data/escolha')
const stages = require('@controller/controller') //arquivo com a desc e o apontamento para os arquivo de messages seguindo por stagios
//Models
const User = require('@models/Users');
//const public = require('@public/images')
let venom_client;
var status

let dir = path.resolve(__dirname, '..', 'public', 'images', 'qrCode.png')
let local = path.resolve(__dirname, '..', '..', 'Delivery.data.json')


const sendText = async (telephone, msg) => {
    if (!venom_client) {
        return
        //console.log('client ainda não criado!');
        //await client();
    }
    return await venom_client.sendText(telephone, msg);
}

const stopClient = async () => {
    if (venom_client) {
        //  await venom_client.close()
        await venom_client.kill()
        return venom_client = undefined
    }
    return console.log('client ainda não criado!');
}
ev.on('STARTUP.**', async (data, sessionId) => {
    console.log(data)
    if (data == 'SUCCESS') {
        statusConnection.sendStatus(true)

    }else{
        statusConnection.sendStatus(false)
    }

})


ev.on('qr.**', async qrcode => {
    const imageBuffer = Buffer.from(
        qrcode.replace('data:image/png;base64,', ''),
        'base64'
    );
    fs.writeFileSync(dir, imageBuffer);
});

const launchConfig = {
    qrTimeout: false,
    autoRefresh: true,
    inDocker:true,
    chromiumArgs: ['--no-sandbox'],
};

async function client() {
    if (venom_client) { return }
    venom_client = await create('Delivery', launchConfig)

    await start(venom_client)

}

async function start(client) {
    console.log('Iniciado Com Sucesso')
    client.onStateChanged(async state => {
        if (state == "CONFLICT" || state === "UNLAUNCHED") {
            client.forceRefocus();
        }
        console.log(state)
    })

    client.onMessage(async (message) => {

        if (!message.isGroupMsg) {
            const user = await User.findAll({ where: { telephone: message.sender.id } })
            console.log(user.length)
            if (user.length === 0) {
                try {

                    let resposta = await stages.step[getStage(message.from)].obj.execute(
                        message.from,
                        message.body,
                        message.sender.name ? message.sender.name : message.sender.pushname,

                    )
                    for (let i = 0; i < resposta.length; i++) {
                        const element = resposta[i]
                        client.sendText(message.from, element)
                    }
                    console.log('usuario cadastrado')
                    await User.create({
                        telephone: message.sender.id,
                        name: message.sender.name ? message.sender.name : message.sender.pushname,
                        photograph: message.sender.profilePicThumbObj.img,
                        stage: 0
                    }).then(() => {
                        console.log('Usuario enviado ao banco de dados com sucesso!')
                    })
                } catch (error) {
                    console.log(error)
                }

            } else {

                let resposta = await stages.step[getStage(message.from)].obj.execute(message.from, message.body, message.sender.name ? message.sender.name : message.sender.pushname)
                for (let i = 0; i < resposta.length; i++) {
                    const element = resposta[i]
                    client.sendText(message.from, element)
                }

                console.log('cadastrado')

            }
        }

    });
}


function getStage(user) {
    if (escolha.db[user]) {


        return banco.db[user].stage;
    } else {
        //Se for a primeira vez que entra e contato
        banco.db[user] = { stage: 0 }
        escolha.db[user] = {
            escolha: [],
            itens: [],
            nome: '',
            bairro: '',
            valorTaxa: 0,
            itensEscolhido: '',
            quantidaDeProdutos: '',
            productionCost: '',
            classeDoProduto: '',
            idItem: '',
            msgItem: '',
            msgItemMais: '',
            dadosEntrega: '',
            endereco: '',
            formaPagamento: '',
            trocoPara: '',
            observacao: '',
            valorTotal: 0

        };
        return banco.db[user].stage;
    }
}

exports.sendText = sendText
exports.client = client
exports.venom_client = venom_client
exports.stopClient = stopClient

/*
    venom_client = await create('Delivery', (base64Qr, asciiQR) => {
            // Mostra o Qr Code no Terminal
            console.log(asciiQR);

            // Cria o arquivo png

            exportQR(base64Qr, dir);
        },
        (statusSession) => {

            console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail
        }, {
            logQR: true, // Logs QR automatically in terminal
            browserArgs: ['--no-sandbox'], // Parameters to be added into the chrome browser instance
            autoClose: false,
        });

    function exportQR(qrCode, path) {
        qrCode = qrCode.replace('data:image/png;base64,', '');
        const imageBuffer = Buffer.from(qrCode, 'base64');
        fs.writeFileSync(path, imageBuffer);
    }


    await start(venom_client)

}
async function start(client) {
    console.log('Iniciado Com Sucesso')
    client.onStateChange((state) => {
        console.log(state);
        if (state == 'CONFLICT' || state == 'UNPAIRED' || state == 'UNLAUNCHED') {
            client.useHere();
        }
    });

    client.onMessage(async(message) => {
        if(!message.isGroupMsg){
        const user = await User.findAll({ where: { telephone: message.sender.id } })
        console.log(user.length)
        if (user.length === 0) {
            try {
                let resposta = await stages.step[getStage(message.from)].obj.execute(
                    message.from,
                    message.body,
                    message.sender.name,
                )
                for (let i = 0; i < resposta.length; i++) {
                    const element = resposta[i]
                    client.sendText(message.from, element)
                }
                console.log('usuario cadastrado')
                User.create({
                    telephone: message.sender.id,
                    name: message.sender.pushname,
                    photograph: message.sender.profilePicThumbObj.img,
                    stage: 0
                }).then(() => {
                    console.log('Usuario enviado ao banco de dados com sucesso!')
                })
            } catch (error) {
                console.log(error)
            }

        } else {

            let resposta = await stages.step[getStage(message.from)].obj.execute(message.from, message.body, message.sender.name)
            for (let i = 0; i < resposta.length; i++) {
                const element = resposta[i]
                client.sendText(message.from, element)
            }

            console.log('cadastrado')

        }
    }

    });
}


function getStage(user) {
    if (escolha.db[user]) {


        return banco.db[user].stage;
    } else {
        //Se for a primeira vez que entra e contato
        banco.db[user] = { stage: 0 }
        escolha.db[user] = {
            escolha: [],
            itens: [],
            nome: '',
            bairro: '',
            valorTaxa: 0,
            itensEscolhido: '',
            quantidaDeProdutos: '',
            productionCost: '',
            classeDoProduto: '',
            idItem: '',
            msgItem: '',
            msgItemMais: '',
            dadosEntrega: '',
            endereco: '',
            formaPagamento: '',
            trocoPara: '',
            observacao: '',
            valorTotal: 0

        };
        return banco.db[user].stage;
    }
}

exports.sendText = sendText
exports.client = client
exports.getStatus = getStatus
exports.venom_client = venom_client
exports.stopClient = stopClient*/