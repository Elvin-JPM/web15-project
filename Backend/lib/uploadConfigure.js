const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Storage configuration
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    const ruta = path.join(__dirname, '..', 'uploads', 'original_images');
    ensureDirectoryExists(ruta);
    callback(null, ruta);
  },
  filename: function(req, file, callback) {
    const filename = `${file.fieldname}-${Date.now()}-${file.originalname}`;
    callback(null, filename);
  }
});

// Function to ensure directory exists
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Upload configuration
const upload = multer({ storage });

module.exports = upload;
