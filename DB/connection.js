import { Sequelize } from 'sequelize';
const sequelize = new Sequelize('blogsystem2', 'root', '' , {
host: 'localhost',
//port:3000,
dialect:'mysql' 
});

export const connectDb = async()=>{
    try{
        return await sequelize.sync({alter:false});
    }catch(error){
        console.log("error to connect db",error);
    }
}
export { sequelize };
export default connectDb;