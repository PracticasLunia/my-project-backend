import BookCreateService from "../../../services/book/book-create-service.js";
import BookCoverService from "../../../services/book/book-cover-service.js";
import PdfReaderService from "../../../services/pdf-reader-service.js";
import BookVectorStoreService from "../../../services/book/book-vectorStore-service.js";

export class BookCreateController {
    static  async create(req, res){
        try{
            const { file } = req.files;
            const book = JSON.parse(req.body.book);
            const docs = await PdfReaderService.read(file);
            let response = await BookCreateService.create(book);
            response = await BookCoverService.cover(response);
            await BookVectorStoreService.store(response, docs);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default BookCreateController