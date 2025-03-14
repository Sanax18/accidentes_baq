
document.getElementById('addSensorForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const sensorName = document.getElementById('sensorName').value;
    const sensorReference = document.getElementById('sensorReference').value;
    
    
    axios.post('https://api-tmom.onrender.com/add_sensor', {
        sensor_name: sensorName,
        sensor_reference: sensorReference
    })
    .then(function(response) {
        console.log(response.data.message);
        document.getElementById('successMessage').style.display = 'block';
        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
            document.getElementById('sensorModal').classList.remove('show');
            document.body.classList.remove('modal-open');
            document.querySelector('.modal-backdrop').remove();
            document.getElementById('sensorName').value = '';
            document.getElementById('sensorReference').value = '';
        }, 2000);

        
        addSensorCard(sensorName, sensorReference);
    })
    .catch(function(error) {
        console.error(error);
    });
});


function addSensorCard(name, reference) {
    const sensorCards = document.getElementById('sensorCards');
    const newCard = `
        <div class="col-xl-3 col-md-6">
            <div class="card bg-info text-white mb-4">
                <div class="card-body">${name}</div>
                <div class="card-footer d-flex align-items-center justify-content-between">
                    <span>Referencia: ${reference}</span>
                </div>
            </div>
        </div>
    `;
    sensorCards.innerHTML += newCard;
}


