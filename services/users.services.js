

const models = require('../database/models')
//const { Op } = require('sequelize')
const { CustomError } = require('../utils/custom-error')
const uuid=require('uuid')
const {hashpassword}=require('../utils/crypt')

class UsersService {

  constructor()  {

  }
 
  async createUser(obj) {
    const transaction = await models.sequelize.transaction()
    try {
      let newUser = await models.Users.create({
        id: uuid.v4(),
        first_name:obj.first_name,
        last_name:obj.last_name,
        username:obj.username,
        email:obj.email_name,
        password:hashpassword(obj.password)
      }, { transaction })

      await transaction.commit()
      return newUser
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
  //Return Instance if we do not converted to json (or raw:true)
  async getUserOr404(id) {
    let user = await models.Users.findByPk(id)   
    if (!user) throw new CustomError('Not found User', 404, 'Not Found')
    return user
  }

  //Return not an Instance raw:true | we also can converted to Json instead
  async getUserId(id) {
    let user = await models.Users.findByPk(id, { raw: true })
    return user
  }
  async getUserEmail(email) {
    let user = await models.Users.findOne({
      where:{
        email:email
        ,raw:true}
    })
    return user
  }

  async updateUser(id, obj) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.findByPk(id)
      if (!user) throw new CustomError('Not found user', 404, 'Not Found')
      let updatedUser = await user.update({obj}, {transaction })
      await transaction.commit()
      return updatedUser

    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }

  async removeUser(id) {
    const transaction = await models.sequelize.transaction()
    try {
      let user = await models.Users.findByPk(id)
      if (!user) throw new CustomError('Not found user', 404, 'Not Found')
      await user.destroy({ transaction })
      await transaction.commit()
      return user
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}

module.exports = UsersService

