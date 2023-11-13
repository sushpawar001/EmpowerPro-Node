const express = require('express');
const userRouter = express.Router()
const { verifyToken } = require('../middleware/authCheck');
const { signupGet, signupPost, loginGet, loginPost } = require('../controllers/userControl');

userRouter.get('/sign-up', signupGet);

userRouter.post('/sign-up', signupPost);

userRouter.get('/login', loginGet);

userRouter.post('/login', loginPost);

userRouter.get('/logout', (req, res) => {
    res.cookie('token', '', { maxAge: 1 });
    res.redirect('/');
});


module.exports = userRouter;
