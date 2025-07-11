const jwt = require("jsonwebtoken");
const Snippets = require("../models/snippets");
const express = require("express");
const router = express.Router();
require("dotenv").config({ path: "../.env" }); // if running from /backend
const { body, validationResult } = require("express-validator");
const fetchUser = require("../middleware/fetchuser");
const JWT_SECRET = process.env.JWT_SECRET;
console.log("manage.js loaded ✅");

//Route1: post - /api/routes/manage/createsnippet Route to add a new snippet
router.post(
  "/createsnippet",
  fetchUser,
  [body("title", "Title is required").exists()],
  async (req, res) => {
    // first validate body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ error: errors.array()[0].msg });
    }

    const { title, about, category, tags, code, followup } = req.body;

    try {
      // user is already authenticated using fetchUser middleware
      const snippet = await Snippets.create({
        uid: req.user.id, // req.user.id is set by fetchUser middleware
        title,
        about,
        category,
        tags,
        code,
        followup,
      });
      // .create() saves the snippet automatically
      console.log("Snippet created successfully");
      return res.status(200).json({ snippet });
    } catch (error) {
      console.error("Error in creating snippet:", error.message);
      return res.status(500).send("Internal Server error");
    }
  }
);

//Route2: post - /api/routes/manage/updatesnippet/:id Route to update an existing snippet
router.put("/updatesnippet/:id", fetchUser, async (req, res) => {
  // no need to validate body here, optional fields
  const { title, about, category, tags, code, followup } = req.body;

  try {
    // find the snippet by id
    const snippetId = req.params.id;
    const snippet = await Snippets.findById(snippetId);

    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    // only the owner of the snippet can update it
    if (snippet.uid.toString() !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    // update only if the fields are present in body, else keep old
    const updatedSnippet = await Snippets.findByIdAndUpdate(
      snippetId,
      {
        title: title || snippet.title,
        about: about || snippet.about,
        category: category || snippet.category,
        tags: tags || snippet.tags,
        code: code || snippet.code,
        followup: followup || snippet.followup,
      },
      { new: true, runValidators: true } // new:true returns the updated snippet, runValidators ensures schema validation
    );

    if (updatedSnippet) {
      console.log("Snippet updated successfully");
      return res.status(200).json({ snippet: updatedSnippet });
    }
  } catch (error) {
    console.error("Error in updating snippet:", error.message);
    return res.status(500).send("Internal Server error");
  }
});

//Route3: post - /api/routes/manage/deletesnippet/:id Route to delete a snippet
router.delete("/deletesnippet/:id", fetchUser, async (req, res) => {
  try {
    // find the snippet by id
    const snippetId = req.params.id;
    const snippet = await Snippets.findById(snippetId);

    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    // only the owner of the snippet can delete it
    if (snippet.uid.toString() !== req.user.id) {
      return res.status(403).json({ error: "Access denied" });
    }

    await Snippets.findByIdAndDelete(snippetId);
    console.log("Snippet deleted successfully");
    return res.status(200).json({ message: "Snippet deleted successfully" });
  } catch (error) {
    console.error("Error in deleting snippet:", error.message);
    return res.status(500).send("Internal Server error");
  }
});

//Route4: get - /api/routes/manage/fetchsnippet Route to fetch all the snippets of the user
router.get("/fetchsnippet", fetchUser, async (req, res) => {
  try {
    // user is already authenticated by fetchUser middleware
    const snippets = await Snippets.find({ uid: req.user.id });

    if (snippets.length === 0) {
      return res.status(200).json({
        snippets: [],
        message: "Add some snippets to view them",
      });
    }

    console.log("Snippets fetched successfully");
    return res.status(200).json({ snippets });
  } catch (error) {
    console.error("Error in fetching snippets:", error.message);
    return res.status(500).send("Internal Server error");
  }
});

module.exports = router;
