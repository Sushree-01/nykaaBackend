const express = require("express");
const { ProductModel } = require("../models/product.model");
const { auth } = require("../middleware/auth.middleware");

const productRouter=express.Router();
productRouter.use(auth);

productRouter.get("/products",async(req,res)=>{
    try{
        const products=await ProductModel.find({});
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

productRouter.get("/products/:id",async(req,res)=>{
    const productId=req.params.id;
    try {
        const product=await ProductModel.findById(productId);
        if (!product){
            return res.status(404).json({error:"Product not found"});
        }
        res.status(200).json(product);
    } catch(err){
        res.status(500).json({error:err.message});
    }
});

productRouter.post("/products",async (req, res)=>{
    try{
        const product=new ProductModel(req.body);
        await product.save();
        res.status(201).json({message:"New product has been added",product});
    } catch(err){
        res.status(400).json({error:err.message});
    }
});

productRouter.patch("/products/:id",async(req,res)=>{
    const userId=req.body.uid;
    const productId=req.params.id;

    try{
        const product=await ProductModel.findById(productId);
        if(!product){
            return res.status(404).json({error:"Product not found"});
        }

        if(userId!==product.uid){
            return res.status(401).json({ error:"Not authorized to update this product"});
        }

        const updatedProduct=await ProductModel.findByIdAndUpdate(
            productId,
            req.body,
            {new: true} 
        );

        res.status(204).json({message:`${updatedProduct.name} has been updated`,updatedProduct});
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

productRouter.delete("/products/:id",async(req,res)=>{
    const userId=req.body.uid;
    const productId=req.params.id;

    try{
        const product=await ProductModel.findById(productId);
        if(!product){
            return res.status(404).json({error:"Product not found"});
        }

        if(userId!==product.uid){
            return res.status(401).json({error:"Not authorized to delete this product"});
        }

        await ProductModel.findByIdAndDelete(productId);
        res.status(202).json({message:`${product.name} has been deleted`});
    }catch(err){
        res.status(500).json({error:err.message});
    }
   
});

module.exports={
    productRouter
};
