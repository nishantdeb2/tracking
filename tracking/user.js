
const mongoose = require('mongoose');


   
   let user  = new mongoose.Schema({
       user_id : { type : String} ,
       location : {
           lat : { type  : Number},
           lng : { type  : Number}
       }
   })

   
   let USER = mongoose.model('Users',user);

   module.exports ={
       USER
   }