import BookImportService from "../../../services/book/book-import-service.js";
import BookCoverService from "../../../services/book/book-cover-service.js";
import PdfReaderService from "../../../services/pdf-reader-service.js";
import BookVectorStoreService from "../../../services/book/book-vector-store-service.js";
import BookFileSaveService from "../../../services/book/book-file-save-service.js";

export class BookImportController {
    static  async import(req, res){
        try{
            const { file } = req.files;
            const docs = await PdfReaderService.read(file);
            let response = await BookImportService.import(docs);
            response = await BookCoverService.cover(response);
            await BookVectorStoreService.store(response, docs);
            BookFileSaveService.save(response.isbn + '.pdf', file);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default BookImportController