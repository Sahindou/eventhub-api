import { Router } from "express";
import { authMiddleware,  } from '@/api/middlewares/authentication.middleware';
import { qrCode } from "../controllers/a2f.controller";

const router = Router();

router.get("/qrcode", authMiddleware, qrCode)

export { router as a2fRouter };