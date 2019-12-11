const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
const config = require('../../config');


aws.config.update({
  secretAccessKey: config.AWS_ACCESS_KEY,
  accessKeyId: config.AWS_ACCESS_ID,
  region: 'us-east-2',
})

const s3 = new aws.S3({
  endpoint: 'https://fierce-plateau-59242.herokuapp.com/test-bucket',
  s3BucketEndpoint: true,
});
console.log(s3.config.update)

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'test-bucket',
    acl: 'bucket-owner-full-control',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function(req, file, callback){
      console.log('Metadata Callback', file)
      callback(null, {fieldName: file.fieldname})
    },
    key: function (req, file, callback) {
      console.log('Key Callback', file)
      callback(null, Date.now().toString())
    }
  })
})

module.exports = upload;