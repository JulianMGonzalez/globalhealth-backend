import { config } from "dotenv";

config()

export const SECRET = process.env.JWT_SECRET || ""
export const PORT = process.env.PORT || 3000
export const MONGOURL = process.env.MONGODB_URL || ""