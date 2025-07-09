//fetch user middleware
const jwt = require("jsonwebtoken");
const User = require("../models/users");
require('dotenv').config({ path: '../.env' }); // if running from /backend
const JWT_SECRET = process.env.JWT_SECRET;

//why jwt here?
//because we need to authenticate the user before fetching their data
const fetchuser = async (req, res, next) => {
  //what we need to do here is to get the user from the token which is sent in the header which is the function of next.
  const token = req.header("authToken");
  if (!token) {
    return res
      .status(401)
      .json({ error: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, JWT_SECRET);
    console.log(data);
    req.user = await User.findById(data.users.id).select("-password");
    next(); //call the next middleware or route handler
  } catch (error) {
    console.error("Error in fetching user:", error.message);
    res.status(500).send("Internal Server error");
  }
};

module.exports = fetchuser;