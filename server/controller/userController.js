import registeredUsers from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registeredUser = async (req, res) => {
    const { email, password } = req.body;
    if ( !email || !password) {
        return res.status(400).json({ error: 'All fields are required' })
    }
    const existingUser = await registeredUsers.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ error: 'Existing user' });
    }
    const hashedPassword = await bcrypt.hash(password, 6)
    const newUser = new registeredUsers({
        email,
        password: hashedPassword,
    })
    try {
        const savedUser = await newUser.save();
        res.status(201).json({
            message: 'Registration successful',
            user: {
                userId: savedUser._id,
                email: savedUser.email
            }
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' })
    }
}


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await registeredUsers.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '6h' } 
    );

    const refreshToken = jwt.sign(
      { userId: user._id},
      process.env.JWT_REFRESH_TOKEN,
      { expiresIn: '24h' } 
    );

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    res.status(200).json({
      message: 'Login successful',accessToken,refreshToken,
      user: {email: user.email,userId: user._id },
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


  export {registeredUser,loginUser}