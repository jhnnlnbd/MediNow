
const clinics = [
  { id: 1, name: 'Davao General Clinic',       specialty: 'General Medicine',   address: 'JP Laurel Ave, Davao City',  icon: '🏥', bg: '#e8f5ee', rating: 4.8, reviews: 142, category: 'General',      slots: ['8:00 AM','9:30 AM','11:00 AM','2:00 PM','4:00 PM'] },
  { id: 2, name: 'BrightSmile Dental Studio',  specialty: 'Dental Care',        address: 'Roxas Ave, Davao City',      icon: '🦷', bg: '#e8f0fb', rating: 4.9, reviews: 98,  category: 'Dental',        slots: ['9:00 AM','10:30 AM','1:00 PM','3:00 PM','5:00 PM'] },
  { id: 3, name: 'LittleStars Pediatric Center', specialty: 'Pediatrics',       address: 'Quimpo Blvd, Davao City',    icon: '👶', bg: '#fff3e0', rating: 4.7, reviews: 211, category: 'Pediatrics',    slots: ['8:30 AM','10:00 AM','1:30 PM','3:30 PM'] },
  { id: 4, name: 'MindCare Psychiatric Center', specialty: 'Mental Health',     address: 'Ilustre St, Davao City',     icon: '🧠', bg: '#f3e8fb', rating: 4.9, reviews: 76,  category: 'Mental Health', slots: ['9:00 AM','11:00 AM','2:00 PM','4:30 PM'] },
  { id: 5, name: 'ClearVision Eye Clinic',     specialty: 'Ophthalmology',      address: 'San Pedro St, Davao City',   icon: '👁️', bg: '#e8f8fb', rating: 4.8, reviews: 134, category: 'Eye Care',      slots: ['8:00 AM','10:00 AM','12:00 PM','3:00 PM'] },
  { id: 6, name: 'VitaCore Wellness Clinic',   specialty: 'Internal Medicine',  address: 'McArthur Hwy, Davao City',   icon: '💊', bg: '#fbe8e8', rating: 4.6, reviews: 89,  category: 'General',       slots: ['9:30 AM','11:30 AM','1:30 PM','4:00 PM'] },
  { id: 7, name: 'OrthoMove Sports Clinic',    specialty: 'Orthopedics',        address: 'Matina, Davao City',         icon: '🦴', bg: '#e8fbf3', rating: 4.7, reviews: 62,  category: 'General',       slots: ['8:00 AM','10:30 AM','2:30 PM','5:00 PM'] },
  { id: 8, name: 'TinyTeeth Kids Dental',      specialty: 'Pediatric Dental',   address: 'Lanang, Davao City',         icon: '🐣', bg: '#fffbe8', rating: 4.9, reviews: 153, category: 'Dental',        slots: ['9:00 AM','10:30 AM','1:00 PM','2:30 PM'] },
];


let selectedClinic = null;
let selectedTime   = null;


function renderClinics(filter = 'All') {
  const grid     = document.getElementById('clinicsGrid');
  const filtered = filter === 'All' ? clinics : clinics.filter(c => c.category === filter);

  grid.innerHTML = filtered.map(c => `
    <div class="clinic-card" onclick="openAppt(${c.id})">
      <div class="clinic-card-top">
        <div class="clinic-icon" style="background:${c.bg}">${c.icon}</div>
        <div>
          <h3>${c.name}</h3>
          <div class="specialty">${c.specialty}</div>
          <div class="address">📍 ${c.address}</div>
        </div>
      </div>
      <div class="rating">⭐ ${c.rating} <span>(${c.reviews} reviews)</span></div>
      <div class="clinic-meta">
        <div class="avail-pill">${c.slots.length} slots today</div>
        <button class="book-btn" onclick="event.stopPropagation(); openAppt(${c.id})">Book Now</button>
      </div>
    </div>
  `).join('');
}

function filterClinics(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderClinics(cat);
}


