var barColorCode = '#003366';
var pdBarColor = 'color: #003366';

// Load the Visualization API and the corechart package.
google.charts.load('45', { 'packages': ['corechart'], 'language': 'pl' });

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

    // Create the data table.
      var data = google.visualization.arrayToDataTable([
        ['', 'Value01', { role: "style" }, 'Value02', 'Value03'],
        ['', 404355, '#68737a', 43006, 120540],
        ['', 430188, '#cc0000', 'a', 'a']
      ]);

    var view = new google.visualization.DataView(data);
        view.setColumns(
            [0, 1, {
                calc: 'stringify',
                sourceColumn: 1,
                type: "string",
                role: "annotation"
            }, 2, 
            3, {
                calc: 'stringify',
                sourceColumn: 3,
                type: "string",
                role: "annotation"
            },
            4, {
                calc: 'stringify',
                sourceColumn: 4,
                type: "string",
                role: "annotation"
            }
            ]);


    // Set chart options
      var options = {
        enableInteractivity: false,
        bar: { groupWidth: "100%" },
        title: 'koniec 20. roku polisy',
        width: '100%',
        height: 80,
        chartArea: {height: '400', width: '100%', left: 75, top: 25},
        isStacked: true,
        hAxis: {
            gridlines: {
                count: 0
            },
            title: 'test'
        },
        annotations: {
            style: 'point'
        },
        legend: {
            position: 'none'
        },
        colors: ['#8ed1e4', '#003366']
      };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.BarChart(document.getElementById('premium-last-month-chart1__div'));
    chart.draw(view, options);
}