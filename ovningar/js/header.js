const acc = document.getElementById('accountLink');
const icon = document.getElementById('accountIcon');
if (acc && icon) {
  const u = localStorage.getItem('sessionUser');
  if (u) {
    acc.href = 'account.html';
    icon.src = '../img/account.png';
    icon.alt = 'Account';
  } else {
    acc.href = 'login.html';
    icon.src = '../img/login.png';
    icon.alt = 'Log in';
  }
}
