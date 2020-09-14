const fs = require('fs');
const venom = require('venom-bot');

//dependencies files.js 
const banco = require('@data/user/user') //arquivo que contem o USER e o stagio que ele se encontra
const save = require('@data/save')
const stages = require('@controller/controller') //arquivo com a desc e o apontamento para os arquivo de messages seguindo por stagios
const cardapio = require('@data/cardapio/cardapio')

//Models
const User = require('@models/Users');

function main() {
    //Adicionar browserArgs: ['--no-sandbox']

    venom.create('Delivery', (base64Qr, asciiQR) => {
        // Mostra o Qr Code no Terminal
        console.log(asciiQR);

        // Cria o arquivo png
        exportQR(base64Qr, 'qrCode.png');
    }).then((client) => start(client));

    function exportQR(qrCode, path) {
        qrCode = qrCode.replace('data:image/png;base64,', '');
        const imageBuffer = Buffer.from(qrCode, 'base64');
        fs.writeFileSync(path, imageBuffer);
    }


    function close(client) {
        client.close().then(() => console.log('boot Desativado')).catch(() => console.log('erro'))
    }


    function start(client) {
        //  setTimeout(() => close(client), 10000)
        client.onStateChange((state) => {
            console.log(state);
            const conflits = [
                venom.SocketState.CONFLICT,
                venom.SocketState.UNPAIRED,
                venom.SocketState.UNLAUNCHED,
            ];
            if (conflits.includes(state)) {
                client.useHere();
            }
        });

        client.onMessage(async (message) => {
            const user = await User.findAll({ where: { telephone: message.sender.id } })
            console.log(user.length)

            if (user.length === 0) {
                try {
                    let resposta = await stages.step[getStage(message.from)].obj.execute(
                        message.from,
                        message.body,
                        message.sender.name
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

        });
    }
}

function getStage(user) {
    if (save.db[user]) {
        //Se existir esse numero no banco de dados
        return banco.db[user].stage;
    } else {
        //Se for a primeira vez que entra e contato
        save.db[user] = {
            escolha: [],
            itens: [],

        };
        return banco.db[user].stage;
    }
}

exports.main = main