const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const submitBtn = document.getElementById('submit-btn');
const apiKey = 'gAAAAABmAn9nF8wB3qL7w6bvjCNh6PmQi5Q_e8bYPSovlEl4s0T-6TWy_lmSnkTzQpAxz1_u5g0tZR4dQL1ExGIFjbcmZX37VLF8eTMHHKW0KkZOm3dTh82_oxyvqYX2nB8UJiS30utk';

function addMessage(message, sender) {
    chatBox.innerHTML += `<div class="message">${sender}: ${message}</div>`;
}

async function handleUserInput() {
    const message = userInput.value.trim();
    if (!message) return;

    try {
        const response = await fetch('https://api.textcortex.com/v1/texts/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
            body: JSON.stringify({ text: message })
        });

        if (!response.ok) throw new Error('Failed to fetch suggestions');

        const { data } = await response.json();
        addMessage(data.outputs[0].text, 'Bot');
    } catch (error) {
        console.error('Error:', error.message);
        addMessage('An error occurred. Please try again later.', 'Bot');
    }

    userInput.value = '';
}

submitBtn.addEventListener('click', handleUserInput);
userInput.addEventListener('keypress', event => event.key === 'Enter' && handleUserInput());