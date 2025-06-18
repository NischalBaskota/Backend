const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Tutor = require('../models/Tutor');
const Parent = require('../models/Parents');

const registerUser = async (req, res) => {
  const { fullName, email, password, role, address, location } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    let user;

    if (role === 'tutor') {
      user = new Tutor({ fullName, email, password: hashedPassword, location });
    } else {
      user = new Parent({ fullName, email, password: hashedPassword, address });
    }

    await user.save();

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET);
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = role === 'tutor'
      ? await Tutor.findOne({ email })
      : await Parent.findOne({ email });

    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { registerUser, loginUser };
