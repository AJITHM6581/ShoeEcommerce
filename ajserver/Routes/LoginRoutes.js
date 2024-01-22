const express = require('express')
const router = express.Router()
const crypto = require('crypto')
const { OAuth2Client } = require('google-auth-library')
router.use(express.json());
const { User } = require('../Model/User')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')

const secretKey = "generateRandomKey";


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    console.log(existingUser);

    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedInputPassword = crypto.createHash('sha256').update(password).digest('hex');
    const token = jwt.sign({ userId: existingUser._id, userType: existingUser.userType }, secretKey, { expiresIn: '1h' });
    console.log("token", token);

    if (existingUser.hashedPassword !== hashedInputPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const cookieOption = {
      httpOnly: true,
      secure: false,
      path: '/',
      sameSite: 'lax',
      maxAge: 3600000,
    };

    const serializedCookie = cookie.serialize('token', token, cookieOption);

    res.setHeader('set-cookie', serializedCookie);
    console.log(serializedCookie);

    if (existingUser.userType === 'user') {
      res.json({ userType: 'user', message: 'Regular user logged in', redirect: '/', token, generatedCookie: serializedCookie });
    } else if (existingUser.userType === 'seller') {
      res.json({ userType: 'seller', message: 'Seller logged in', redirect: '/seller', token });
    } else {
      // Add an else block to handle unexpected userType values
      res.status(500).json({ message: 'Unexpected userType' });
    }
  } catch (error) {
    console.error('Login error', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/google', async (req, res) => {
  try {
    const { userType, email, firstname, lastname, googleId } = req.body;
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      const token = jwt.sign({ googleId, userType }, secretKey, { expiresIn: '1h' })
      res.json({ userType: "user", redirect: '/', token })
    } else {
      const newUser = new User({
        googleId,
        email,
        userType: 'user',
        firstname: firstname,
        lastname: lastname,

      })
      await newUser.save()
      const token = jwt.sign({ googleId, userType }, secretKey, { expiresIn: '1h' })
      res.json({ userType: 'user', redirect: '/', token })

    }
  } catch (error) {
    console.error('Error ', error);
    res.status(500).json({ message: 'server error' })
  }
})

module.exports = router