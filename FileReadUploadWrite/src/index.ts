import express from "express";

import UploadRoutes from "./api/routes/upload.route";
import DownloadRoutes from "./api/routes/download.route";

import { PORT } from "./constants";

const app = express();

app.get("/", (req, res) => {
  res.send({ message: "Server Running..." });
});

app.use("/api", UploadRoutes);
app.use("/download", DownloadRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
