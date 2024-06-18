import mongoose from "mongoose";

const codeBlockSchema = new mongoose.Schema({
  id: Number,
  title: String,
  code: String,
  solution: String,
});

const CodeBlock = mongoose.model("CodeBlock", codeBlockSchema);

export default CodeBlock;
