document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const minimizeBtn = document.getElementById('minimize-btn');
    const chatContainer = document.getElementById('chat-container');

    const BACKEND_URL = 'https://ale-uy-ale-uy.hf.space/ask';

    const AVATARS = {
        BOT: 'https://avatars.githubusercontent.com/u/113633883?v=4',
        USER: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' // Logo de GitHub
    };

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function addMessage(text, sender) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('message-wrapper', sender);

        const avatar = document.createElement('img');
        avatar.src = sender === 'user' ? AVATARS.USER : AVATARS.BOT;
        avatar.classList.add('avatar');

        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', `${sender}-message`);
        messageElement.textContent = text;

        wrapper.appendChild(avatar);
        wrapper.appendChild(messageElement);
        chatBox.appendChild(wrapper);
        // SOLUCION 
		chatBox.scrollTop = chatBox.scrollHeight;
		setTimeout(() => {
			chatBox.scrollTop = chatBox.scrollHeight;
		}, 0);
		setTimeout(() => {
			chatBox.scrollTop = chatBox.scrollHeight;
		}, 50);

        return messageElement; // Devuelve el elemento del mensaje para actualizarlo si es necesario
    }

    async function sendMessage() {
        const query = userInput.value.trim();
        if (query === '') return;

        addMessage(query, 'user');
        userInput.value = '';

        const thinkingElement = addMessage('.', 'bot');
        thinkingElement.classList.add('thinking');

        let dotCount = 1;
        const thinkingInterval = setInterval(() => {
            dotCount = (dotCount % 3) + 1;
            thinkingElement.textContent = '.'.repeat(dotCount);
        }, 500);

        try {
            const response = await fetch(BACKEND_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ query: query }),
            });
            clearInterval(thinkingInterval);
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            const data = await response.json();
            thinkingElement.innerHTML = marked.parse(data.answer); // Usar marked para parsear Markdown
            thinkingElement.classList.remove('thinking');
			// SOLUCION:
			setTimeout(() => {
				chatBox.scrollTop = chatBox.scrollHeight;
			}, 10);
        } catch (error) {
            clearInterval(thinkingInterval);
            console.error('Error al contactar al backend:', error);
            thinkingElement.textContent = 'No pude conectarme. Inténtalo más tarde.';
            thinkingElement.classList.remove('thinking');
			setTimeout(() => {
				chatBox.scrollTop = chatBox.scrollHeight;
			}, 10);
        }
    }

    minimizeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        chatContainer.classList.toggle('minimized');
        minimizeBtn.textContent = chatContainer.classList.contains('minimized') ? '+' : '-';
    });

    document.getElementById('chat-header').addEventListener('click', () => {
        if (chatContainer.classList.contains('minimized')) {
            chatContainer.classList.remove('minimized');
            minimizeBtn.textContent = '-';
        }
    });
});