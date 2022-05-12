import { Request, Response } from "express";
import { join } from "path";
import logger from "../../config/logger";

export const DownloadFileService = async (req: Request, res: Response) => {
  if (!req.params.name) {
    logger.info("name not exists in params to download");
    return res.send({ message: "Invalid" });
  }

  const fileName = req.params.name;
  const filePath = join(__dirname, "../../..", "/uploads/");

  res.download(filePath + fileName, (err) => {
    if (err) {
      logger.info("Found invalid path for download");
      res.status(500).send({
        message: "File can not be downloaded: " + err,
      });
    }
  });
};
