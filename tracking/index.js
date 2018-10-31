let path = require('path');
const indexPath = path.join(__dirname,'/public');
const express = require('express');
let app = new express();
const http = require('http');
const socketIo = require('socket.io');
let {db} = require('./db.js');

app.use(express.static(indexPath));

let server = http.createServer(app);
let io = socketIo(server);
let locationsMap = new Map();
let {USER} = require('./user');




console.log('user model-->',USER);
io.on('connection',(socket)=>{


      socket.on('update_Location',(data)=>{
          let dataToBeupdated = {} ;
          dataToBeupdated.user_id = socket.id ;
          dataToBeupdated.location = {};
          dataToBeupdated.location.lat = data.lat ;
          dataToBeupdated.location.lng = data.lng ;
          USER.update({user_id: socket.id},dataToBeupdated,(err,res)=>{

          })

      })

    socket.on('register_User',()=>{

        let user = new USER() ;
        user.user_id = socket.id ;
        user.location.lat = null ;
        user.location.lng = null ;
        user.save((err,res)=>{

        })
        locationsMap.set(socket.id,{lat : null , lng : null});
    })

    socket.on('request_Location',()=>{
        USER.find({}).lean().exec((error,responses)=>{

            socket.emit('location',responses);
        })

    })


    socket.on('disconnect',()=>{
        USER.remove({user_id:socket.id},(err,response)=>{
            console.log("err=>",err);
            console.log("response",response);
        })
    })
})

server.listen(3000,()=>{
    console.log("Server is runnign ar port : 3000");
})
