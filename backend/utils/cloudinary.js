import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv'
import fs from "fs"

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});


const uploadCloudinary = async (localFilePath) => {

    try {
        if (!localFilePath) return null;
        const response = await cloudinary.uploader.upload(localFilePath, {

            resource_type: "auto",
            upload_preset: "ml-default",
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'ico', 'heic', 'svg', 'webp', 'webm']
        });

        return response;
    } catch (error) {
        console.log(error)
        fs.unlinkSync(localFilePath);
        return null;
    }
}

const deleteCloudinary = async (public_id) => {
    try {

        if (!public_id) return null;
        const res = await cloudinary.uploader.destroy(public_id, {
            resource_type: "image",
            upload_preset: "ml-default",
            invalidate: true,
        })

    } catch (error) {
        console.log(error)
    }
}

export { uploadCloudinary, deleteCloudinary }