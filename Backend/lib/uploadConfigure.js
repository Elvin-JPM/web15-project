const multer = require('multer');
const path = require('node:path');

// Storage configuration
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    const ruta = path.join(__dirname, '..', 'uploads', 'images');
    callback(null, ruta);
  },
  filename: function(req, file, callback) {
    const filename = `${file.fieldname}-${Date.now()}-${file.originalname}`;
    callback(null, filename);
  }
})

// Upload configuration
const upload = multer({ storage });

module.exports = upload;