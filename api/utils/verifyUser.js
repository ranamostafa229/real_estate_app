import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  // const refreshToken = req.cookies.refresh_token;
  if (!token) {
    return next(errorHandler(403, "Access denied")); // no token provided // forbidden
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "You are Unauthorized"));
    }

    req.user = user;
    next();
  });
};
