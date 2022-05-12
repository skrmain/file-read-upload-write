import formidable from "formidable";
import { existsSync } from "fs";
import { readFile, writeFile } from "fs/promises";
import { join } from "path";

import { UploadDataFilePathFromRoot } from "../constants";
import { FileInfoType } from "../types";

export const getFilesInfo = async () => {
  const dataFilePath = join(__dirname, "../..", UploadDataFilePathFromRoot);
  if (!existsSync(dataFilePath)) {
    writeFile(dataFilePath, "[]");
  }
  const rawData = await readFile(dataFilePath, {
    encoding: "utf8",
  });

  const dataArray: Array<FileInfoType> = JSON.parse(rawData || "[]");

  const data = dataArray.map((val) => {
    delete val.filepath;
    return val;
  });

  return data;
};

export const saveFilesInfo = async (filesData: formidable.Files) => {
  const filesInfo: FileInfoType[] = [];
  Object.keys(filesData).forEach((value) => {
    const files = filesData[value];

    if (files instanceof Array) {
      files.forEach((val2) => {
        const file: FileInfoType = {
          mimetype: val2.mimetype,
          mtime: val2.mtime,
          newFilename: val2.newFilename,
          originalFilename: val2.originalFilename,
          size: val2.size,
          filepath: val2.filepath,
        };
        filesInfo.push({ ...file });
      });
    } else {
      filesInfo.push({
        mimetype: files.mimetype,
        mtime: files.mtime,
        newFilename: files.newFilename,
        originalFilename: files.originalFilename,
        size: files.size,
        filepath: files.filepath,
      });
    }
  });

  const dataFilePath = join(__dirname, "../..", UploadDataFilePathFromRoot);

  const oldInfo = await getFilesInfo();

  filesInfo.forEach((val) => {
    oldInfo.push(val);
  });

  await writeFile(dataFilePath, JSON.stringify(oldInfo));
  return true;
};
