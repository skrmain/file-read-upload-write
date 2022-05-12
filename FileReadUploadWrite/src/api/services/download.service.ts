import { Request, Response } from "express";
import { join } from "path";

export const DownloadFileService = async (req: Request, res: Response) => {
  if (!req.params.name) {
    return res.send({ message: "Invalid" });
  }

  const fileName = req.params.name;
  const filePath = join(__dirname, "../../..", "/uploads/");

  res.download(filePath + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "File can not be downloaded: " + err,
      });
    }
  });
};
