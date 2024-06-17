import express from "express";
import { getCodeBlocks } from "../Controllers/codeBlocksController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Code Sharing App");
});

router.get("/codeBlocks", getCodeBlocks);

export default router;
