import { Request, Response } from "express";

import { uploadFileF } from "../../middlewares/uploadFileF";

export const UploadFileMService = async (req: Request, res: Response) => {
  res.send({
    message: "Upload Success",
    file: req.file,
    files: req.files,
    body: req.body,
  });
};

export const UploadFileFService = async (req: Request, res: Response) => {
  const result = await uploadFileF(req);

  res.send({ message: "Upload Success", ...result, body: req.body });
};
