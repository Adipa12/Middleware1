const { log } = require("console");
const express = require("express");

const server = express();
const PORT = 8081

server.use(express.json());

const stringsInArray =(arr)=>{ // to check the array inside is taking sring or not
    let flag = true;
    arr.forEach((el)=>{
        if(typeof el !=="string"){
            flag = false;
            return;
        }
    });
    return flag;
}


const validateMiddleware = (req,res,next)=>{
    let { ID, Name, Rating, Description, Genre, Cast } = req.body;
    console.log(ID,Name,Rating,Description,Genre,Cast);
    let errorMsg ="";
    if(typeof ID !== 'number'){
        errorMsg += "ID must be a number"
    }
    if(typeof Name !== 'string'){
        errorMsg += "Name must be a string"
    }
    if(typeof Rating !== 'number'){
        errorMsg += "Rating must be a number"
    }
    if(typeof Description !== 'string'){
        errorMsg += "Description must be a string"
    }
    if(typeof Genre !== 'string'){
        errorMsg += "Genre must be a string"
    }
    if(!Array.isArray(Cast) || !stringsInArray(Cast)){
        errorMsg += "cast must be an array of string";
    }
    if(errorMsg){
        return res.status(400).json({
            message: "bad request. some data is incorrect",
            note: errorMsg,
        });
    }
    next();
};
// server.use(myMiddleware);  // when you want middleware invoked for each end point

server.post("/",validateMiddleware,(req,res)=>{  // it is used for specific end points
    console.log("It is my users end point");
    res.send("you hit the users endpoint!");
})
server.get("/cart",(req,res)=>{
    console.log(`This is my cart end point`);
    res.send(`you hit the cart end point`);
})
server.listen(PORT,(req,res)=>{
    console.log("port 8081 is listing.");
})