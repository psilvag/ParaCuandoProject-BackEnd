'use strict'
/** @type {import('sequelize-cli').Migration} */


module.exports = {

  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try{
      await queryInterface.createTable('Users',{
        id: {
          allowNull: false,
          defaultValue:Sequelize.UUIDV4,
          primaryKey: true,
          type: Sequelize.UUID
        },
        first_name: {
          type: Sequelize.STRING
        },
        last_name: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING,
          unique:true
        },
        username: {
          type: Sequelize.STRING
        },
        password: {
          type: Sequelize.STRING
        },
        email_verified: {
          type: Sequelize.DATE
        },
        token: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      },{transaction})
      await transaction.commit()
    } 
    catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try{
      await queryInterface.dropTable('Users',{transaction})
      await transaction.commit()
    }
    catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
