const express = require("express");
const { User ,Account} = require("../db");
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



router.post('/signup', async (req,res)=>{
   const {success} = signupBody.safeParse(req.body);
   if(!success){
    return res.status(411).json({msg:"Error creating User/incorrect input"});
   }

   const existingUser =  await User.findOne({
    username: req.body.username,
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
    var hashedPassword = await user.createHash(req.body.password);
    user.password = hashedPassword;
    await user.save();

    const userId = user._id;
    // initialize the balance to some random balance just after user signup

    await Account.create({
        userId,
        balance: 1 + Math.random()*10000
    });

    const token = jwt.sign({userId},JWT_SECRET);


    return res.status(200).json({
        message:"User added succesfully",
        token:token
    }); 


}); 
const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})
router.post("/signin", async (req, res) => {
    const { success ,data} = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect email or password"
        })
    }

    const { username, password } = data;
    try {
        const user = await User.findOne({ username });

        if (!user || !user.password == req.body.password) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token,
            user: {
                _id: user._id,
                username: user.username
            }
        });
    } catch (error) {
        console.error("Error while logging in:", error);
        res.status(500).json({
            message: "Error while logging in"
        });
    }

})


//   Updating the user with the data provided
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

// filtering the required users from the database

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})
module.exports=router;