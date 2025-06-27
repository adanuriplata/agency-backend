import { Request, Response, NextFunction } from "express";

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid Authorization header" });
  }

  const token = auth.slice(7);
  const expected = process.env.API_TOKEN;

  if (!expected) {
    console.error("API_TOKEN environment variable is not set");
    return res.status(500).json({ error: "Server configuration error" });
  }

  if (token !== expected) {
    return res.status(403).json({ error: "Invalid token" });
  }

  next();
}
