const express = require('express')
const Razorpay = require('razorpay')

let  app  =express()

app.set('view engine','ejs')
// app.use(express.urlencoded({extended:false}))
app.use(express.json());

let KEY_ID= "rzp_test_qRDRpOoJR0OGFp"
let KEY_SECRET = "pOCYTUxxeoTKVJxENaLMbmj2"
const razorpay = new Razorpay({//initailize razorpay 
    key_id:KEY_ID,
    key_secret:KEY_SECRET
})

app.get('/',(req,res)=>{
    res.render('razorpay.ejs',{KEY_ID:KEY_ID})
})


app.post('/order',(req,res)=>{ //make a req from client and client recives an order_id

    let options = {
        amount: 500*100,  // amount in the smallest currency unit
        currency: "INR",
        //receipt: "order_rcptid_11"//we can use an unique idd from npm (like uuid), and generate a recipt everytime you create an order 
      };
      razorpay.orders.create(options, function(err, order) {    //create order from the server , specifies the amt u gonna pay and currency (non mutable)
        console.log(order);
        res.json(order)
      });
})

app.listen(4000,()=>{
    console.log("started")
})
