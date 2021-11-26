const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInput');
const messageContainer = document.querySelector(".main");

var msgrec = new Audio("../style/ting.mp3");

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'right'){
        msgrec.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'left');
    socket.emit('send', message);
    messageInput.value = "";
})

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'centre');
})

socket.on('recieve', data => {
    append(`${data.name}: ${data.message}`, 'right');
})

socket.on('left', name => {
    append(`${name} left the chat`, 'centre');
})