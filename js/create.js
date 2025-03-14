function crearUsuario() {
    event.preventDefault(); 

    const formData = new FormData(document.getElementById('createUserForm')); 

    const data = {
        primer_nombre: formData.get('primer_nombre'),
        segundo_nombre: formData.get('segundo_nombre'),
        primer_apellido: formData.get('primer_apellido'),
        segundo_apellido: formData.get('segundo_apellido'),
        email: formData.get('email'),
        password: formData.get('pass'),
        rol: formData.get('rol')
    };

    axios.post('https://api-tmom.onrender.com/crear_usuario', data)
        .then(response => {
            // Mostrar animación de éxito usando SweetAlert
            Swal.fire({
                icon: 'success',
                title: 'Usuario creado exitosamente!',
                showConfirmButton: false,
                timer: 1500
            });

            // Resetear el formulario
            document.getElementById('createUserForm').reset();  
        })
        .catch(error => {
            if (error.response && error.response.status === 409) {
                // Mostrar mensaje de error si el correo ya está registrado
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'El correo ya está registrado!',
                });
            } else {
                console.error('Error creando usuario:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al crear el usuario.',
                });
            }
        });
}

function eliminarUsuario(event) {
    event.preventDefault();
    const correo = document.getElementById('deleteCorreo').value;
    if (correo) {
        axios.delete(`https://api-tmom.onrender.com/eliminar_usuario/${correo}`)
            .then(function (response) {
                if (response.data.success) {
                    
                    Swal.fire(
                        'Eliminado',
                        'El usuario ha sido eliminado con éxito',
                        'success'
                    );
                    document.getElementById('deleteUserForm').reset();
                } else {
                    
                    Swal.fire(
                        'No encontrado',
                        'El correo ingresado no corresponde a ningún usuario',
                        'error'
                    );
                }
            })
            .catch(function (error) {
                
                Swal.fire(
                    'Error',
                    'Hubo un problema al eliminar el usuario',
                    'error'
                );
            });
    } else {
        Swal.fire(
            'Error',
            'Por favor ingrese un correo válido',
            'error'
        );
    }
}



function buscarUsuario() {
    const correo = document.getElementById('searchCorreo').value;

    axios.get(`https://api-tmom.onrender.com/obtener_usuario/${correo}`)
        .then(response =>  {
            
            if (response.data.success) {

                const usuario = response.data.usuario;

                // Llenar los datos del usuario en el modal de edición
                document.getElementById('editprimerNombre').value = usuario.primer_nombre;
                document.getElementById('editsegundoNombre').value = usuario.segundo_nombre;
                document.getElementById('editprimerApellido').value = usuario.primer_apellido;
                document.getElementById('editsegundoApellido').value = usuario.primer_apellido;
                document.getElementById('editCorreo').value = usuario.correo; // readonly, no editable
                document.getElementById('editPassword').value = usuario.password;
                
                // Cerrar el modal de búsqueda
                const searchUserModal = bootstrap.Modal.getInstance(document.getElementById('searchUserModal'));
                searchUserModal.hide();
                
                // Limpiar el campo de búsqueda
                document.getElementById('searchCorreo').value = '';

                // Abrir el modal de edición
                const editUserModal = new bootstrap.Modal(document.getElementById('editUserModal'));
                editUserModal.show();
                
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Usuario no encontrado',
                    text: 'No existe un usuario registrado con este correo.',
                });
            }
        })
        .catch(function (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al buscar el usuario.',
            });
        });
}




function guardarCambios(event) {
    event.preventDefault();
    const primer_nombre = document.getElementById('editprimerNombre').value;
    const segundo_nombre = document.getElementById('editsegundoNombre').value;
    const primer_apellido = document.getElementById('editprimerApellido').value;
    const segundo_apellido = document.getElementById('editsegundoApellido').value;
    const correo = document.getElementById('editCorreo').value; 
    const password = document.getElementById('editPassword').value;

    axios.put(`https://api-tmom.onrender.com/actualizar_usuario`, {
        primer_nombre: primer_nombre,
        segundo_nombre: segundo_nombre,
        primer_apellido: primer_apellido,
        segundo_apellido: segundo_apellido,
        correo: correo,
        password: password,
    })
    .then(function (response) {
        Swal.fire({
            icon: 'success',
            title: 'Cambios guardados',
            text: 'Los datos del usuario han sido actualizados correctamente.',
        });

        // Cerrar el modal de edición
        const editUserModal = new bootstrap.Modal(document.getElementById('editUserModal'));
        editUserModal.hide();
    })
    .catch(function (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema al guardar los cambios del usuario.',
        });
    });
}


