import fs from 'fs'
import path from 'path'

export default class BookFileDeleteService {
    static delete(name){
        try {
            const uploadDir = path.join('./uploads/books/');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const uploadPath = path.join(uploadDir, name);
            fs.rmSync(uploadPath);
        } catch (err) {
            const error = new Error("Error while deleting file: "+ err.message);
            error.status = 500;
            throw error;
        }
    }
}