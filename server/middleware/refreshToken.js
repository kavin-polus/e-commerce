import jwt from 'jsonwebtoken';

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(403).json({ error: 'No refresh token, authorization denied' });
    }

    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: 'Invalid refresh token' });
      }

      const newAccessToken = jwt.sign(
        { userId: decoded.userId, username: decoded.username },
        process.env.JWT_SECRET,
        { expiresIn: '6h' }
      );

      return res.json({ accessToken: newAccessToken });
    });
  } catch (error) {
    console.error('Refresh Token Error:', error);
    res.status(500).json({ error: 'Server error while refreshing token' });
  }
};



export default refreshToken;
