google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart)



function drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work', 0],
        ['Eat', 33],
        ['Eat', 22],
    ]);

    var options = {
        title: 'Cardapios mais vendidos',
        pieHole: 0.4,
    };

    var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    chart.draw(data, options);
}

exports.drawChart = drawChart