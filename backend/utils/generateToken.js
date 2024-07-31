import jwt from "jsonwebtoken"


const generateToken = (res, userId) => {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'production', 
        sameSite: 'strict',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
    });
};


export default generateToken;