const express = require('express');
const { contactModel } = require('../model/contact.model');
const contactRoute = express.Router();


contactRoute.get("/",async(req,res)=>{
    try{
        const contact =await contactModel.find();
        res.status(200).send(contact)
    }
    catch(e){
        res.status(400).send({"error":e.message})
    }
})


contactRoute.post("/add",async(req,res)=>{
    const {name,email,phone,label}=req.body
    try{
        const contact = new contactModel({name,email,phone,label,booked_slots:[]});
        await contact.save();
        res.status(200).send({"contactAdded":contact})
    }
    catch(e){
        res.status(400).send({"error":e.message})
    }
})

contactRoute.patch("/update/:id",async(req,res)=>{
    const {id}=req.params
    try{
        await contactModel.findByIdAndUpdate({_id:id},req.body);
        res.status(200).send("updated")
    }
    catch(e){
        res.status(400).send({"error":e.message})
    }
})

contactRoute.delete("/delete/:id",async(req,res)=>{
    const {id}=req.params
    try{
        await contactModel.findByIdAndDelete({_id:id});
        res.status(200).send("deleted")
    }
    catch(e){
        res.status(400).send({"error":e.message})
    }
})


module.exports={contactRoute}