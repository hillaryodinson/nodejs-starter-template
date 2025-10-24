import {
	ErrorRequestHandler,
	NextFunction,
	Request,
	RequestHandler,
	Response,
} from "express";
import rateLimit from "express-rate-limit";
import multer from "multer";
import path from "path";
import { ZodError } from "zod";

import { AppError, ERROR_CODES } from "../libs/errors";
import { verifyAccessToken } from "../libs/jwt";
import {
	CustomResponse,
	RequestWithUser,
	TypedResponse,
} from "../libs/requests";

/**
 * Middleware to authorize requests using Bearer token
 */
export const authorize = (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers["authorization"];
	const token = authHeader?.split(" ")[1];

	if (!token) {
		console.log("Auth memeber check failed");
		return next(
			new AppError(
				ERROR_CODES.VALIDATION_INVALID_TOKEN,
				"Unauthorized",
				401
			)
		);
	}

	try {
		const payload = verifyAccessToken(token);
		(req as RequestWithUser).user = payload as {
			userId: string;
			role: string;
		};
		return next();
	} catch (error) {
		console.error("Authorization error:", error);
		return next(
			new AppError(
				ERROR_CODES.VALIDATION_INVALID_TOKEN,
				"Unauthorized",
				401
			)
		);
	}
};

/**
 * Placeholder for route-based role access control
 */
export const authorizeAccess = (
	req: RequestWithUser,
	res: Response,
	next: NextFunction
) => {
	// To be implemented: role-based route access control
	next();
};

/**
 * Centralized error handler middleware
 */
export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	if (res.headersSent) {
		return next(err);
	}

	if (err instanceof ZodError) {
		console.warn("Zod validation error:", err.message);
		return res.status(400).json({
			success: false,
			message: "Validation error",
			errors: err.message,
		});
	}

	if (err instanceof AppError) {
		return res.status(err.statusCode).json({
			success: false,
			message: err.message,
			code: `E${err.errorCode}`,
		});
	}

	console.error("Unhandled error:", err);
	return res.status(500).json({
		success: false,
		message: "Oops! An unexpected error occurred.",
		code: "EE00",
	});
};

/**
 * Try-catch wrapper for async route handlers
 */
export const tryCatch =
	(fn: RequestHandler) =>
	async (
		req: Request,
		res: TypedResponse<CustomResponse>,
		next: NextFunction
	) => {
		try {
			await fn(req, res, next);
		} catch (err) {
			next(err);
		}
	};

/**
 * Rate limiter middleware
 */
export const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
	standardHeaders: true,
	legacyHeaders: false,
	handler: (_req, res) => {
		res.status(429).json({
			success: false,
			message: "Too many requests, please try again later.",
		});
	},
});

/**
 * Multer file upload middleware
 */
//use this if you want to upload to disk...
const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
		cb(null, "uploads/original/");
	},
	filename: (_req, file, cb) => {
		const ext = path.extname(file.originalname);
		const filename = `${Date.now()}${ext}`;
		cb(null, filename);
	},
});

//use memory storage if you want to upload to memory and then to a third party service like S3 or Supabase
const storageMemory = multer.memoryStorage();

//change to storage if you want to upload to disk and change to storageMemory if you want to upload to memory
export const upload = multer({ storage: storageMemory });
