import { DataTypes } from 'sequelize';
import { sequelize } from './../connection.js';

const userModel = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    confirmEmail: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    usertype:{
        type: DataTypes.STRING,
        defaultValue:"user",
    }
});

export default userModel;
