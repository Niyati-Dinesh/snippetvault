//--------Mongoose Connection---------------
const connect = require("./dbconnection");
connect(); 

//--------Express----------------------------
const express = require("express");
const app = express();

// Middleware to parse JSON
app.use(express.json());
const cors = require("cors");

//--------Use frontend and backend concurrently-----------------
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true, // optional, needed if using cookies or auth headers
}));

//-------------API Routes--------------------

// Define API routes
app.use("/api/routes/auth", require("./routes/auth"));
app.use("/api/routes/manage", require("./routes/manage"));

// Test route (root)
app.get("/", (req, res) => {
  res.send("SnippetVault is live! 🛡️✨");
});

//---------------Start server------------------

app.listen(7777, () => {
  console.log("SnippetVault listening on http://localhost:7777");
});
