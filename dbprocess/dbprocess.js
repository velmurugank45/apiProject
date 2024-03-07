const express  = require("express");
const router = express.Router();
const userDetails = require("../schema/userDetails")

//registering  data 
router.post("/registration", async function(req, res){
    const userDetailsObject = req.body;
    try {
        await userDetails.create(userDetailsObject);
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.log(error);
        res.json({ error: 'Failed to register the user' });
    }
})
router.post("/login", async function(req, res){
    try{
        const arr = await userDetails.find(req.body);
        res.json({ 
            values: arr,
            message: 'User login successfully ' });
    }catch(error){
        console.log(error)
        res.json({error: 'Failed to login '});
    }
})
router.post("/forgotPassword", async function(req, res){
    console.log("-------------uuu") 
    console.log(req.body);
    const findObj = {
        username:req.body.username,
        email:req.body.email
    }
    try{
        const arr = await userDetails.findOne(findObj);
        if(arr){
            if(req.body.password === req.body.confirmPassword){
                const updateObj = {
                    password:req.body.password
                }
                try{
                    await userDetails.updateOne(findObj, updateObj).then((result)=>{
                        res.json({ message: 'User updated successfully',
                        result: result });
                    }).catch((error)=>{
                        console.log(error);
                        res.json({ error: 'Failed to update user' });
                    })
                }catch(error){
                    console.log(error)
                    res.json({ error: 'Failed to update user' });
                }
            }else{
                res.json({ 
                    message: 'Your password and confirm password is not equal  ' 
                });
            }
        }else{
            res.json({ 
                message: 'There is no user found' });
        }
    }catch(error){
        console.log(error)
        res.json({error: 'Failed to find the user '});
    }
    
})
module.exports = router;
