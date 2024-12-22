import multer from "multer";

// Set up Multer to store files temporarily in memory (or disk)
const storage = multer.memoryStorage(); // This will store the file in memory temporarily.
const upload = multer({ storage }).any(); // Allow any number of files

export default upload;
