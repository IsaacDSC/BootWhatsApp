const fs = require('fs');
const venom = require('venom-bot');

//dependencies files.js 
const banco = require('@data/user/user') //arquivo que contem o USER e o stagio que ele se encontra
const stages = require('@data/stages') //arquivo com a desc e o apontamento para os arquivo de messages seguindo por stagios
const cardapio = require('@data/cardapio/cardapio')

//Models
const User = require('@models/Users');

function main() {

    venom.create('Delivery', (base64Qr, asciiQR) => {
        // Mostra o Qr Code no Terminal
        console.log(asciiQR);

        // Cria o arquivo png
        exportQR(base64Qr, 'public/images/qrCode.png');
    }).then((client) => start(client));

    function exportQR(qrCode, path) {
        qrCode = qrCode.replace('data:image/png;base64,', '');
        const imageBuffer = Buffer.from(qrCode, 'base64');
        fs.writeFileSync(path, imageBuffer);
    }

    function start(client) {
        client.onMessage(async(message) => {
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
                    console.log('usuario nao cadastrado')
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
    return banco.db[user].stage
}

exports.main = main