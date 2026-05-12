
function registerUser() {
  const user = {
    firstName: document.getElementById('reg-fname').value,
    lastName:  document.getElementById('reg-lname').value,
    email:     document.getElementById('reg-email').value,
    phone:     document.getElementById('reg-phone').value,
    dob:       document.getElementById('reg-dob').value,
    sex:       document.getElementById('reg-sex').value,
    blood:     document.getElementById('reg-blood').value,
    password:  document.getElementById('reg-pass').value, 
    createdAt: new Date().toISOString()
  };

  localStorage.setItem('medinow_user', JSON.stringify(user));
  showToast(`Welcome, ${user.firstName}! Profile created.`);
  closeModal('profileOverlay');
}

function loginUser() {
  const stored = JSON.parse(localStorage.getItem('medinow_user'));
  const email  = document.getElementById('log-email').value;
  const pass   = document.getElementById('log-pass').value;

  if (stored && stored.email === email && stored.password === pass) {
    showToast(`Welcome back, ${stored.firstName}! 👋`);
    closeModal('profileOverlay');
  } else {
    showToast('Invalid email or password.');
  }
}
