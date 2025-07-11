//---------imports go here-------------------

const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Snippets = require("../models/snippets");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
require("dotenv").config({ path: __dirname + "/../../.env" });
const JWT_SECRET = process.env.JWT_SECRET;
const { body, validationResult } = require("express-validator");

//---------Route definitions go here------------------------------

//Route1: post - /api/routes/auth/signup Route to create a new user
router.post(
  "/signup",
  [
    body("email", "Enter a valid email").isEmail().exists(),
    body("password", "Password should be greater than 5 characters")
      .exists()
      .isLength({ min: 5 }),
  ],

  async (req, res) => {
    //first validate body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    const { email, password } = req.body;
    try {
      //check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        console.log("User already exists");
        return res.status(400).json({
          error: "User already exists with this email , please signin..",
        });
      }
      //New user creation
      //first hash the password
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(password, salt);
      //after hashing password , add user to database
      let newUser = await User.create({
        email,
        password: secPass,
      });
      await newUser.save();
      //create a token for the user
      const data = {
        users: {
          id: newUser._id,
          //newUser is a mongoose object, so we can access the id directly
        },
      }; // user is a object with only id of the new user created
      const userToSend = newUser.toObject();
      delete userToSend.password;
      newUser=userToSend
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log("User created successfully");
      res.status(200).json({ newUser, authToken });
    } catch (error) {
      console.error("Error in creating user:", error.message);
      res.status(500).send("Internal Server error");
    }
  }
);

//Route2: post - /api/routes/auth/login Route to login a user
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail().exists(),
    body("password", "Password should be greater than 5 characters")
      .exists()
      .isLength({ min: 5 }),
  ],
  async (req, res) => {
    //first validate body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    try {
      //check if such user exists
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        console.log("User does not exist, please signup first..");
        return res
          .status(400)
          .json({ error: "User does not exist,please signup first.." });
      }
      //check if password is correct
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        console.log("Incorrect password");
        return res.status(400).json({ error: "Incorrect password" });
      }
      //create a token for the user
      const data = {
        users: {
          id: user._id,
        },
      };
      console.log(data.users.id);
      const authToken = jwt.sign(data, JWT_SECRET);
      console.log("User logged in successfully");
      const userToSend = user.toObject();
      delete userToSend.password;
      newUser=userToSend
      res.status(200).json({ newUser , authToken });
    } catch (error) {
      console.error("Error in logging in user:", error.message);
      res.status(500).send("Internal Server error");
    }
  }
);

module.exports = router;
