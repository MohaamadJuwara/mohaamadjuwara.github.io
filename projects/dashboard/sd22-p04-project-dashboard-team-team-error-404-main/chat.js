// Get references to HTML elements
const messageList = document.getElementById('message-list');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Initialize current user
let currentUser = 'user';

// Add event listener to send button
sendButton.addEventListener('click', () => {
  const message = messageInput.value;

  if (message) {
    let response = '';

    // Check user input for specific conditions
    if (currentUser === 'user' && message.toLowerCase() === "hello") {//toLowerCase changes all upper case letters to lower case
      response = 'Hello how can i be of assistance ';
    }
    if (currentUser === 'user' && message.toLowerCase() === "are you evil?") {//toLowerCase changes all upper case letters to lower case
      response = 'yes';
    }


    // Create and append user's message to message list
    const li = document.createElement('li');
    li.innerHTML = messageTemplate(currentUser, message);
    messageList.appendChild(li);//appendChild makes a new element in another element
    messageInput.value = '';

    // If a response is generated, create and append bot's message to message list
    if (response !== '') {
      const responseLi = document.createElement('li');//createElement makes a new element in the html code
      responseLi.innerHTML = messageTemplate('helperBot', response);
      messageList.appendChild(responseLi);//appendChild makes a new element in another element
      currentUser = 'user';
    } else {
      // Switch the current user between 'user' and 'helperBot'
      currentUser = currentUser === 'user' ? 'helperBot' : 'user';
    }
  }
});

// Add event listener to message input for pressing Enter key
messageInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    sendButton.click();
    event.preventDefault();//preventie van function 
  }
});

// Function to generate the message template
function messageTemplate(user, message) {
  const messageAlignment = user === 'user' ? 'right' : 'left';
  const profilePicture = user === 'user' ? 'img/prsn.png' : 'img/helperBot.png';
  return `
    <div class="message-container ${messageAlignment}">
      <img class="profile-picture" src="${profilePicture}">
      <div class="message ${user}">
        <strong>${user}:</strong> ${message}
      </div>
    </div>
  `;
}
