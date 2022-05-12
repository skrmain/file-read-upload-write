import { Router } from "express";

import { uploadFileM } from "../../middlewares/uploadFileM";
import {
  UploadFileFService,
  UploadFileMService,
} from "../services/upload.service";

const router = Router();

router.post("/uploadM", uploadFileM.single("avatar"), UploadFileMService);
router.post("/uploadF", UploadFileFService);

export default router;
