const express = require('express');
const bodyParser = require('body-parser');
const users = require('./api/users');
const redirect = require('./api/redirect');

const app = express();
const PORT = 5000;
const STATUS = {SUCCESS: 200, REDIRECT: 302};
const NODE_ENV = process.env.NODE_ENV;

function isTestEnvironment() {
  return NODE_ENV === 'TEST';
}

function registerApp(port) {
  if (!port) throw new Error('port is required to register Express App');
  if (!isTestEnvironment()) {
    app.listen(port, _ => console.log(`listening on port ${port}...`));
  }

  app.use(bodyParser.json());

  app.get('/users', (req, res) => {
    res.status(STATUS.SUCCESS);
    res.json(users);
  });

  app.get('/google', (req, res) => {
    res.status(STATUS.REDIRECT);
    res.redirect(redirect.url);
  });

  app.post('/login', (req, res) => {
    res.json({
      isSuccess: true
    });
  });

  return app;
}

if (!isTestEnvironment()) {
  registerApp(PORT);
}

module.exports = registerApp;
