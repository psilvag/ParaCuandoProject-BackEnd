'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('publications', {
        id: {
          allowNull: false,
          primaryKey: true,
          defaultValue:Sequelize.UUIDV4,
          type: Sequelize.UUID
        },
        profile_id: {
          type: Sequelize.UUID,
          foreignKey: true,
          references: {
            model: 'Profiles',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'

        },
        category_id: {
          type: Sequelize.INTEGER,
          foreignKey: true,
          references: {
            model: 'Categories',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        title: {
          type: Sequelize.STRING
        },
        description: {
          type: Sequelize.STRING
        },
        content: {
          type: Sequelize.TEXT
        },
        picture: {
          type: Sequelize.STRING
        },
        city_id: {
          type: Sequelize.INTEGER,
          foreignKey: true,
          references: {
            model: 'City',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        },
        image_url: {
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
    }
    catch (error) {
      await transaction.rollback()
      throw error
    }
  },

  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction()
    try{
      await queryInterface.dropTable('publications',{transaction})
      await transaction.commit()
    }
    catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}