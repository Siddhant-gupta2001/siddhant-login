// const express= require('express');
// const expressLayouts= require('express-ejs-layouts');

// const mongoose= require('mongoose');
// const flash= require('connect-flash');
// const session= require('express-session');
// const passport= require('passport')

// const app = express();

// // Passport Config
// require('./config/passport')(passport);
// // DB Config
// const db= require('./config/keys').MongoURI;

// // Connect to Mongo
// async function connect() {
//     try {
//         await mongoose.coonect(URI)
//         console.log('Connected with Mongo DB')
//     } catch (error) {
//         console.log(`Error -> ${error}`)
//     }
// }
//  connect()

// // mongoose.connect(db, { useNewUrlParser: true })
// //   .then(() => console.log('MongoDB Connected...'))
// //   .catch(err => {
// //     console.error('MongoDB Connection Error:', err);
// //     // Add appropriate error handling here, e.g., shutting down the server
// //   });

// //EJS
// app.use(expressLayouts);
// app.set('view engine', 'ejs');

// // Bodyparser
// app.use(express.urlencoded({ extended: false}));

// // Express Session

// app.use(session({
//     secret:'secret',
//     rescave:true,
//     saveUninitialized:true,
//     // cookie: { secure:true}
// }))

// //Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// // Connect flash
// app.use(flash());

// // Global Vars
// app.use((req, res, next)=>{
//     res.locals.success_masg= req.flash('success_msg');
//     res.locals.error_msg= rq.flash('error_msg');
//     res.locals.error = req.flash('error');
//     next();
// });
// // Routes

// app.use('/', require('./routes/index'));
// app.use('/users', require('./routes/users'))


// const PORT= process.env.PORT || 5000;

// app.listen(PORT, console.log(`Server started on port ${PORT}`))

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// Passport Config
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').MongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true ,useUnifiedTopology: true}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));






