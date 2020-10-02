function imprimir(div) {
  const conteudo= $(div).parent().parent().parent().html()

  let telaImpressao = window.open('', '', 'width=800, heigth=600');

telaImpressao.document.write(conteudo);
telaImpressao.window.print();
telaImpressao.window.close();
}