function validarlogin() {
    const correo = document.getElementById('txtcorreo').value.trim();
    const password = document.getElementById('txtpassword').value.trim();

    if (correo === "" || password === "") {
        Swal.fire('Error', 'Por favor ingresa ambos campos', 'error');
        return;
    }

    axios.post('https://api-tmom.onrender.com/login', {
        correo: correo,
        password: password
    })
    .then(function (response) {
        const data = response.data;

        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userRole', data.rol);
            localStorage.setItem('userId', data.id); 

            if (data.rol === 'admin') {
                Swal.fire('Éxito', 'Bienvenido al panel de administración', 'success').then(() => {
                    window.location.href = 'index.html'; 
                });
            } else if (data.rol === 'usuario') {
                Swal.fire('Éxito', 'Bienvenido al panel de usuario', 'success').then(() => {
                    window.location.href = 'index.html';  
                });
            } else {
                Swal.fire('Error', 'Rol no reconocido', 'error');
            }
        } else {
            Swal.fire('Error', 'Correo o contraseña incorrectos', 'error');
        }
    })
    .catch(function (error) {
        console.error('Error al hacer login:', error);
        Swal.fire('Error', 'Ocurrió un problema al iniciar sesión', 'error');
    });
}


document.addEventListener('DOMContentLoaded', function() {
    
    const userRole = localStorage.getItem('userRole');
    
    console.log('Rol del usuario:', userRole);
    
    if (userRole && userRole !== 'admin') {
        
        const tableroLink = document.getElementById('tableroLink');
        if (tableroLink) {
            tableroLink.style.display = 'none';
        } else {
            console.error('Elemento con ID "tableroLink" no encontrado.');
        }

        // Ocultar el enlace de Usuarios
        const usuariosLink = document.getElementById('usuariosLink');
        if (usuariosLink) {
            usuariosLink.style.display = 'none';
        } else {
            console.error('Elemento con ID "usuariosLink" no encontrado.');
        }
    }
});

function logout() {
    const token = localStorage.getItem('token'); 
    axios.post('https://api-tmom.onrender.com/logout', {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.data.message) {
            alert(response.data.message); 
            localStorage.removeItem('token'); 
            window.location.href = 'login.html'; 
        }
    })
    .catch(error => {
        console.error("Error al cerrar sesión:", error);
        alert('Error al cerrar sesión.'); 
    });
}

document.addEventListener('DOMContentLoaded', function () {
    
    const token = localStorage.getItem('token'); 
    
    const isLoginPage = window.location.pathname.includes('login.html');
    
    if (!token && !isLoginPage) {
        alert('Debe iniciar sesión nuevamente.'); 
        window.location.href = 'login.html'; 
    } else if (token && !isLoginPage) {
        
        verificarToken(token);
    }
});

function verificarToken(token) {
    axios.post('https://api-tmom.onrender.com/verificar_token', {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.data.success) {
            manejarTokenInvalido();
        }
    })
    .catch(error => {
        console.error("Error verificando el token:", error);
        manejarTokenInvalido();
    });
}

function obtenerUsuarioId() {
    return localStorage.getItem('userId');
}


document.getElementById('accidenteForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const accidenteData = {
        primer_via: document.getElementById('primer_via').value,
        segunda_via: document.getElementById('segunda_via').value,
        longitud: document.getElementById('longitud').value,
        latitud: document.getElementById('latitud').value,
        tipo_accidente: document.getElementById('tipo_accidente').value,
        condicion_victima: document.getElementById('condicion_victima').value,
        sexo_victima: document.getElementById('sexo_victima').value,
        gravedad_victima: document.getElementById('gravedad_victima').value,
        edad_victima: parseInt(document.getElementById('edad_victima').value),
        cantidad_victimas: parseInt(document.getElementById('cantidad_victimas').value),
        desvios: document.getElementById('desvios').value,
        id_usuario: obtenerUsuarioId() 
    };

    try {
        const response = await axios.post('https:/api/registrar-accidente', accidenteData);

        if (response.status === 200) {
            alert('Accidente registrado exitosamente');
            document.getElementById('accidenteForm').reset(); 
        } else {
            alert('Error al registrar el accidente');
        }
    } catch (error) {
        console.error('Error al enviar los datos:', error);
        alert('Ocurrió un error al intentar registrar el accidente');
    }
});









