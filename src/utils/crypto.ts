import crypto from "crypto";

const algorithm = "aes-256-gcm";
const ivLength = 12; // recommended length for GCM

const key = process.env.ENCRYPTION_KEY;
if (!key) {
  throw new Error("ENCRYPTION_KEY environment variable is required");
}
if (Buffer.byteLength(key) < 32) {
  throw new Error("ENCRYPTION_KEY must be at least 32 bytes long");
}
const keyBuffer = Buffer.from(key.slice(0, 32));

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, keyBuffer, iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv.toString("hex"), tag.toString("hex"), encrypted.toString("hex")].join(":");
}

export function decrypt(payload: string): string {
  const [ivHex, tagHex, dataHex] = payload.split(":");
  if (!ivHex || !tagHex || !dataHex) {
    throw new Error("Invalid encrypted payload format");
  }
  const iv = Buffer.from(ivHex, "hex");
  const tag = Buffer.from(tagHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, keyBuffer, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(Buffer.from(dataHex, "hex")), decipher.final()]);
  return decrypted.toString("utf8");
}
