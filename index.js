const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());

// In-memory storage
const USERS = []; 
const SUBMISSIONS = []; 

const QUESTIONS = [
  {
    title: "Two states",
    description: "Given an array, return the maximum of the array?",
    testCases: [
      {
        input: "[1,2,3,4,5]",
        output: "5"
      }
    ]
  }
];

// Test route
app.get('/hello', (req, res) => {
  res.send('Hello mayank');
});

// Signup route
app.post('/signup', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const existingUser = USERS.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  USERS.push({ email, password });
  return res.status(200).json({ message: 'Signup successful' });
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const user = USERS.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // token can be added later
  return res.status(200).json({ message: "Login successful" });
});

// Get questions
app.get('/questions', (req, res) => {
  res.json(QUESTIONS);
});

// Get submissions
app.get('/submissions', (req, res) => {
  res.json(SUBMISSIONS);
});

// Post submission
app.post('/submissions', (req, res) => {
  const { problemId, code, userEmail } = req.body;

  const isAccepted = Math.random() < 0.5; // Randomly accept or reject
  SUBMISSIONS.push({ problemId, code, userEmail, isAccepted });

  res.json({ message: isAccepted ? "Accepted" : "Rejected" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
