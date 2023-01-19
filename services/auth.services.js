
const UsersService = require('../services/users.services')
const usersService = new UsersService()
const { comparePassword } = require('../utils/crypt')

const checkUsersCredentials = async (email, password) => {
  try {
    const user = await usersService.getUserEmail(email)
    const verifyPassword = comparePassword(password, user.password)
    if (verifyPassword) {
      return user
    }
    return null

  } catch (error) {
    return error
  }
}
module.exports = {checkUsersCredentials}
  
    