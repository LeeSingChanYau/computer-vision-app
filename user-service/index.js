require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AWS = require('aws-sdk');
const multer = require('multer');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

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

app.post('/verify', async (req, res) => {
  const paramsConfirm = {
    ClientId: '6intfe1ron2k7upgbp6h5vcc4',
    ConfirmationCode: req.body.code,
    Username: req.body.email,
  };

  cognito.confirmSignUp(paramsConfirm, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Error verifying user' });
    }
    res.json({
      message: 'User verified',
    });
  });
});

app.post('/forgotpassword', async (req, res) => {
  const Params = {
    ClientId: '6intfe1ron2k7upgbp6h5vcc4',
    Username: req.body.email,
  };

  cognito.forgotPassword(Params, (err, data) => {
    if (err) {
      console.error('Username does not exist.');
      return res.status(500).json({ error: 'Error finding Username' });
    }
    console.log('Reset code sent to email.');
    res.json({
      message: 'Reset code sent to email.',
    });
  });
});

app.post('/changepassword', async (req, res) => {
  const Params = {
    ClientId: '6intfe1ron2k7upgbp6h5vcc4',
    ConfirmationCode: req.body.code,
    Password: req.body.password,
    Username: req.body.email,
  };

  cognito.confirmForgotPassword(Params, (err, data) => {
    if (err) {
      console.error('Error confirming forgot password:', err);
      return res.status(500).json({ error: 'Error changing password' });
    }
    console.log('Password changed successfully:', data);
    res.json({
      message: 'Password Changed successfully.',
    });
  });
});

// app.post('/detect', upload.single('shoeImage'), async (req, res) => {
//   try {
//     console.log('req.file:', req.file);
//     const imageFile = req.file.buffer;
//     console.log('req.file.buffer:', req.file.buffer);
//     const data = await jordanModel.detectShoes(imageFile);
//     console.log('CustomLabels:', data);
//     res.json({ message: 'Shoe detected successfully', data: data });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'Error detecting shoe' });
//   }
// });

app.get('/', (req, res) => {
  res.send('Welcome to your Express.js server!');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
