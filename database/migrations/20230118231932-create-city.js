'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('Cities', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        country_id: {
          type: Sequelize.INTEGER,
          foreignKey: true,
          references: {
            model: 'Country',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        name: {
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
      await queryInterface.dropTable('Cities',{transaction})
      await transaction.commit()
    }
    catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}