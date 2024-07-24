import { Router } from "express";
import blogModel from "../../../DB/model/blog.model.js";
import userModel from "../../../DB/model/user.model.js";
import { json } from "sequelize";
const app = Router({caseSensitive:true});

app.post('/',async(req,res)=>{
    try{
        const {title,description,category,UserId} = req.body;
        const user = await userModel.findOne({ where: { id: UserId } });
        if(user.usertype != "admin"){
            return res.status(400).json({message:"not authenticated user"});
        }
        await blogModel.create({title,description,category,UserId});
        return res.status(201).json({message:"success"});
    }catch(error){
        return res.status(500).json({message:"catch error",error});
    }
});

app.get('/',async(req,res)=>{
    try{
    const blogs = await blogModel.findAll();
    return res.status(200).json({message:"success",blogs:blogs});
}catch(error){
    return res.status(500).json({message:"catch error",error});
}
});


app.put('/:id',async(req,res)=>{
    try{
    const {id} = req.params;
    const {title,UserId} = req.body;
    const user = await userModel.findOne({ where: { id: UserId } });
    if(user.usertype != "admin"){
        return res.status(400).json({message:"not authenticated user"});
    }
    const blog = await blogModel.update(
        {title:title},
        {where :{id:id}}
    );
    if(!blog[0]){
        return res.status(404).json({message:"blog not found"});
    }
    return res.status(200).json({message:"success"});
}catch(error){
    return res.status(500).json({message:"catch error",error});
}
});

app.delete('/:id',async(req,res)=>{
    try{
    const {id} = req.params;
    const {UserId} = req.body;
    const user = await userModel.findOne({ where: { id: UserId } });
    if(user.usertype != "admin"){
        return res.status(400).json({message:"not authenticated user"});
    }
    const blog = await blogModel.destroy({
        where :{
            id:id
        }
    });
    if(!blog){
        return res.status(404).json({message:"user not found"});
    }
    return res.status(200).json({message:"success"});
}catch(error){
    return res.status(500).json({message:"catch error",error});
}
});



export default app;