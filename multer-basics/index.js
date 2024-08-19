// src/app.js
const upload = require("./config/cloudinary");

const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.set("view engine", "ejs");
// Serve static files from the 'public' directory
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("homepage");
});
// Route to handle image upload
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.json({ file: req.file, body: req.body });

  // Send the Cloudinary image details as the response
  //   res.json({
  //     imageUrl: req.file.path, // URL of the uploaded image
  //     imageId: req.file.filename, // Cloudinary ID of the image
  //   });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
