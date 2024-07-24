import { Router } from "express";
import userModel from "../../../DB/model/user.model.js";
import jwt from "jsonwebtoken";
const app = Router({caseSensitive:true});

app.get('/',async(req,res)=>{
    try{
    const users = await userModel.findAll({
        attributes:['name','email']
    });
    return res.status(200).json({message:"success",users:users});
}catch(error){
    return res.status(500).json({message:"catch error",error});
}
});

app.put('/:id',async(req,res)=>{
    const {id} = req.params;
    const {name} = req.body;
    const user = await userModel.update(
        {name:name},
        {where :{id:id}}
    );
    if(!user[0]){
        return res.status(404).json({message:"user not found"});
    }
    return res.status(200).json({message:"success"});
});

app.delete('/:id',async(req,res)=>{
    const {token} = req.headers;
    const decoded = jwt.verify(token,"hidayaPassword");
    if(decoded.username != "Ahmad"){
        return res.status(400).json({message:"not authenticated user"});
    }
    const {id} = req.params;
    const user = await userModel.destroy({
        where :{
            id:id
        }
    });
    if(!user){
        return res.status(404).json({message:"user not found"});
    }
    return res.status(200).json({message:"success"});
});




export default app;