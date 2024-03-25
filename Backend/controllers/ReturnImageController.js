const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

class ReturnImageController {
  async returnImage(req, res) {
    const imageName = req.params.imageName;
    const imagePath = path.join(
      __dirname,
      "..",
      "uploads",
      "final_images",
      imageName
    );

    // Check if the file exists
    if (fs.existsSync(imagePath)) {
      // Send the image file as a response
      res.sendFile(imagePath);
    } else {
      // Return 404 if the image does not exist
      res.status(404).send("Image not found");
    }
  }
}

module.exports = ReturnImageController;
