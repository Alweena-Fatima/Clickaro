import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    createdAt:{type:Date,default:Date.now},
    // Add this line. Default "user" means new registers aren't admins automatically.
  role: { type: String, default: "user" },
})

export const User = mongoose.model("User",userSchema)