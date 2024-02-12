/**
 * access these files using
 * const files = req.files in call back function -- controller
 * use this function as middleware in routes
 * for multiple files use -- upload.array("files")
 * for single file use -- upload.single("file")
 */

import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExtension = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${fileExtension}`);
  },
});
const upload = multer({ storage });
export default upload;
