const form = document.getElementById('signupForm');
const btn = document.getElementById('signupBtn');
const errorEl = document.getElementById('signupError');

const disp = document.getElementById('displayName');
const username = document.getElementById('username');
const email = document.getElementById('email');
const pass = document.getElementById('password');
const confirmPwd = document.getElementById('confirm');

const DEFAULT_AVATAR = '../img/avatar.png';

let users = [];
btn.disabled = true;

fetch('../json/users.json')
  .then(r => { if (!r.ok) throw new Error(); return r.json(); })
  .then(d => { users = Array.isArray(d.users) ? d.users : []; })
  .catch(() => { errorEl.textContent = 'Could not load user data.'; })
  .finally(() => { btn.disabled = false; });

function validate() {
  if (!form.checkValidity()) { form.reportValidity(); return 'Fill out all required fields correctly.'; }
  if (pass.value.trim().length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Z]/.test(pass.value) || !/[a-z]/.test(pass.value) || !/\d/.test(pass.value))
    return 'Password must contain at least one uppercase letter, one lowercase letter, and one digit.';
  if (pass.value !== confirmPwd.value) return 'Passwords do not match.';
  const u = username.value.trim();
  const e = email.value.trim().toLowerCase();
  if (users.some(x => x.username === u)) return 'Username is already taken.';
  if (users.some(x => (x.email || '').toLowerCase() === e)) return 'Email is already registered.';
  return '';
}

form.addEventListener('submit', e => {
  e.preventDefault();
  errorEl.textContent = '';
  const err = validate();
  if (err) { errorEl.textContent = err; return; }

  const u = username.value.trim();
  localStorage.setItem('sessionUser', u);
  localStorage.setItem('lastUser', u);

  const DEFAULT_AVATAR = '../img/avatar.png';
  const profile = {
    username: u,
    name: disp.value.trim(),
    email: email.value.trim(),
    avatar: DEFAULT_AVATAR
  };
  localStorage.setItem('sessionProfile', JSON.stringify(profile));

  location.href = 'account.html';
});
