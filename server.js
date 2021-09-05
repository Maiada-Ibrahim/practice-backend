const express = require('express');
const cors = require('cors');
const server = express();
server.use(cors())

server.use(express.json())
require('dotenv').config()

const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/myapp');
mongoose.connect('mongodb://maiadadb:0000@cluster0-shard-00-00.ii9w9.mongodb.net:27017,cluster0-shard-00-01.ii9w9.mongodb.net:27017,cluster0-shard-00-02.ii9w9.mongodb.net:27017/photodatabase?ssl=true&replicaSet=atlas-114hrc-shard-0&authSource=admin&retryWrites=true&w=majority');
const PORT = process.env.PORT ;
const{test,handlegetalldata,handleadduserdata,handledeletedata,update,handlegetuserdata}=require('./comp/helper')




server.get("/test", test);
server.get("/getalldata", handlegetalldata);
server.post("/adduserdata", handleadduserdata);
server.delete('/deletedata/:id', handledeletedata);
server.put('/update/:id',update)
server.get('/getuserdata',handlegetuserdata)
  








































server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
