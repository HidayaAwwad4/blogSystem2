import { DataTypes } from 'sequelize';
import { sequelize } from './../connection.js';
import userModel from './user.model.js';
import blogModel from './blog.model.js';
const commentModel = sequelize.define('Comment', {
    description: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
});
/*commentModel.belongsTo(userModel);
commentModel.belongsTo(blogModel);*/
userModel.hasMany(commentModel);
blogModel.hasMany(commentModel);
export default commentModel;