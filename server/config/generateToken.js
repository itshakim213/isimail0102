const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, 'talkmail', {
    expiresIn: '30d',
  });
};

module.exports = generateToken;
