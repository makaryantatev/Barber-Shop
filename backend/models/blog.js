import mongoose from "mongoose";

const ParagraphSchema = new mongoose.Schema({
  t: {
    type: String,
    required: true,
  },
  content: {
    type: [String],
    required: true,
  },
  list: {
    type: [String],
    default: [],
  }
}, { _id: false });

const BlogSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
  },
  img: {
    type: String,
  },
  text1: {
    type: String,
  },
  paragraphs: {
    type: [ParagraphSchema],
    default: [],
  }
}, { timestamps: true });

const Blog = mongoose.model("blogs", BlogSchema);
export default Blog;