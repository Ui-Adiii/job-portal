import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    firstName:{
      type: String,
      required: true,
    },
    lastName:{
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select:false
  },
  role: {
    type: String,
    enum: ["admin", "employee"],
    required: true,
  },
  profile: {
    bio: {
      type: String,
    },
    skills: [{ type: String }],
    resume: {
      type: String
    },
    resumeOriginalName: {
      type: String
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company'
    },
    profilePhoto: {
      type:String,
      default:'https://th.bing.com/th/id/OIP.n1C1oxOvYLLyDIavrBFoNQAAAA?r=0&w=256&h=256&rs=1&pid=ImgDetMain'
    }
  },
},{timestamps:true});

const User = mongoose.model("User", userSchema);

export default User 