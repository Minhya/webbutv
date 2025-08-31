const loginForm = document.querySelector('.login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

const errorBox = document.createElement('p');
errorBox.id = 'login-error';
errorBox.style.color = 'red';
document.querySelector('.fields').appendChild(errorBox);

let users = [];
const submitBtn = loginForm.querySelector('button[type="submit"]');
submitBtn.disabled = true;

fetch('../json/users.json')
  .then(r => { if (!r.ok) throw new Error(); return r.json(); })
  .then(d => { users = Array.isArray(d.users) ? d.users : []; submitBtn.disabled = false; })
  .catch(() => { errorBox.textContent = 'Could not load user data.'; });

const lastUser = localStorage.getItem('lastUser') || '';
if (lastUser) usernameInput.value = lastUser;

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  const ok = users.find(x => x.username === username && x.password === password);
  if (ok) {
    localStorage.setItem('sessionUser', username);
    localStorage.setItem('lastUser', username);
    errorBox.textContent = '';
    window.location.href = 'account.html';
  } else {
    errorBox.textContent = 'Invalid username or password.';
    passwordInput.value = '';
    passwordInput.focus();
  }
});
