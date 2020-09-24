google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawVisualization);

function drawVisualization() {
    // Some raw data (not necessarily accurate)
    var data = google.visualization.arrayToDataTable([
        ['Month', 'Atendimento', 'Cancelados', 'Despesas', 'Lucro', 'Clientes', 'Linha'],
        ['Jan', 165, 938, 522, 998, 450, 614.6],
        ['Fev', 165, 938, 522, 998, 450, 614.6],
        ['Mar', 135, 1120, 599, 1268, 288, 682],
        ['Abr', 157, 1167, 587, 807, 397, 623],
        ['Mai', 139, 1110, 615, 968, 215, 609.4],
        ['Jun', 139, 1110, 615, 968, 215, 609.4],
        ['Jul', 139, 1110, 615, 968, 215, 609.4],
        ['Ago', 139, 1110, 615, 968, 215, 609.4],
        ['Set', 139, 1110, 615, 968, 215, 609.4],
        ['Out', 139, 1110, 615, 968, 215, 609.4],
        ['Nov', 139, 1110, 615, 968, 215, 609.4],
        ['Dez', 139, 1110, 615, 968, 215, 609.4],
    ]);

    var options = {
        title: 'Dados da Empresa',
        vAxis: { title: '' },
        hAxis: { title: 'Mensal' },
        seriesType: 'bars',
        series: { 5: { type: 'line' } }
    };

    var chart = new google.visualization.ComboChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}