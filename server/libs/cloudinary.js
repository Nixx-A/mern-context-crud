import { v2 as cloudinary } from 'cloudinary'
import { CLOUDINARY_API_SECRET, CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME } from "../config.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export const uploadImage = async filePath => {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'test'
  })
}

export const deleteImage = async (public_id) => {
  await cloudinary.uploader.destroy(public_id)
}