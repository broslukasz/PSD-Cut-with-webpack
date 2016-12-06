var barColorCode = '#003366'

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
        ["Wartość w złotych", "Lata umowy"],
        ['1', 1199],
        ['2', 2495],
        ['3', 3897],
        ['4', 5931],
        ['5', 6998],
        ['6', 8176],
        ['7', 10503],
        ['8', 12503],
        ['10 (...)', 16787],
        ['15', 29890],
        ['18', 39493],
        ['koniec 20. roku polisy', 'a']
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
        {
            calc: 'stringify',
            sourceColumn: 1,
            type: "string",
            role: "annotation"
        }
        ]);

    // Set chart options
    var options = {
        enableInteractivity: false,
        width: 2000,
        height: 550,
        chartArea: {
            right: 75
        },
        bar: { groupWidth: "30%" },
        legend: {
            position: 'none'
        },
        annotations: {
            alwaysOutside: true,
            stem: {
                length: 10,
                color: 'white'
            }
        },
        vAxis: {
             gridlines: { count: 3 },
             title: 'Wartość w złotych',
             textColor: 'grey'
        },
        colors: [barColorCode]
    };

    var optionsDesktop = {
        enableInteractivity: false,
        width: '100%',
        height: 250,
        chartArea: {
            right: 75
        },
        bar: { groupWidth: "30%" },
        legend: {
            position: 'none'
        },
        annotations: {
            alwaysOutside: true,
            stem: {
                length: 10,
                color: 'white'
            }
        },
        vAxis: {
             gridlines: { count: 3 },
             title: 'Wartość w złotych',
             textColor: 'grey'
        },
        colors: [barColorCode]
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ColumnChart(document.getElementById('month-premium-chart__div'));
    chart.draw(view, options);
    
    var chart = new google.visualization.ColumnChart(document.getElementById('month-premium-chart__div-desktop'));
    chart.draw(view, optionsDesktop);
}