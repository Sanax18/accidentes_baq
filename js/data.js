Papa.parse("accidentes_completos.csv", {
    download: true,
    header: true,
    complete: function(results) {
        const data = results.data;
        
       
        const locations = [];
        const chartLabels = [];
        const chartData = [];
        
        data.forEach(row => {
           
            locations.push({
                lat: parseFloat(row.lat),
                lng: parseFloat(row.lng),
                title: row.zona,
                description: row.descripcion
            });
            chartLabels.push(row.zona);
            chartData.push(parseInt(row.accidentes));
        });
        
        initMap(locations);
        createChart(chartLabels, chartData);
    }
});




function createChart(labels, data) {
    const ctx = document.getElementById('accidentChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'n.º de Accidentes',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}




