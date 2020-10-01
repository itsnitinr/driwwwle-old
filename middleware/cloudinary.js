const config = require("config");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const path = require("path")
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: config.get("CLOUDINARY_CLOUD_NAME"),
  api_key: config.get("CLOUDINARY_API_KEY"),
  api_secret: config.get("CLOUDINARY_API_SECRET"),
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "driwwwle",
  },
});

const upload = multer({ 
    storage,
    fileFilter: function (req, file, callback) {
      var ext = path.extname(file.originalname);
      var errMsg;
      if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        errMsg = 'Only images are allowed'
        req.fileValidationError = errMsg;
        return callback(null, false, new Error(errMsg));
      }
      callback(null, true)
    }}).array("postImage", 5);

module.exports = upload;
