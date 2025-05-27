import mongoose, { Schema ,model} from "mongoose";

const companySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  logo: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required:true
  },

},{timestamps:true});


export default Company = mongoose.model("Company", userSchema);