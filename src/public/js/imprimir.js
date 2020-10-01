function imprimir(div) {
    var pegarDados = document.querySelector('#imprimir')
    console.log(pegarDados)
    document.write(`
    <!DOCTYPE html>
    <html lang="pt-br">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Imprimir Comanda</title>
    </head>

    <body>
        ${pegarDados}
    </body>

    </html>
    `)
        // var janela = window.open('', '', 'width=800, heigth=600')

    // janela.document.write(`
    //     <!DOCTYPE html>
    // <html lang="pt-br">

    // <head>
    //     <meta charset="UTF-8">
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //     <title>Imprimir Comanda</title>
    // </head>

    // <body>
    //     ${pegarDados}
    // </body>

    // </html>

    //     `)
    // janela.document.close()
    // janela.print()
}