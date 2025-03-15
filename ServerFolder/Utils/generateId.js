import crypto from "crypto";

// List of common words to remove
const COMMON_WORDS = ["creamy", "delicious", "special", "tasty", "milk"];

export function normalizeRecipeName(name){
  return name
    .toLowerCase()
    .replace(/[^a-zA-Z0-9\s]/g, "") // Remove special characters
    .split(" ")
    .filter(word => !COMMON_WORDS.includes(word)) // Remove common words
    .join(" ");
}

export function generateRecipeId(name){
  const normalizedName = normalizeRecipeName(name);
  return crypto.createHash("md5").update(normalizedName).digest("hex");
}
