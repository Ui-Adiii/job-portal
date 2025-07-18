import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
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
      default:''
    }
  },
},{timestamps:true});

const User = mongoose.model("User", userSchema);

export default User 