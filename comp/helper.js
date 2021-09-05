
const mongoose = require('mongoose');
const axios = require('axios');


module.exports = { test, handlegetalldata, handleadduserdata, handledeletedata,update,handlegetuserdata }


const photoSchema = new mongoose.Schema({
    title: String,
    thumb: String,
    alt_description: String,
    id: String,
    email: String
});
const photomodel = mongoose.model('photomodel', photoSchema);



function test(req, res) {
    res.send("hello world!");
}




async function handlegetalldata(req, res) {
    let search = req.query.search
    let email = req.query.email
    console.log(search)
    let arr=[]
    try {
        let resp = await axios.get(`https://api.unsplash.com/search/photos?client_id=FwcJO2PQq4JjqT2VbrdGhPM7bx6y3YbXG42A0Dw65Xg&query=${search}`);
        resp.data.results.map((value, index) => {
            let myCar = new Photo(value.tags[0].title, value.urls.thumb, value.alt_description, value.id, `${email}`);
            console.log(myCar);
            arr.push(myCar)
        })

        res.send(arr);
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
};

async function handleadduserdata(req, res, next) {
    let { title, thumb, alt_description, email } = req.body;
    await   photomodel.create({ title, thumb, alt_description, email }).then(function (photomodel) {
        console.log('gggggggggggggggg')
        // res.send(photomodel);
        
    }).catch(next);


    photomodel.find({ email }, function (err, userdata) {

        if (err) {

            console.log(err)
        }
        else {
            res.send(userdata)
        }
    })

}
function handlegetuserdata (req,res,next){
    let email=req.query.email
    photomodel.find({email:email}).then(function(photomodel){
        
        res.send(photomodel);
    }).catch(next);
  }

async function handledeletedata(req, res) {
    // let { title, thumb, alt_description, email } = req.body;
    let email = req.query.email
    await photomodel.findOneAndDelete({ _id: req.params.id }).then(function (photomodel) {
        // res.send(photomodel);
    });

    photomodel.find({ email }, function (err, userdata) {
        if (err) {
            console.log(err)
        }
        else {
            res.send(userdata)
        }
    })
}

async function update(req,res,next){
    let{ title, alt_description}=req.body
    let email=req.query.email
   
    await photomodel.findOneAndUpdate({_id: req.params.id},req.body).then(async function(photomodel1){
        await   photomodel.findOne({_id: req.params.id}).then(function(photomodel2){
            // res.send(photomodel2);
        });
    });
    photomodel.find({ email }, function (err, userdata) {
        if (err) {
            console.log(err)
        }
        else {
            res.send(userdata)
        }
    })
}


class Photo {
    constructor(title, thumb, alt_description, id, email) {
        this.title = title;
        this.thumb = thumb;
        this.alt_description = alt_description;
        this.id = id;
        this.email = email
    }
}






