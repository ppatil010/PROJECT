module.exports = (sequelize, Sequelize) => {

    // User Model
    const user = sequelize.define("user", {
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING,
        required : true
      },
      role: {
        type: Sequelize.INTEGER,
        required : true
      },
      firstname: {
        type: Sequelize.STRING,
        required : true
      },
      lastname: {
        type: Sequelize.STRING
      },
      contact: {
        type: Sequelize.STRING
      }
    });
  
    return user;
  };
  