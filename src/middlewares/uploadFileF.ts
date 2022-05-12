import { Request } from "express";
import formidable from "formidable";
import { FormidableFieldFileType } from "../types";

const form = formidable({
  multiples: true,
  keepExtensions: true,
  uploadDir: "uploads",
});

export const uploadFileF = (req: Request) => {
  return new Promise<FormidableFieldFileType>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);

      resolve({ fields, files });
    });
  });
};
