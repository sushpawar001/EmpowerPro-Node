const path = require('path')
const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const env = require('dotenv').config();
const jwt = require('jsonwebtoken');

const signupGet = (req, res) => {
    const filePath = path.join(__dirname, '..', 'views', 'signin.html');
    res.sendFile(filePath);
}

const signupPost = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashpass = await bcrypt.hash(password, 10);
        const user = await userModel.create({ username: username, email: email, password: hashpass })
        res.redirect('./login/?signup=success');
    } catch (error) {
        console.log(error);
    }
}

const loginGet = (req, res) => {
    const signupStatus = req.query.signup;
    res.render('login', { signupStatus })
}

const loginPost = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await userModel.findOne({ username: username });

        if (user) {
            const matchPass = await bcrypt.compare(password, user.password);

            if (matchPass) {
                const token = jwt.sign({ user: user._id }, process.env.SECRET_KEY);

                res.cookie('token', token);
                res.redirect('/employee');
            } else {
                res.status(401).send('Invalid Password');
            }
        } else {
            res.status(401).send('User Does not exist!');
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    signupGet,
    signupPost,
    loginGet,
    loginPost
}