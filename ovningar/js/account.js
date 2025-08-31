const u = localStorage.getItem('sessionUser');
if (!u) location.href = 'login.html';

const sessionProfile = JSON.parse(localStorage.getItem('sessionProfile') || '{}');
const loading = document.getElementById('loading');
const profile = document.getElementById('profile');

fetch('../json/users.json')
  .then(r => { if (!r.ok) throw new Error(); return r.json(); })
  .then(d => {
    const list = Array.isArray(d.users) ? d.users : [];
    const fromJson = list.find(x => x.username === u);
    const user = sessionProfile.username === u ? sessionProfile : (fromJson || { username: u });
    const nameEl = document.getElementById('name');
    const userEl = document.getElementById('username');
    const emailEl = document.getElementById('email');
    const avatarEl = document.getElementById('avatar');
    if (nameEl) nameEl.textContent = user.name || user.username || '';
    if (userEl) userEl.textContent = user.username || '';
    if (emailEl) emailEl.textContent = user.email || '';
    if (avatarEl && user.avatar) avatarEl.src = user.avatar;
    profile.hidden = false;
  })
  .catch(() => { loading.textContent = 'Could not read profile.'; })
  .finally(() => { loading.hidden = true; });

document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('sessionUser');
  localStorage.removeItem('sessionProfile');
  location.href = 'login.html';
});
