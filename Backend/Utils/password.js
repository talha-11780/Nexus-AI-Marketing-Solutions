import { randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);

// Hash passwords with a fresh random salt before storing them.
export async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const key = await scrypt(password, salt, 64);
  return `scrypt$${salt}$${key.toString("hex")}`;
}

// Support current scrypt hashes and upgrade legacy plain-text values after login.
export async function verifyPassword(password, storedPassword) {
  const [algorithm, salt, storedKey] = storedPassword.split("$");
  if (algorithm !== "scrypt" || !salt || !storedKey) {
    // Compare equal-length byte buffers to avoid leaking comparison timing.
    const submitted = Buffer.from(password);
    const stored = Buffer.from(storedPassword);
    return {
      valid: submitted.length === stored.length && timingSafeEqual(submitted, stored),
      needsUpgrade: true,
    };
  }

  const key = await scrypt(password, salt, 64);
  const expectedKey = Buffer.from(storedKey, "hex");
  return {
    valid: key.length === expectedKey.length && timingSafeEqual(key, expectedKey),
    needsUpgrade: false,
  };
}
