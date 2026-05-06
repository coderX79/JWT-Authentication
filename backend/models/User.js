const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,    
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ["admin","teacher","student", "orgHead"],
        default: "student"
    },
    refreshToken: {
        type: String,
        default: null
    }
},{timestamps: true}    
);


//this middleware will be executed before saving a user to the database, it will hash the password if it has been modified or is new
userSchema.pre("save", async function(){
    // Only hash the password if it has been modified (or is new)
    if(!this.isModified("password")){
        return
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

//this method will be used to compare the password entered by the user with the hashed password stored in the database
userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model("User", userSchema)

module.exports = User

//this file defines the User model using Mongoose. It includes fields for name, email, password, and role. The password is hashed before saving to the database, and there is a method to compare a candidate password with the stored hashed password.