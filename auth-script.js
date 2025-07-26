const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const formTitle = document.getElementById('formTitle');
const toggleText = document.getElementById('toggleText');

function switchForm() {
  loginForm.classList.toggle('active');
  registerForm.classList.toggle('active');

  if (loginForm.classList.contains('active')) {
    formTitle.innerText = 'Login';
    toggleText.innerHTML = `Don't have an account? <a onclick="switchForm()">Register</a>`;
  } else {
    formTitle.innerText = 'Register';
    toggleText.innerHTML = `Already have an account? <a onclick="switchForm()">Login</a>`;
  }
}

function registerUser() {
  const name = document.getElementById('regName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  if (name && email && password) {
    localStorage.setItem('pizzaUser', JSON.stringify({ name, email, password }));
    alert('✅ Registration Successful! You can now log in.');
    switchForm();
  } else {
    alert('⚠️ Please fill all fields.');
  }
}

function loginUser() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const user = JSON.parse(localStorage.getItem('pizzaUser'));

  if (user && user.email === email && user.password === password) {
    alert(`👋 Welcome, ${user.name}!`);
    window.location.href = 'index.html'; // Redirect to homepage
  } else {
    alert('❌ Invalid email or password.');
  }
}
