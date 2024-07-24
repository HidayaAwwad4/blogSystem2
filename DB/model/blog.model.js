import { DataTypes } from 'sequelize';
import { sequelize } from './../connection.js';
import userModel from './user.model.js';
const blogModel = sequelize.define('Blog', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
blogModel.belongsTo(userModel);
userModel.hasMany(blogModel);
export default blogModel;