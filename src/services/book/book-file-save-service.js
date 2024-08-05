import fs from 'fs'
import path from 'path'

export default class BookFileSaveService {
    static save(name, file){
        try {
            const uploadDir = path.join('./uploads/books/');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            const uploadPath = path.join(uploadDir, name);
            fs.writeFileSync(uploadPath, file.data);
        } catch (err) {
            const error = new Error("Error while saving file: "+ err.message);
            error.status = 500;
            throw error;
        }
    }
}