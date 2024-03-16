const express = require("express");
const { User } = require("../db");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../config");
const { authMiddleware } = require("../middleware");

const router = express.Router();

const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string()
})



router.post('/signup', signupBody,async (req,res)=>{
   const {success} = signupBody.safeParse(req.body);
   if(!success){
    return res.status(411).json({msg:"Error creating User/incorrect input"});
   }

   const existingUser =  await User.findOne({
    username: res.body.username,
   });

   if(existingUser){
    return res.status(411).json({msg:"email already taken/Incorrect input"});
   }

    const user = new User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });
    var hashedPassword = await user.createHash(password);
    user.password = hashedPassword;
    await user.save();

    const userId = user._id;
    const token = jwt.sign({userId},JWT_SECRET);


    return res.status(200).json({message:"User added succesfully",
    token:token
    }); 


}); 

const updateBody = zod.object({
    username:zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})
router.put('/update',authMiddleware,async (req,res)=>{
    const {success} = updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({msg:"Error creating User/incorrect input"});
    }
    await User.updateOne({_id: req.userId},req.body);
    res.json({msg:"Updated Successfully!"});
});
module.exports={router};