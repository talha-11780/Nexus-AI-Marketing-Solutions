import { randomBytes } from "node:crypto";

// Keep short-lived sessions in memory; restarting the server logs everyone out.
const adminEmail = "talhaiqbalkhan5@gmail.com";
const sessions = new Map();
const sessionLifetime = 8 * 60 * 60 * 1000;

export function createSession(userId, email) {
  const now = Date.now();
  // Remove expired entries while creating a new session.
  for (const [token, session] of sessions) {
    if (session.expiresAt <= now) sessions.delete(token);
  }

  const token = randomBytes(32).toString("hex");
  // Only the configured email is allowed to use admin and marketing endpoints.
  const isAdmin = email.trim().toLowerCase() === adminEmail;
  sessions.set(token, { userId, isAdmin, expiresAt: now + sessionLifetime });
  return { token, isAdmin };
}

export function requireAdmin(req, res, next) {
  // Read the bearer token sent by the frontend and find its server-side session.
  const token = req.get("authorization")?.match(/^Bearer ([\da-f]+)$/i)?.[1];
  const session = token && sessions.get(token);

  if (!session || session.expiresAt <= Date.now()) {
    if (token) sessions.delete(token);
    return res.status(401).json({ message: "Please log in to continue." });
  }

  if (!session.isAdmin) {
    return res.status(403).json({ message: "Admin or marketing access is restricted." });
  }

  req.userId = session.userId;
  return next();
}
