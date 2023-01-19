const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const passport = require('passport')

const jwtSecret = process.env.JWT_SECRET
const UsersService = require('../services/users.services')
const userService = new UsersService()


const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret
}

passport.use(
  new JwtStrategy(options, (tokenDecoded, done) => {
    userService .getUserId(tokenDecoded.id)
      .then((user) => {
        if (user) {
          done(null, tokenDecoded) 
        } else {
          done(null, false) 
        }
      })
      .catch((err) => {
        done(err, false) 
      })
  })
)

module.exports = passport