function openAppt(id) {
  selectedClinic = clinics.find(c => c.id === id);
  selectedTime   = null;

  document.getElementById('apptContent').style.display = 'block';
  document.getElementById('apptSuccess').style.display = 'none';

  
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('appt-date').min   = today;
  document.getElementById('appt-date').value = today;

  
  document.getElementById('apptClinicInfo').innerHTML = `
    <div class="clinic-icon" style="background:${selectedClinic.bg}">${selectedClinic.icon}</div>
    <div>
      <h4>${selectedClinic.name}</h4>
      <p>${selectedClinic.specialty} · ${selectedClinic.address}</p>
    </div>
  `;

  
  document.getElementById('timeGrid').innerHTML =
    selectedClinic.slots.map(s =>
      `<div class="time-slot" onclick="selectTime(this,'${s}')">${s}</div>`
    ).join('') +
    '<div class="time-slot booked">6:00 PM</div>';

  document.getElementById('apptOverlay').classList.add('show');
}

function selectTime(el, time) {
  document.querySelectorAll('.time-slot').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  selectedTime = time;
}

function confirmAppointment() {
  const name   = document.getElementById('appt-name').value.trim();
  const date   = document.getElementById('appt-date').value;
  const reason = document.getElementById('appt-reason').value;

  if (!name)         { showToast('Please enter your name.');              return; }
  if (!date)         { showToast('Please select a date.');                return; }
  if (!reason)       { showToast('Please select a reason for visit.');    return; }
  if (!selectedTime) { showToast('Please choose a time slot.');           return; }

  const ref = 'MN-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  document.getElementById('refCode').textContent = ref;
  document.getElementById('apptContent').style.display = 'none';
  document.getElementById('apptSuccess').style.display = 'block';
}


function openProfileModal() {
  document.getElementById('profileOverlay').classList.add('show');
}

function switchTab(tab) {
  const isSignup = tab === 'signup';
  document.getElementById('signupForm').style.display = isSignup ? 'block' : 'none';
  document.getElementById('loginForm').style.display  = isSignup ? 'none'  : 'block';
  document.getElementById('tabSignup').classList.toggle('active',  isSignup);
  document.getElementById('tabLogin').classList.toggle('active',  !isSignup);
  document.getElementById('authSub').innerHTML = isSignup
    ? 'Already have an account? <a onclick="switchTab(\'login\')">Log in</a>'
    : 'New here? <a onclick="switchTab(\'signup\')">Create an account</a>';
}

function registerUser() {
  const fname = document.getElementById('reg-fname').value.trim();
  const lname = document.getElementById('reg-lname').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const phone = document.getElementById('reg-phone').value.trim();
  const pass  = document.getElementById('reg-pass').value;

  if (!fname || !lname)          { showToast('Please enter your full name.');                    return; }
  if (!email || !email.includes('@')) { showToast('Please enter a valid email.');               return; }
  if (!phone)                    { showToast('Please enter your phone number.');                 return; }
  if (pass.length < 6)           { showToast('Password must be at least 6 characters.');        return; }

  closeModal('profileOverlay');
  showToast(`Welcome, ${fname}! Your profile has been created. 🎉`);
}

function loginUser() {
  const email = document.getElementById('log-email').value.trim();
  const pass  = document.getElementById('log-pass').value;

  if (!email || !pass) { showToast('Please fill in all fields.'); return; }

  closeModal('profileOverlay');
  showToast('Logged in successfully! Welcome back. 👋');
}


function closeModal(id) {
  document.getElementById(id).classList.remove('show');
}

function closeOnBg(e, id) {
  if (e.target.id === id) closeModal(id);
}

function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3200);
}


document.addEventListener('DOMContentLoaded', () => {
  renderClinics();

  
  const dobField = document.getElementById('reg-dob');
  if (dobField) dobField.max = new Date().toISOString().split('T')[0];
});
