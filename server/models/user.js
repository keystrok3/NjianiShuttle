const { Sequelize, Model, DataTypes } = require("sequelize");
const bcrypt = require('bcrypt');
const { sequelize_connection } = require('../config/db_config.js');


class User extends Model {
    
}

// Attributes: national_id, first_name, last_name, email, password, reset_password_token
User.init({
    national_id: {
        type: DataTypes.INTEGER,
        validate: {
            isInt: true,
        },
        primaryKey: true
    },

    first_name: {
        type: DataTypes.STRING,
    },

    last_name: {
        type: DataTypes.STRING
    },

    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING
    },
    reset_password_token: {
        type: DataTypes.STRING
    }
},
{
    sequelize: sequelize_connection,
    modelName: 'User',
    tableName: 'user_table',

    hooks: {
        beforeCreate: async (user) => {
            const salt = await bcrypt.genSalt(10);
            const hashed_password = await bcrypt.hash(user.password, salt);
            user.password = hashed_password;
        }
    }
});

User
.sync({ force: true })
.then(() => console.log('Created table `user`'))
.catch(console.log)

module.exports = User;