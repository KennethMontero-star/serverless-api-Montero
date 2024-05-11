const express = require ('express');
const AuthorModel = require('../models/author');
const { isNull } = require('util');

const router = express.Router();


//get
router.get('/',async(req,res)=>{
    try{
        const author = await AuthorModel.find();
        res.json(authors);

    }catch(err){
        res.status(500).json({message: err.message});
    }
});

router.get('/:id',getAuthor,(req,res)=>{
    res.json(res.author);
});

//create

router.post ('/', async(req,res)=>{
    try{
        if (!req.body.name || !req.body.age){
            return res.status(400).json({message:'Name afe are required'});
        
    }

    const existingAuthor = await AuthorModel.findOne({name: req.body.name});
    if (existingAuthor){
        return res.status(400).json({message:'Author already exists'});
    }

    const author = new AuthorModel(req.body);
    const newAuthor = await author.save();
    res
    .status(201)
    .json({message: ' Author created succesfully', author:newAuthor});
    }catch(err){
        res.status(400).json({message:err.message});
    }
});

//update

router.patch ('/:id', getAuthor,async (req,res)=>{
    try{
        if (req.body.name = null ){
            res.author.name = req.body.name;
        }
        const updateAuthor = await res.author.save();
        res.json(updatedAuthor);
    }catch (err){
        res.status(400).json({message: res.author.save});
    }
});

router.put ('/:id',getauthor, async(req,res)=>{
    try{
        const updateAuthor = await AuthorModel.findByIdAndUpdate(
            req.params.id,
            res.body,
            {new:true}
        );
        res.json(updatedAuthor);
    }catch (err){
        res.status(400).json({message:err.message});
    }
});


//delete

router.delete('/:id', getAuthor, async(req,res)=>{
    try{
        await AuthorModel.findByIdAndDelete(req.param.id);
        res.json ({message:'Author deleted'});
    }catch (err){
        res.status (500).json({message: err.message});
    }
});

async function getAuthor(req, res, next) {
    try {
        const author = await AuthorModel.findById(req.params.id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }
        res.author = author;
        next();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

 module.exports =router