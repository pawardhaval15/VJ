const bcrypt = require('bcryptjs');

exports.hashPin = async (pin) => {
  return await bcrypt.hash(pin, 10);
};

exports.verifyPin = async (pin, hashedPin) => {
  return await bcrypt.compare(pin, hashedPin);
};
