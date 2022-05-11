import express from "express";
import formidable from "formidable";

import { uploadFileM } from "./middlewares";

const PORT = process.env.PORT || 3000;

const app = express();
// import multer from "multer";
// const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.send({ message: "Server Running..." });
});

app.post("/profile", uploadFileM.single("avatar"), (req, res, next) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  console.log("A ", req.file);
  console.log("B ", req.files);
  console.log("C ", req.body);

  res.send({ message: "Upload Success" });
});

const form = formidable({
  multiples: true,
  keepExtensions: true,
  uploadDir: "uploads",
});
app.post("/api/upload", (req, res, next) => {
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    res.json({ fields, files });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
