import express from "express";
let app =express();
let port=3000;
app.get("/",function(req,res){
    res.send("xin chao");
});
app.listen(port,()=>{
    console.log("server is running");
})
