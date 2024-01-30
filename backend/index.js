require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AWS = require('aws-sdk');

const app = express();

AWS.config.update({ region: 'us-east-2' });

const cognito = new AWS.CognitoIdentityServiceProvider();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  console.log('process.env.CLIENT_ID', process.env.CLIENT_ID);
  const params = {
    ClientId: process.env.CLIENT_ID,
    Username: email,
    Password: password,
    UserAttributes: [{ Name: 'email', Value: email }],
  };

  cognito.signUp(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error signing up user' });
    }
    console.log(data);
    res.json({ message: 'User signed up successfully', user: data.User });
  });
});

// Define login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Call initiateAuth method of CognitoIdentityServiceProvider
  const params = {
    AuthFlow: 'USER_PASSWORD_AUTH',
    ClientId: process.env.CLIENT_ID,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  };

  cognito.initiateAuth(params, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error logging in user' });
    }
    console.log(data);
    res.json({
      message: 'User logged in successfully',
      tokens: data.AuthenticationResult,
    });
  });
});

app.post('/verify', (req, res) => {
  const { email, code } = req.body;

  const params = {
    ClientId: process.env.CLIENT_ID,
    Username: email,
    ConfirmationCode: code,
  };

  cognito.confirmSignUp(params, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Wrong code' });
    }
    console.log(data);
    res.json({ message: 'Account confirmed successfully' });
  });
});

app.get('/', (req, res) => {
  res.send('Welcome to your Express.js server!');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
