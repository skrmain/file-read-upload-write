import { Request } from "express";
import formidable from "formidable";

const form = formidable({
  multiples: true,
  keepExtensions: true,
  uploadDir: "uploads",
});

export const uploadFileF = (req: Request) => {
  interface FormidableFieldFileType {
    fields: formidable.Fields;
    files: formidable.Files;
  }
  return new Promise<FormidableFieldFileType>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);

      resolve({ fields, files });
    });
  });
};
