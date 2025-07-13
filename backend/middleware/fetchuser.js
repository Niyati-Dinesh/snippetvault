//fetch user middleware to authenticate the user and fetch their id

//---------imports-----------------------------
const jwt = require("jsonwebtoken");
const User = require("../models/users");
require("dotenv").config({ path: __dirname + "/../../.env" });
const JWT_SECRET = process.env.JWT_SECRET;

//---------------------------------------------

const fetchuser = async (req, res, next) => {
  const token = req.header("authToken");
  if (!token) {
    return res.status(401).json({ error: "Missing token" });
  }

  try {
    const data = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(data.users.id).select("-password");
    next();
  } catch (error) {
    console.error("Error in fetching user:", error.message);

    // 🧠 Distinguish token expiration
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "TokenExpired" });
    }

    res.status(401).json({ error: "InvalidToken" });
  }
};


module.exports = fetchuser;
