import { Router } from "express";
import commentModel from "../../../DB/model/comment.model.js"
const app = Router({caseSensitive:true});

app.post('/',async(req,res)=>{
    try{
        const {description,BlogId,UserId} = req.body;
        await commentModel.create({description,BlogId,UserId});
        return res.status(201).json({message:"success"});
    }catch(error){
        return res.status(500).json({message:"catch error",error});
    }
});
app.get('/',async(req,res)=>{
    try{
        const {BlogId} = req.body;
    const blogs = await commentModel.findAll({
        attributes: ['description'],
        where: {
            BlogId: BlogId,
        },
    });
    return res.status(200).json({message:"success",blogs:blogs});
}catch(error){
    return res.status(500).json({message:"catch error",error});
}
});

app.put('/:id',async(req,res)=>{
    const {id} = req.params;
    const {description} = req.body;
    const comment = await commentModel.update(
        {description:description},
        {where :{id:id}}
    );
    if(!comment[0]){
        return res.status(404).json({message:"blog not found"});
    }
    return res.status(200).json({message:"success"});
});

app.delete('/:id',async(req,res)=>{
    const {id} = req.params;
    const comment = await commentModel.destroy({
        where :{
            id:id
        }
    });
    if(!comment){
        return res.status(404).json({message:"user not found"});
    }
    return res.status(200).json({message:"success"});
});



export default app;