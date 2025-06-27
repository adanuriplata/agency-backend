import { Request, Response, NextFunction } from "express";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing or invalid Authorization header" });
    return;
  }

  const token = auth.slice(7);
  const expected = process.env.API_TOKEN;

  if (!expected) {
    console.error("API_TOKEN environment variable is not set");
    res.status(500).json({ error: "Server configuration error" });
    return;
  }

  if (token !== expected) {
    res.status(403).json({ error: "Invalid token" });
    return;
  }

  next();
}
