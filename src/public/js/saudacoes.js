function Dt() {
    const DATE = new Date
    const Hr = DATE.getHours()
    const Min = DATE.getMinutes()
    const Dia = DATE.getDate()
    const Mes = DATE.getMonth()
    const Ano = DATE.getUTCFullYear()
    const formataHora = (Hora) => Hora < 10 ? '0' + Hora : Hora

    var tela = document.querySelector('#DATE')
    tela.innerHTML = `<h5>Horas: <strong>${formataHora(Hr)}:${formataHora(Min)}</strong> <i class="fa fa-clock-o"></i></h5>`
    var tela2 = document.querySelector('#DATE_One')
    tela2.innerHTML = `<h6>Data: <strong>${formataHora(Dia)}/${formataHora(Mes+1)}/${Ano}</strong> <i class="fa fa fa-calendar-o"></i></h6>`
}

window.onload = function() {
    Dt()
    setInterval(() => Dt(), 60000)
}