
const MESSAGE = require('../model/Message')
const roomChatData = require('../model/roomChatData')
const privateData = require('../model/privateData')

const doc ={};

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log("a user connected"+ socket.id);
        // socket.on('join', (data) => {
        //     socket.join(data.room);
        //     socket.broadcast.to(data.room).emit('user joined');
        // });

        socket.on('joinRoom',function(data){
          io.in(data.room).emit('startChatRooms', {message: "welcome"});
          socket.broadcast.to(data).emit('user joined');
        })
        socket.on('sendChat',function(data){
          // console.log(data);
          io.emit('new-message', data );
          // io.in(data.room).emit('startChatRoom', {message: "welcome", user:data.room});
          // socket.broadcast.to(data).emit('user joined');
      
        })


    
        socket.on('sendindvmsg',function(data){
                console.log(data);
                let date_ob = new Date();
                var chatdata={
                  user:data.user,
                  message:data.message,
                  room:data.room,
                  date:new Date().toLocaleDateString(),
                  time:new Date()
                }
                console.log(chatdata);
                var chatdata=new privateData(chatdata);
            chatdata.save().then(()=>{
            })
            io.in(data.room).emit('new_indvmessage', {message:data.message,user:data.user});
              
         
          })
    
          socket.on('sendgrpmsg',function(data){
            console.log(data);
            let date_ob = new Date();
            var chatdata={
              user:data.user,
              message:data.message,
              room:data.room,
              date:new Date().toLocaleDateString(),
              time:new Date()
            }
            console.log(chatdata);
            var chatdata=new roomChatData(chatdata);
        chatdata.save().then(()=>{
        })
        io.in(data.room).emit('new_groupmessage', {message:data.message,user:data.user});
          
     
      })
    
          socket.on('sendimage',function(data){
            let date_ob = new Date();
            var chatdata={
              user:data.user,
              imgfile:data.image,
              room:data.room,
              date:new Date().toLocaleDateString(),
              time:new Date()
            }
            var chatdata=new privateData(chatdata);
           chatdata.save();
           io.in(data.room).emit('new_image', {image:data.image,user:data.user});
          
          })
    
          socket.on('sendgrpimage',function(data){
            let date_ob = new Date();
            var chatdata={
              user:data.user,
              imgfile:data.image,
              room:data.room,
              date:new Date().toLocaleDateString(),
              time:new Date()
            }
            var chatdata=new roomChatData(chatdata);
           chatdata.save();
           io.in(data.room).emit('new_image', {image:data.image,user:data.user});
          
          })
    
        socket.on('message', (data) => {
    
            var chatdata={
                user:data.user,
                message:data.message,
                // room:data.room
              }
    
            var chatdata = new privateData(chatdata);
            chatdata.save();
            // console.log(data);
            io.emit('new message', {user:data.user, message:data.message});
        });
    });

}