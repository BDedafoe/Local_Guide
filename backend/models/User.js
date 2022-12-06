const Sequelize = require('sequelize');
const db = require('../config/database');
const bcrypt = require('bcrypt');

const User = db.define('user', {
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
})

User.beforeCreate((user, options) => {
	const salt = bcrypt.genSaltSync();
	user.password = bcrypt.hashSync(user.password, salt);
});
  
 
User.prototype.validPassword = function(password) {
        return bcrypt.compareSync(password, this.password);
      }; 

// create all the defined tables in the specified database.
db.sync()
    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('This error occured', error));

module.exports = User;