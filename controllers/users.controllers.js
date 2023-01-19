

const UsersService = require('../services/users.services')
const usersService = new UsersService()


const postUser = async (req, res, next) => {
  try {
    let { first_name,last_name,email,password,username } = req.body
    let user = await usersService.createUser({ first_name,last_name,email,password,username})
    return res.status(201).json({ results: user })
  } catch (error) {
    next(error)
  }
}

const getUser = async (req, res, next) => {
  try {
    let { id } = req.params
    let users = await usersService.getUserOr404(id)
    return res.json({ results: users })
  } catch (error) {
    next(error)
  }
}

const patchUser = async (req, res, next) => {
  try {
    let { id } = req.params
    let { first_name,last_name,email,password,username } = req.body
    let user = await usersService.updateUser(id, {first_name,last_name,email,password,username })
    return res.json({ results: user })
  } catch (error) {
    next(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    let { id } = req.params
    let user = await usersService.removeUser(id)
    return res.json({ results: user, message: 'removed succesfuly' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  postUser,
  getUser,
  patchUser,
  deleteUser
}