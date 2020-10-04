var ctx = document.getElementById('grafico').getContext('2d');

$('document').ready(function(){
   let item = []
   let quantidade = []
$.ajax({
    type: "POST",
    url: '/dados/grafico',
    success: function(data){
         data.forEach(e => {
            item.push( e.name)
            quantidade.push(e.quantidade)
         })
    }
  }).then(()=>renderGrafico(item,quantidade))

})

function renderGrafico(item,quantidade){
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: item,
        datasets: [{
            label: 'ITENS MAIS VENDIDOS',
            data: quantidade,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
})}