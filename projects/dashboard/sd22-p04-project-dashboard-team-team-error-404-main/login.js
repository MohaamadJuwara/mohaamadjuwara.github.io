
function login() {
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // You can add your login logic here
  // For simplicity, we'll just check if the fields are not empty
  if (username === 'The-error404' && password === '@Error') {
    alert('You have logged in');

    // Save the username and password to local storage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);

    // Redirect to the page after login
    document.location.href = "home.html";
  } else {
    alert('Please enter the correct username and password.');
  }
}
