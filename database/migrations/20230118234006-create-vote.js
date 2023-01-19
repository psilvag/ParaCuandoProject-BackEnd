'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('Votes', {
        publication_id: {
          type: Sequelize.UUID,
          allowNull:false,
          primaryKey:true,
          foreignKey: true,
          references: {
            model: 'Publication',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        profile_id: {
          type: Sequelize.UUID,
          allowNull:false,
          primaryKey:true,
          foreignKey: true,
          references: {
            model: 'Profile',
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
      }, { transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try{
      await queryInterface.dropTable('Votes',{transaction})
      await transaction.commit()
    }
    catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}
