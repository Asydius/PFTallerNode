//Dependencies
const morgan = require('morgan');
const express = require('express');
const app = express();
//Routes
const login = require('./routes/login');
const users = require('./routes/users');
//Middleware
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Main
app.get('/', index);
app.use('/login', login);
app.use(auth);
app.use('/users', users);
app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...")
})