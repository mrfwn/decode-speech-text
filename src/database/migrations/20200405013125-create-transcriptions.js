module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('transcriptions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      program: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      text: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      locality: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      accumulated_time: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      formated_date:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('transcriptions');
  },
};
