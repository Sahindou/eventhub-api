import { NextFunction, Request, Response } from "express";
import { generateSecret } from "otplib";
import { QrCodeGenerator } from "@/api/utils/qr-code-generator";

export const qrCode = async (
    req: Request,
    res: Response,
    next: NextFunction
) : Promise<any> => {
    try {
        if (!req.user) {
            return res.jsonError("Vous n'êtes pas connecté", 401);
        }

        const secret = generateSecret();
        const qrCodeGenerator = new QrCodeGenerator();
        const qrCode = await qrCodeGenerator.generate(req.user.email, secret);
        
        return res.jsonSuccess({ qrCode }, 200);
    } catch (error) {
        next(error);
    }
}