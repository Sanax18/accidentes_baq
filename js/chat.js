// Mostrar/Ocultar la ventana del chatbot al hacer clic en el botón
document.getElementById('chatbot-button').addEventListener('click', function() {
    const chatbotWindow = document.getElementById('chatbot-window');
    chatbotWindow.style.display = (chatbotWindow.style.display === 'none' || chatbotWindow.style.display === '') ? 'block' : 'none';
});

// Función para enviar el mensaje del usuario
document.getElementById('send-button').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== '') {
        addMessageToChat('Usuario: ' + userInput);
        getChatbotResponse(userInput);
        document.getElementById('user-input').value = '';
    }
});

// Añadir mensajes al cuerpo del chatbot
function addMessageToChat(message) {
    const chatbotBody = document.getElementById('chatbot-body');
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    chatbotBody.appendChild(messageElement);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

// Función para obtener la respuesta del chatbot desde la API de Rasa
async function getChatbotResponse(userMessage) {
    try {
        const response = await fetch('http://localhost:5005/webhooks/rest/webhook', {
            method: 'POST',  // Asegúrate de que sea POST
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                sender: "nombre_usuario",
                message: userMessage
            })
        });

        const data = await response.json();
        if (data && data.length > 0 && data[0].text) {
            const chatbotReply = data[0].text;
            addMessageToChat('Chatbot: ' + chatbotReply);
        } else {
            addMessageToChat('Error: No se pudo obtener una respuesta válida.');
        }
    } catch (error) {
        console.log(error);  // Mostrar el error en la consola para mayor claridad
        addMessageToChat('Error: No se pudo obtener respuesta del chatbot.');
    }
}