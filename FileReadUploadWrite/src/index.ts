import express from "express";

import UploadRoutes from "./api/routes/upload.route";
import DownloadRoutes from "./api/routes/download.route";

import { PORT } from "./constants";
import logger from "./config/logger";

const app = express();

app.get("/", (req, res) => {
  logger.log({
    level: "info",
    message: "Pass an object and this works",
    additional: "properties",
    are: "passed along",
  });

  logger.info({
    message: "Use a helper method if you want",
    additional: "properties",
    are: "passed along",
  });

  res.send({ message: "Server Running..." });
});

app.use("/api", UploadRoutes);
app.use("/download", DownloadRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
