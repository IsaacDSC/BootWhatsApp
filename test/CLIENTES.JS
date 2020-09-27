function clientes(LimitePesquisa, parametro, total_clientes) {
    for (let i = LimitePesquisa; i <= total_clientes; i += parametro) {
        console.log(i)
            //console.log(i * 10)
    }
}
clientes(10, 10, 100)