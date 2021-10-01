const express = require('express');
const passport = require('passport');
const path = require('path');
const morgan = require('morgan');
const exphbs  = require('express-handlebars');
const config = require('./config/index');
const routerViews = require('./routes/views');
const routerAuth = require('./routes/authentication');
const routerLinks = require('./routes/links');
const app = express();

// Settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', '.hbs');

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs', 
    helpers: require('./lib/handlebars.js')

}));


// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false })); 
app.use(express.json());

// Global Variables

//Routes
app.use(routerViews);
app.use('/auth',routerAuth);
app.use('/links',routerLinks);

//
app.use(passport.initialize());
//app.use(passport.session()); 

// Static files
// app.use(express.static(path.join(__dirname, 'public')));

app.listen(config.port, ()=> {
    console.log(`Server is running on port ${config.port}`)
});
