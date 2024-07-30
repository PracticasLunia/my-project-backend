import BookImportService from "../../../services/book/book-import-service.js";

export class BookImportController {
    static  async import(req, res){
        try{
            const { file } = req.files;
            const response = await BookImportService.import(file);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default BookImportController