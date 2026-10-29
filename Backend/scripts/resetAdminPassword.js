import { loadEnvFile } from "node:process";
import { emitKeypressEvents } from "node:readline";
import { fileURLToPath } from "node:url";
import mongoose from "mongoose";
import User from "../Model/User.js";
import { hashPassword } from "../Utils/password.js";

loadEnvFile(fileURLToPath(new URL("../.env", import.meta.url)));

// Read passwords without echoing their characters into the terminal.
function readHidden(prompt) {
  return new Promise((resolve, reject) => {
    if (!process.stdin.isTTY || !process.stdin.setRawMode) {
      reject(new Error("Run this command in an interactive terminal."));
      return;
    }

    let value = "";
    process.stdout.write(prompt);
    process.stdin.setRawMode(true);
    process.stdin.resume();

    const cleanup = () => {
      process.stdin.off("keypress", onKeypress);
      process.stdin.setRawMode(false);
      process.stdout.write("\n");
    };

    const onKeypress = (character, key = {}) => {
      if (key.ctrl && key.name === "c") {
        cleanup();
        reject(new Error("Password reset cancelled."));
      } else if (key.name === "return" || key.name === "enter") {
        cleanup();
        resolve(value);
      } else if (key.name === "backspace") {
        value = value.slice(0, -1);
        process.stdout.write("\b \b");
      } else if (character && !key.ctrl && !key.meta) {
        value += character;
        process.stdout.write("*");
      }
    };

    emitKeypressEvents(process.stdin);
    process.stdin.on("keypress", onKeypress);
  });
}

try {
  // Require a database URI so the credential is changed in the configured Atlas database.
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not configured in Backend/.env.");
  }

  // Ask twice to catch typing mistakes before updating the account.
  const password = await readHidden("New admin password (minimum 12 characters): ");
  const confirmation = await readHidden("Confirm new admin password: ");
  if (password.length < 12) {
    throw new Error("Choose a password with at least 12 characters.");
  }
  if (password !== confirmation) {
    throw new Error("The passwords do not match.");
  }

  await mongoose.connect(process.env.MONGODB_URI);
  const user = await User.findOne({ email: "talhaiqbalkhan5@gmail.com" });
  if (!user) {
    throw new Error("The allowlisted admin account is not registered.");
  }

  // Save only a salted hash, never the entered password itself.
  user.password = await hashPassword(password);
  await user.save();
  console.log("Admin password updated. Sign in with the registered email and new password.");
} catch (error) {
  console.error("Could not reset admin password:", error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
