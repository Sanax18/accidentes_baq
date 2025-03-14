document.addEventListener("DOMContentLoaded", () => {
    const chartOptions = {
        type: 'bar',
        data: {}, 
        options: { responsive: true }
    };

    
    const ctx1 = document.getElementById('accidentChart1').getContext('2d');
    axios.get('/api/accident_data?chart=1').then(response => {
        chartOptions.data = response.data;
        new Chart(ctx1, chartOptions);
    });

    const ctx2 = document.getElementById('accidentChart2').getContext('2d');
    axios.get('/api/accident_data?chart=2').then(response => {
        chartOptions.data = response.data;
        new Chart(ctx2, chartOptions);
    });

    const ctx3 = document.getElementById('accidentChart3').getContext('2d');
    axios.get('/api/accident_data?chart=3').then(response => {
        chartOptions.data = response.data;
        new Chart(ctx3, chartOptions);
    });
});
