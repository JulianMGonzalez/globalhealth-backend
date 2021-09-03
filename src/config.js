import { config } from "dotenv";

config()

//password secret jwt
export const SECRET = process.env.JWT_SECRET || ""
//puerto
export const PORT = process.env.PORT || 3000
//mongodb url
export const MONGOURL = process.env.MONGODB_URL || ""
//cloudinary api key
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || ''