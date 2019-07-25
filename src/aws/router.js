const express = require("express");
const router = express.Router();
const upload = require('./multer');

const singleUpload = upload.single('image');

//MOVED TO DOCUMENTS POST
router.post('/image-upload', function(req, res){
  console.log('image-upload')
  singleUpload(req, res, function(err, some) {
    if (err){
      return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}]})
    }
    return res.json({'imageUrl': req.file.location});
  })
})

module.exports = {router};