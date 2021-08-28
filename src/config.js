import { config } from "dotenv";

config()

export const SECRET = process.env.JWT_SECRET || ""