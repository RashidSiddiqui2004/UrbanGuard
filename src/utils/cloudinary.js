
import { v2 as cloudinary } from "cloudinary"
// import fs from "fs"


cloudinary.config({
    cloud_name: 'ChaiCloud',
    api_key: "348688934373471",
    api_secret: "KK9WWTpdOu-f21iNcysjCd2jtD0"
});

// const uploadOnCloudinary = async (localFilePath) => {
//     try {
//         if (!localFilePath) return null
//         //upload the file on cloudinary
//         const response = await cloudinary.uploader.upload(localFilePath, {
//             resource_type: "auto"
//         })
//         // file has been uploaded successfull
//         //console.log("file is uploaded on cloudinary ", response.url);
//         // fs.unlinkSync(localFilePath)
//         if (fs.existsSync(localFilePath)) {
//             fs.unlinkSync(localFilePath);
//         } else {
//             console.error('File does not exist:', localFilePath);
//         }
//         return response;

//     } catch (error) {
//         if (fs.existsSync(localFilePath)) {
//             fs.unlinkSync(localFilePath);
//         } else {
//             console.error('File does not exist:', localFilePath);
//         }
//         // fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
//         return null;
//     }
// }

const uploadOnCloudinary = async (imageData) => {
    try {
        // Upload image to Cloudinary using SDK
        const cloudinaryResponse = await cloudinary.uploader.upload(imageData);

        const imageUrl = cloudinaryResponse.secure_url;

        // Store image link in Firestore
        //   const postRef = doc(firestore, 'posts', 'YOUR_POST_ID');
        //   await setDoc(postRef, { imageUrl }, { merge: true });

        console.log('Image uploaded and link stored:', imageUrl);

        return imageUrl;

    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error.message);
    }
};



export { uploadOnCloudinary }