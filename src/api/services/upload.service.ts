import { Request, Response } from "express";

import { uploadFileF } from "../../middlewares/uploadFileF";
import { getFilesInfo, saveFilesInfoF, saveFilesInfoM } from "../../utils";

export const UploadFileMService = async (req: Request, res: Response) => {
  if (req.file) {
    saveFilesInfoM(req.file);
  } else if (req.files && req.files instanceof Array) {
    saveFilesInfoM(req.files);
  }
  res.send({
    message: "Upload Success",
    file: req.file,
    files: req.files,
    body: req.body,
  });
};

export const UploadFileFService = async (req: Request, res: Response) => {
  const result = await uploadFileF(req);

  await saveFilesInfoF(result.files);

  res.send({ message: "Upload Success", ...result, body: req.body });
};

export const UploadListService = async (req: Request, res: Response) => {
  const data = await getFilesInfo();
  res.send({ status: "success", message: "Files Data", data: data });
};
