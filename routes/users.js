// const express = require('express');
// const router= express.Router();
// const bcrypt= require('bcryptjs')


// // User Model
// const user= require('../models/User')

// //Login Page
// router.get('/login', (req, res)=> res.render('Login'))

// // Register Page
// router.get('/register', (req, res)=> res.render('Register'));

// // Register Handle
// router.post('/register', (req, res) => {
// //     console.log(req.body)
// //     res.send('hello');
// const { name, email, password, password2}= req.body;
// let errors= [];

// // Check passwords match
// if(password!== paesword2) {
//     errors.push({msg : 'Passwords do not match'})
// }

// // check pass length
// if(password.length < 6){
//     errors.push({ msg:' Password should be at least 6 characters'})
// }

// if(errors.length > 0){
//     res.render('register', {
//         errors,
//         name,
//         email,
//         password,
//         password2,
//     });
// } else {
//     // validation passed
//     user.findOne({ email: email})
//     .then(User=> {
//         if(User){
//            // User exists

//            errors.push({ msg: 'Email is already registerded '})
//            res.render('register', {
//             errors,
//             name,
//             email,
//             password,
//             password2
//            });
//         } else{
//             const newUser= new User({
//                  name,
//                  email,
//                  password
//             });
//             // console.log(newUser)
//             // res.send('hello')

//             // Hash Password
//             bcrypt.getSalt(10, (err, salt)=> bcrypt.hash(newUser.password, salt, (err, hash) =>{
//                 if(err) throw err;
                 
//                 // Set password to hashed
//                 newUser.password= hash;

//                 // Save user
//                 newUser.save()
//                 .then(User => {
//                     req.flash('success_msg', 'You are now registered and can log in');
//                   res.redirect('/users/login')
//                 })
//                 .catch(err => console.log(err));
//             }))
//         }
//     })
// }

// })

// // Login Handle
// router.post('/login', (req, res, next) =>{
//     passport.authenticate('local', {
//         successRedirect: '/dashboard',
//         failureRedirect: 'users/login',
//         failureFlash:true
//     } ) (req, res, next);
// } )

// // Logout Handle
// router.get('/logout', (req, res)=> {
//     req.logout()
//     req.flash('success_msg', 'You are logged out');
//     res.redirect('/users/login')
// })
// module.exports = router;




// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const passport = require('passport');
// // Load User model
// const User = require('../models/User');
// const { forwardAuthenticated } = require('../config/auth');

// // Login Page
// router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// // Register Page
// router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// // Register
// router.post('/register', (req, res) => {
//   const { name, email, password, password2 } = req.body;
//   let errors = [];

//   if (!name || !email || !password || !password2) {
//     errors.push({ msg: 'Please enter all fields' });
//   }

//   if (password != password2) {
//     errors.push({ msg: 'Passwords do not match' });
//   }

//   if (password.length < 6) {
//     errors.push({ msg: 'Password must be at least 6 characters' });
//   }

//   if (errors.length > 0) {
//     res.render('register', {
//       errors,
//       name,
//       email,
//       password,
//       password2
//     });
//   } else {
//     User.findOne({ email: email }).then(user => {
//       if (user) {
//         errors.push({ msg: 'Email already exists' });
//         res.render('register', {
//           errors,
//           name,
//           email,
//           password,
//           password2
//         });
//       } else {
//         const newUser = new User({
//           name,
//           email,
//           password
//         });

//         bcrypt.genSalt(10, (err, salt) => {
//           bcrypt.hash(newUser.password, salt, (err, hash) => {
//             if (err) throw err;
//             newUser.password = hash;
//             newUser
//               .save()
//               .then(user => {
//                 req.flash(
//                   'success_msg',
//                   'You are now registered and can log in'
//                 );
//                 res.redirect('/users/login');
//               })
//               .catch(err => console.log(err));
//           });
//         });
//       }
//     });
//   }
// });

// // Login
// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/users/login',
//     failureFlash: true
//   })(req, res, next);
// });

// // Logout
// router.get('/logout', (req, res) => {
//   req.logout();
//   req.flash('success_msg', 'You are logged out');
//   res.redirect('/users/login');
// });

// module.exports = router;




const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => {
  res.render('login'); // Render the login page
});

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => {
  res.render('register'); // Render the registration page
});

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                req.flash('success_msg', 'You are now registered and can log in');
                res.redirect('/users/login');
              })
              .catch((err) => {
                console.error(err);
                res.status(500).send('Internal Server Error'); // Handle database save error
              });
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard', // Redirect to the dashboard upon successful login
    failureRedirect: '/users/login', // Redirect to the login page upon failed login
    failureFlash: true, // Enable flash messages for failed login
  })(req, res, next);
});

// Logout
// router.get('/logout', (req, res) => {
//   req.logout(); // Log the user out
//   req.flash('success_msg', 'You are logged out');
//   res.redirect('/users/login'); // Redirect to the login page after 
  
// });

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      // Handle any error that occurred during logout
      console.error(err);
      return next(err);
    }
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });
});

module.exports = router;
