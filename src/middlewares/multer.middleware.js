import multer from "multer";
import path from "path";
import fs from "fs";

function uploadTo(folderName = "default") {
    console.log("folder name is ", folderName)
    const uploadPath = path.join(process.cwd(), "src", "uploads", folderName);
    fs.mkdirSync(uploadPath, { recursive: true });

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, uploadPath);
        },
        filename: function (req, file, cb) {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + "-" + file.originalname);
        }
    });

    return multer({ storage });
}
export default uploadTo;
