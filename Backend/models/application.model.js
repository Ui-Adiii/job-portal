import mongoose, { Schema ,model} from "mongoose";

const applicationSchema = new Schema(
  {
    applicant: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default:'pending'
    }
  },
  { timestamps: true }
);


export default Application = model("Application", applicationSchema);