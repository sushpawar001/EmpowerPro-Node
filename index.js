const env = require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const mongoose = require('mongoose');
const empModel = require('./models/employee');
const empRoute = require('./routes/empRoutes');
const userRouter = require('./routes/userRoutes');
const apiRouter = require('./routes/apiRoutes');

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/employee', empRoute);
app.use('/user', userRouter);
app.use('/api', apiRouter);

// set the view engine to ejs
app.set('view engine', 'ejs');

mongoose
  // .connect('mongodb://127.0.0.1:27017/test')
  .connect(process.env.DB_KEY)
  .then(console.log("Done connecting to MongoDB!"))
  .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.redirect('/user/login')
})

app.get('/logout', (req, res) => {
  res.redirect('/user/logout')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/`)
})