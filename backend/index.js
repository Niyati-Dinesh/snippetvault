const connect=require('./dbconnection')
connect()
const express=require('express');
const app=express();
app.use(express.json());


//define api routes

app.listen(7777, ()=>{
    console.log("SnippetVault listening to http://localhost:7777");
})