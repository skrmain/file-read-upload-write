import { Router } from "express";

import { uploadFileM } from "../../middlewares/uploadFileM";
import {
  UploadFileFService,
  UploadFileMService,
  UploadListService,
} from "../services/upload.service";

const router = Router();

router.post("/uploadM", uploadFileM.single("avatar"), UploadFileMService);
router.post("/uploadF", UploadFileFService);
router.get("/uploads", UploadListService);

export default router;
