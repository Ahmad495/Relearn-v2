const express =require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const ejsMate=require('ejs-mate');


app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req,res)=>{
    res.send("Working so far");
})

app.listen(3000, ()=>{
    console.log("Listening on port 3000!");
})