'use strict';
const fs = require('fs');
const app = require('express');
const { json } = require('express');
const router = app.Router();

var Users = [];

//health check
router.get('/health', (request, response) => {
  response.send('<p>Still alive!</p>');
})

router.get('/users', file('mock-api/users.json'));

router.post('/user/register', add);

router.post('/login', login);

function file(filename) {
  return (request, response) => {
    fs.readFile('mock-api/users.json', 'utf8', function readFileCallback(err, data){
      if (err){
          console.log(err);
      } else {
        Users = JSON.parse(data);
        response.send(Users);
      }
    });
  };
}

function login(req, res) {
  Users.filter(function(user) {
    if (!req.body.email) {
      return res.status(400).json({
        status: 'Error',
        message: 'Email should not be empty!',
      });
    }

    if (!req.body.password) {
      return res.status(400).json({
        status: 'Error',
        message: 'Password should not be empty!',
      });
    }

    if(user.email === req.body.email && user.password === req.body.password) {
      res.status(200).json({status: "OK", message: "Logged in successfully!"})
    } else {
      res.status(401).json({status: "Error", message: "Incorrect credentials."});
    }
  });
}

function add(req, res) {
  if (!req.body.email) {
    return res.status(400).json({
      status: 'Error',
      message: 'Email should not be empty!',
    });
  }

  if (!req.body.password) {
    return res.status(400).json({
      status: 'Error',
      message: 'Password should not be empty!',
    });
  }

  if (!req.body.repeatPassword) {
    return res.status(400).json({
      status: 'Error',
      message: 'Repeat password should not be empty!',
    });
  }

  if (req.body.password != req.body.repeatPassword) {
    return res.status(400).json({
      status: 'Error',
      message: 'Passwords don\'t match',
    });
  }

  fs.readFile('mock-api/users.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
      Users.filter(function(user) {
        if(user.email === req.body.email){
          response.status(409).json({status: "Error", message: "User already exists!"})
        }
      });
      var newUser = {id: Users.length+1, email: req.body.email, password: req.body.password};
      Users.push(newUser);
      fs.writeFile('mock-api/users.json', JSON.stringify(Users), function(err, result) {
        if(err) console.log('error', err);
        else {
          res.status(200).json({status: "OK", message: "User successfully created!"})
        }
      });
    }
  });
}

module.exports = router;