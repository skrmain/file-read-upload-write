import { Router } from "express";
import { DownloadFileService } from "../services/download.service";

const router = Router();

router.get("/:name", DownloadFileService);

export default router;
