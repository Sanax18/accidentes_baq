function mostrarHistorial(sensorId) {
    
    fetch(`https://api-tmom.onrender.com/historial?sensor=${sensorId}`)
        .then(response => response.json())
        .then(data => {
            
            const historialBody = document.getElementById('historialBody');
            historialBody.innerHTML = '';

            
            data.forEach(item => {
                const row = `<tr>
                                <td>${item.fecha}</td>
                                <td>${item.valor}</td>
                            </tr>`;
                historialBody.innerHTML += row;
            });

            $('#historialModal').on('hidden.bs.modal', function () {
                if ($.fn.dataTable.isDataTable('#historialTable')) {
                    $('#historialTable').DataTable().clear();  
                    $('#historialTable').DataTable().destroy();  
                }
            });

           
            const historialModal = new bootstrap.Modal(document.getElementById('historialModal'));
            historialModal.show();

            // Inicializar DataTables después de agregar los datos
            $('#historialTable').DataTable({
                "paging": true,
                "searching": true,
                "ordering": true,
                "info": true,
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.11.5/i18n/Spanish.json" 
                }
            });

        })
        .catch(error => {
            console.error('Error al obtener el historial:', error);
        });
}


document.addEventListener('DOMContentLoaded', function() {
    
    const sensores = [
        { id: 1, elementId: 'valor_dht11_T' },
        { id: 2, elementId: 'valor_mq7' },
        { id: 3, elementId: 'valor_pir' },
        { id: 4, elementId: 'valor_hc-sr04' },
        { id: 5, elementId: 'valor_ldr' },
        { id: 6, elementId: 'valor_dht11_H' }
    ];

    sensores.forEach(sensor => {
        fetch(`https://api-tmom.onrender.com/ultimo_valor/${sensor.id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);  
                document.getElementById(sensor.elementId).innerText = data.valor;
            })
            .catch(error => {
                console.error('Error al obtener el último valor del sensor:', error);
                document.getElementById(sensor.elementId).innerText = 'Error';
            });
    });
});

