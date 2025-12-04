import mongoose from "mongoose";

const CreationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Clerk ID or your auth id

    type: {
      type: String,
      enum: ["ARTICLE", "BLOG_TITLE", "IMAGE", "RESUME_REVIEW"],
      required: true,
    },

    title: { type: String },
    content: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Creation", CreationSchema);
