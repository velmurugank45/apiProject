const mongoose  = require("mongoose");
const userSchema = mongoose.Schema({
    username: {
         type: String ,
         required:true,
         trim:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type: String,
        required:true,
        minlength:7,
        trim:true,
        validate(value){
            if(value.toLowerCase().includes('password')){
               throw new Error("Password cannot contain password") 
            }
        }
    },
    age: { 
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error("Age should be positive number")
            }
        },
    }
})
const UserDetails = mongoose.model("UserDetails", userSchema);

module.exports = UserDetails;