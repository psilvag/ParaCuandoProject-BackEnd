'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try{
      await queryInterface.createTable('Profiles', {
        id: {
          allowNull: false,
          defaultValue:Sequelize.UUIDV4,
          primaryKey: true,
          type: Sequelize.UUID
        },
        user_id: {
          type: Sequelize.UUID,
          foreignKey:true,
          references: {
            model: 'User',
            key: 'id'
          },
          onUpdate: 'CASCADE', 
          onDelete: 'RESTRICT'
        },
        role_id: {
          type: Sequelize.INTEGER,
          foreignKey:true,
          references: {
            model: 'Rol',
            key: 'id'
          },
          onUpdate: 'CASCADE', 
          onDelete: 'RESTRICT'
        },
        image_url: {
          type: Sequelize.STRING
        },
        code_phone: {
          type: Sequelize.INTEGER
        },
        phone: {
          type: Sequelize.INTEGER
        },
        country_id: {
          type: Sequelize.INTEGER,
          foreignKey:true,
          references: {
            model: 'Country',
            key: 'id'
          },
          onUpdate: 'CASCADE', 
          onDelete: 'RESTRICT'
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
      await queryInterface.dropTable('Profiles',{transaction})
      await transaction.commit()
    }
    catch (error) {
      await transaction.rollback()
      throw error
    }
   
  }
}