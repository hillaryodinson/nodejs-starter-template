import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access_secret";
const REFRESH_TOKEN_SECRET =
	process.env.REFRESH_TOKEN_SECRET || "refresh_secret";

export const generateAccessToken = (userId: string, role?: string) => {
	return jwt.sign({ userId, role: role || "STAFF" }, ACCESS_TOKEN_SECRET, {
		expiresIn: "1h",
	});
};

export const generateRefreshToken = (userId: string) => {
	return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};

export const verifyAccessToken = (token: string) => {
	return jwt.verify(token, ACCESS_TOKEN_SECRET);
};

export const verifyRefreshToken = (token: string) => {
	return jwt.verify(token, REFRESH_TOKEN_SECRET);
};
