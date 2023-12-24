const router = require('express').Router();
const { User } = require('../../db/models');
const jwt = require('jsonwebtoken');
const { NodeMailer } = require('../../utils');
require('dotenv').config();

router.post('/register', async (req, res, next) => {
  try {
    // expects {username, email, password} in req.body
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res
        .status(400)
        .json({ error: 'Username, password, and email required' });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ error: 'Password must be at least 6 characters' });
    }

    const user = await User.create(req.body);

    const token = jwt.sign(
      { id: user.dataValues.id },
      process.env.SESSION_SECRET,
      { expiresIn: '30m' }
    );
    const tempLoginToken = jwt.sign(
      { id: user.dataValues.id },
      process.env.SESSION_SECRET,
      { expiresIn: '30m' }
    );

    const mailConfigurations = {
      // It should be a string of sender/server email
      from: process.env.NODEMAILER_EMAIL,

      to: user.email,

      // Subject of Email
      subject: 'Email Verification',

      // This would be the text of email body
      text: `Hi! There, You have recently visited 
                   our website and entered your email.
                   Please follow the given link to verify your email
                   http://${
                     process.env.env === 'development'
                       ? 'localhost:5000'
                       : 'https://kc-messenger-app-6107c8ddc413.herokuapp.com'
                   }/verify?token=${token} 
                   Thanks`,
    };

    transporter.sendMail(mailConfigurations, function (error, info) {
      if (error) throw Error(error);
      console.log('Email Sent Successfully');
      console.log(info);
    });

    res.json({
      ...user.dataValues,
      token: tempLoginToken,
    });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(401).json({ error: 'User already exists' });
    } else if (error.name === 'SequelizeValidationError') {
      return res.status(401).json({ error: 'Validation error' });
    } else next(error);
  }
});

router.post('login', async (req, res, next) => {
  try {
  } catch (error) {}
});

router.delete('logout', async (req, res, next) => {
  try {
  } catch (error) {}
});

router.get('user', async (req, res, next) => {
  try {
  } catch (error) {}
});

module.exports = router;
