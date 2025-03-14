document.getElementById('formReporte').addEventListener('submit', function(e) {
    e.preventDefault();
    
    
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
    const nombreSensor = document.getElementById('nombreSensor').value;

    
    axios.post('https://api-tmom.onrender.com/consultar_reportes', {
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        nombreSensor: nombreSensor
    })
    .then(function(response) {
        const resultados = response.data;

        
        const tbody = document.getElementById('tablaResultados').querySelector('tbody');
        tbody.innerHTML = ''; 
        resultados.forEach(result => {
            const row = `<tr>
                            <td>${result.nombreSensor}</td>
                            <td>${result.valor}</td>
                            <td>${result.fecha}</td>
                        </tr>`;
            tbody.insertAdjacentHTML('beforeend', row);
        });

        $('#resultadosModal').on('hidden.bs.modal', function () {
            if ($.fn.dataTable.isDataTable('#tablaResultados')) {
                $('#tablaResultados').DataTable().clear();  
                $('#tablaResultados').DataTable().destroy();  
            }
        });

        
        const modal = new bootstrap.Modal(document.getElementById('resultadosModal'));
        modal.show();

        $('#tablaResultados').DataTable({
            "paging": true,
            "searching": true,
            "ordering": true,
            "info": true,
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.11.5/i18n/Spanish.json"
            }
        });
    })
    .catch(function(error) {
        console.error(error);
        Swal.fire('Error', 'No se pudieron obtener los reportes.', 'error');
    });
});

document.getElementById('descargarPDF').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.text('Resultados del Sensor', 10, 10);

    const tabla = document.getElementById('tablaResultados');
    doc.autoTable({ html: '#tablaResultados' });

    
    doc.save('reportes sensor.pdf');
});


document.getElementById('consultarTodos').addEventListener('click', function () {
    axios.get('https://api-tmom.onrender.com/sensores_todos')
        .then(function (response) {
            const datos = response.data;
            const tablaResultados = document.getElementById('tablaResultados').getElementsByTagName('tbody')[0];

            
            tablaResultados.innerHTML = '';

            
            datos.forEach(function (sensor) {
                const fila = tablaResultados.insertRow();
                const celdaNombreSensor = fila.insertCell(0); 
                const celdaValor = fila.insertCell(1);
                const celdaFecha = fila.insertCell(2);

                celdaNombreSensor.textContent = sensor.sensor;
                celdaValor.textContent = sensor.valor;
                celdaFecha.textContent = sensor.fecha;
            });

            $('#resultadosModal').on('hidden.bs.modal', function () {
                if ($.fn.dataTable.isDataTable('#tablaResultados')) {
                    $('#tablaResultados').DataTable().clear();  
                    $('#tablaResultados').DataTable().destroy();  
                }
            });

            
            const modal = new bootstrap.Modal(document.getElementById('resultadosModal'));
            modal.show();

            $('#tablaResultados').DataTable({
                "paging": true,
                "searching": true,
                "ordering": true,
                "info": true,
                "language": {
                    "url": "//cdn.datatables.net/plug-ins/1.11.5/i18n/Spanish.json"
                }
            });
        })
        .catch(function (error) {
            console.error('Error al obtener los datos:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al obtener los datos de los sensores.'
            });
        });
});