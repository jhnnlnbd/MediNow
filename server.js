const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'profiles.json');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

function readProfiles() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data || '[]');
  } catch (error) {
    return [];
  }
}

function writeProfiles(profiles) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(profiles, null, 2), 'utf8');
}

app.get('/api/users', (req, res) => {
  const profiles = readProfiles();
  res.json(profiles.map(({ password, ...rest }) => rest));
});

app.get('/api/users/:id', (req, res) => {
  const profiles = readProfiles();
  const user = profiles.find(p => p.id === req.params.id);
  if (!user) return res.status(404).json({ message: 'Profile not found' });
  const { password, ...publicData } = user;
  res.json(publicData);
});

app.post('/api/users', (req, res) => {
  const { firstName, lastName, email, phone, dob, sex, bloodType, password } = req.body;
  if (!firstName || !lastName || !email || !phone || !password) {
    return res.status(400).json({ message: 'Missing required profile fields.' });
  }

  const profiles = readProfiles();
  if (profiles.some(profile => profile.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ message: 'A profile with this email already exists.' });
  }

  const newProfile = {
    id: uuidv4(),
    firstName,
    lastName,
    email: email.toLowerCase(),
    phone,
    dob: dob || null,
    sex: sex || null,
    bloodType: bloodType || null,
    password,
    createdAt: new Date().toISOString()
  };

  profiles.push(newProfile);
  writeProfiles(profiles);

  const { password: _, ...publicData } = newProfile;
  res.status(201).json(publicData);
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const profiles = readProfiles();
  const user = profiles.find(profile => profile.email.toLowerCase() === email.toLowerCase() && profile.password === password);
  if (!user) return res.status(401).json({ message: 'Invalid email or password.' });

  const { password: _, ...publicData } = user;
  res.json(publicData);
});

app.put('/api/users/:id', (req, res) => {
  const profiles = readProfiles();
  const index = profiles.findIndex(profile => profile.id === req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Profile not found.' });

  profiles[index] = { ...profiles[index], ...req.body, id: profiles[index].id };
  writeProfiles(profiles);

  const { password, ...publicData } = profiles[index];
  res.json(publicData);
});

app.delete('/api/users/:id', (req, res) => {
  const profiles = readProfiles();
  const filtered = profiles.filter(profile => profile.id !== req.params.id);
  if (filtered.length === profiles.length) {
    return res.status(404).json({ message: 'Profile not found.' });
  }
  writeProfiles(filtered);
  res.json({ message: 'Profile deleted successfully.' });
});

app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ message: 'Endpoint not found.' });
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`MediNow backend running on http://localhost:${PORT}`);
});
