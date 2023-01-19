const jwt = require('jsonwebtoken')
const {checkUsersCredentials} = require('../services/auth.services')
const jwtSecret = process.env.JWT_SECRET


const postLogin = (req, res) => {
  const { email, password } = req.body

  if (email && password) {
    checkUsersCredentials(email, password)
      .then((data) => {
        if (data) {
          const tokenUser = jwt.sign({
            id: data.id,
            email: data.email
          },jwtSecret)
          res.status(200).json({
            message: 'Correct Credentials!',
            tokenUser
          })
        } else {
          res.status(401).json({ message: 'Invalid Credentials' })
        }
      })
      .catch((err) => {
        res.status(400).json({ message: err.message })
      })
  }
  else {
    res.status(400).json({
      message: 'Missing Data', fields: {
        email: 'example@example.com',
        password: 'string'
      }
    })
  }
}
module.exports={postLogin}