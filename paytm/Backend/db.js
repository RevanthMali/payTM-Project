const mongoose = require('mongoose');
const bcrypt = require("bcrypt");
mongoose.connect("your-mongoURL")
.then(()=>{
   console.log("connected to MongoDB");
});
 const userSchema = new mongoose.Schema({
    username: {
      type:String,
      required:true,
    },
    password:{
      type:String,
      required:true,
    } ,
    firstName:{
      type:String,
      required:true,
   },
   lastName:{
      type:String,
      required:true,
   }
 });
userSchema.methods.createHash = async function(plainTextPassword){
   const saltRounds = 10;
   const salt = await bcrypt.genSalt(saltRounds);
   return await bcrypt.hash(plainTextPassword,salt)
}
userSchema.methods.validatePassword= async function(candidatePassword){
         return await bcrypt.compare(candidatePassword,this.password_hash);
}
 const User = mongoose.model('User',userSchema);


module.exports={User}