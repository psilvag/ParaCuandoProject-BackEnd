'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('users', {
        id: {
          allowNull: false,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          type: Sequelize.UUID
        },
        profile_id: {
          allowNull: false,
          type: Sequelize.UUID,
          references: {
            model: 'Users',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        publication_type_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'Profiles',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        },
        title: {
          allowNull: false,
          type: Sequelize.STRING
        },
        description: {
          allowNull: false,
          type: Sequelize.STRING
        },
        picture: {
          type: Sequelize.STRING
        },
        city_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'City',
            key: 'id'
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE'
        },
        image_url: {
          type: Sequelize.STRING
        },
        content: {
          type: Sequelize.TEXT,
          validate: {
            len: [1, Infinity]
          }
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'created_at'
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          field: 'updated_at'
        }
      }, { transaction })

      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  },
  down: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.dropTable('users',{ transaction })
      await transaction.commit()
    } catch (error) {
      await transaction.rollback()
      throw error
    }
  }
}