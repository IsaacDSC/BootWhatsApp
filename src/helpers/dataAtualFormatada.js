function dataAtualFormatada(){
    const formataHora = (Hora) => Hora < 10 ? '0' + Hora : Hora
    let data = new Date(),
        dia  = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0'+dia : dia,
        mes  = (data.getMonth()+1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0'+mes : mes,
        anoF = data.getFullYear();
        Hr = data.getHours()
        Min = data.getMinutes()
        
    return diaF+"/"+mesF+"/"+anoF+ " " +formataHora (Hr)+":"+formataHora(Min);
}


exports.dataAtualFormatada=dataAtualFormatada