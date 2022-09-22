const express = require('express');
const router = express.Router()

var privateData = require('../model/privateData')
var blockData=require('../model/blockData')
var roomData=require('../model/roomData')
var roomChatData=require('../model/roomChatData')
var userdata=require('../model/userData')







router.get('/getUsers',(req,res)=>{
    res.header("Acces-Control-Allow-Origin","*");
    res.header("Acces-Control-Allow-Methods: GET, POST, PATH, PUT, DELETE, HEAD"); 
    userdata.find().then((data)=>{
        res.send(data)
    }) 
})

router.get('/getUser/:id',(req,res)=>{
    res.header("Acces-Control-Allow-Origin","*");
    res.header("Acces-Control-Allow-Methods: GET, POST, PATH, PUT, DELETE, HEAD"); 
    let id=req.params.id

    userdata.findOne({_id:id}).then((data)=>{
        res.send(data)
    }) 
})

router.get('/chatHistory/:item', (req, res) => {
    const room = req.params.item;
    privateData.find({ room:room  })
      .then((otheruserdetail)=>{
          res.send(otheruserdetail);
      });
  })

  router.get('/groupChatHistory/:item', (req, res) => {
    const room = req.params.item;
    roomChatData.find({ room:room  })
      // Userdata.findOne({"email":email})
      .then((otheruserdetail)=>{
          res.send(otheruserdetail);
       // console.log(otheruserdetail)
      });
  })

  router.get('/getGroups',(req,res)=>{
    res.header("Acces-Control-Allow-Origin","*");
    res.header("Acces-Control-Allow-Methods: GET, POST, PATH, PUT, DELETE, HEAD"); 
    roomData.find().then((data)=>{
        res.send(data)
    }) 
})

router.post('/createGroup',(req,res)=>{

    roomData.findOne({"name":req.body.name})
    .then((data)=>{
        if(data){
            res.status(401).send('Group Already Exist')
        }else{
            let group={
                name:req.body.name
            }
            console.log(group);
            var groupchat=new roomData(group);
            groupchat.save();
            return res.status(200).send(); 
        }
    })
})

router.get('/getGroup/:id',(req,res)=>{
    res.header("Acces-Control-Allow-Origin","*");
    res.header("Acces-Control-Allow-Methods: GET, POST, PATH, PUT, DELETE, HEAD"); 
    let id=req.params.id

    roomData.findOne({_id:id},(err,data)=>{
        res.send(data)
    }) 
})

router.post('/blockUser',(req,res)=>{
    console.log("block");
    console.log(req.body);
    var blockchat={
        from:req.body.from,
         to:req.body.to,
       }
       var blockchat=new blockData(blockchat);
       blockchat.save();
       return res.status(200).send(); 
})

router.post('/unBlockUser',(req,res)=>{
    console.log("block");
    console.log(req.body);
    blockData.findOneAndDelete({"from":req.body.from,"to":req.body.to})
    .then(()=>{
        res.send()
    })
})

router.get('/blockList',(req,res)=>{
    blockData.find().then((data)=>{res.send(data)})
})

router.post('/joinGroup',(req,res)=>{
    console.log(req.body);
    roomData.findOneAndUpdate({_id:req.body.room}, 
        {$push:{members:req.body.mail}
    }).then((data)=>{
        console.log(data);
        res.send()
    })

})

router.post('/leftGroup',(req,res)=>{
    console.log(req.body);

                roomData.findOneAndUpdate({_id:req.body.room}, 
        {$pull:{members:req.body.mail}
    }).then((data)=>{
         console.log(data);
         res.send()
     })
     .catch((err)=>{
         console.log(err);
     })
 
})

module.exports = router;
