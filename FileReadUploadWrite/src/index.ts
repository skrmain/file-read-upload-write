import express from "express";
import swaggerUi from "swagger-ui-express";

import UploadRoutes from "./api/routes/upload.route";
import DownloadRoutes from "./api/routes/download.route";

import { PORT } from "./constants";
import logger from "./config/logger";

const app = express();

app.use(express.static("public"));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

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

import { Get, Route } from "tsoa";

interface PingResponse {
  message: string;
}

@Route("ping")
export default class PingController {
  @Get("/")
  public async getMessage(): Promise<PingResponse> {
    return {
      message: "pong",
    };
  }
}

app.get("/ping", async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

app.use("/api", UploadRoutes);
app.use("/download", DownloadRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
