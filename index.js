const express = require('express');
const path = require('path');
const app = express();
const dotEnv = require('dotenv')
dotEnv.config()
app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))


const products = [
    {id:1,label:'product1'},
    {id:2,label:'product2'},
    {id:3,label:'product3'},
    {id:4,label:'product4'}

]
app.get('/',(req,res)=>{
    res.send('WELCOME HOME')
})
app.get('/products',(req,res)=>{
    res.render('products',{title:'PRODUCTSSSS',products:products})
})
app.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`)
})