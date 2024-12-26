var express = require('express');
var router = express.Router();
var UserModel = require('../Models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add', function(req, res, next) {
  res.render('add', { title: 'Express' });
});

router.post('/add', function(req, res, next) {
  var bodydata ={
    name: req.body.txt1,
    mobile: req.body.txt2,
    email: req.body.txt3,
    password: req.body.txt4
    
  }
 var mydata = UserModel(bodydata);
 mydata.save()
   .then(() => res.send("Record Inserted"))
   .catch(err => console.log("Error In Query" + err));
});


// router.get('/display', function(req, res, next) {
//   UserModel.find()
//   .then(data=>{
//     console.log(data);
//   })
//   .catch(err=>console.log("Error" +err));
// });

router.get('/display', function(req, res, next) {
UserModel.find()
.then(data=>{
  console.log(data);
  res.render('display', {mydata:data});
})
.catch(err=>console.log("Error" +err));
});

router.get('/show/:id', function(req, res, next) {
  var myid = req.params.id;
  UserModel.findById(myid)
  .then(data=>{
    console.log(data);
    res.render('show', {mydata:data});
  })
  .catch(err=>console.log("Error" +err));
});
router.get('/delete\/:id', function(req, res, next) {
  var myid = req.params.id;
  UserModel.findOneAndDelete({_id:myid})
  .then((data)=>{
    console.log("Record Deleted")
    res.redirect('/display')
  })
  .catch(err=>console.log("Error" +err));
  });

  router.get('/edit/:id', function(req, res, next) {
    var myid = req.params.id;
    UserModel.findById(myid)
    .then(data=>{
      res.render('edit', {mydata:data});
    })
    .catch(err=>console.log("Error" +err));
  });


  
  router.post('/update/:id', function(req, res, next) {
    var myid = req.params.id;

    var mydata = {
      name: req.body.txt1,
      mobile: req.body.txt2,
      email: req.body.txt3
    }
    UserModel.findByIdAndUpdate({_id:myid}, mydata)
    .then(data=>{
      console.log("Record Updated")
      res.redirect('/display')
    })
    .catch(err=>console.log("Error" +err));
  });

module.exports = router;
