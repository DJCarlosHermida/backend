import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as GithubStrategy } from 'passport-github2'
import { ExtractJwt, Strategy as JWTStrategy } from 'passport-jwt'
import { usersModel } from '../db/models/users.model.js'
import { compareData, hashData } from '../utils.js'

const secretKeyJWT = 'secretJWT'
// LOCAL
passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      const user = await usersModel.findOne({ email })
      if (!user) {
        return done(null, false)
      }
      const isPassword = await compareData(password, user.password)
      //console.log('password',isPassword);
      if (!isPassword) {
        return done(null, false)
      }

      done(null, user)
    }
  )
)

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const userDB = await usersModel.findOne({ email })
      if (userDB) {
        return done(null, false)
      }
      const hashPassword = await hashData(password)
      const newUser = { ...req.body, password: hashPassword }
      const newUserDB = await usersModel.create(newUser)
      done(null, newUserDB)
    }
  )
)

// GITHUB
passport.use(
  'github',
  new GithubStrategy(
    {
      clientID: 'Iv1.2136dafc84cff159',
      clientSecret: 'fb0f0292737d1960cacbfde4dc60f52b1abccf40',
      callbackURL: 'http://localhost:8080/users/github',
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile._json.email
      const userDB = await usersModel.findOne({ email })
      if (userDB) {
        done(null, false)
      }
      const newUser = {
        first_name: profile._json.name.split(' ')[0],
        last_name: profile._json.name.split(' ')[1] || '',
        email,
        password: '',
      }
      const newUserDB = await usersModel.create(newUser)
      done(null, newUserDB)
    }
  )
)

// JWT

passport.use(
  'jwt',
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKeyJWT,
    },
    async (jwt_payload, done) => {
      done(null, jwt_payload)
    }
  )
)
passport.serializeUser((user, done) => {
  try {
    done(null, user.id)
  } catch (error) {
    done(error)
  }
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await usersModel.findById(id)
    done(null, user)
  } catch (error) {
    done(error)
  }
})
