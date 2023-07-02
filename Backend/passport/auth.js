import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local'
import User from '../esquemas/User.js'

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  try {
    const user = await User.findOne({
      $or: [
        { 'email': email },
        { 'username': req.body.username }
      ]
    });
    if(user) {
      return done(null, false, { error: 'El correo electrónico o el nombre de usuario ya están en uso.' });
    } else {
      const newUser = new User();
      newUser.email = email;
      newUser.username = req.body.username;
      newUser.password = password
      await newUser.save();
      done(null, newUser);
    }
  } catch (error) {
    done(error); // Llamar a done con el error capturado
  }
}));

passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({email: email});
  if(!user) {
    return done(null, false, { message: 'No User Found' });
  }
  const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      return done(null, false, { message: 'Incorrect Password' });
    }
  return done(null, user);
}));

export default passport