import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_API_SECRET } from "../config";

cloudinary.config({
    cloud_name: 'dpdklk8ze',
    api_key: "217386177376534",
    api_secret: CLOUDINARY_API_SECRET,
    secure: true
})

export const uploadImage = async(file) => {
    try {
        const result = await cloudinary.uploader.upload(file)
        return result.url
    } catch (error) {
        console.log(error)
    }
}

