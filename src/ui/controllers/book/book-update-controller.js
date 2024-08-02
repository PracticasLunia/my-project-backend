import BookUpdateService from "../../../services/book/book-update-service.js";
import BookGetService from "../../../services/book/book-get-service.js";
import PdfReaderService from "../../../services/pdf-reader-service.js";
import BookVectorStoreService from "../../../services/book/book-vector-store-service.js";
import BookVectorDeleteService from "../../../services/book/book-vector-delete-service.js";

export class BookUpdateController {
    static  async update(req, res){
        try{
            const { isbn } = req.params;
            const bookData = JSON.parse(req.body.book);
            const response = await BookUpdateService.update(isbn, bookData);
            if (req.files && req.files !== null){
                const { file } = req.files;
                const docs = await PdfReaderService.read(file);
                const book = await BookGetService.get(isbn);
                await BookVectorDeleteService.delete(book);
                book.dataValues.isbn = isbn;
                await BookVectorStoreService.store(book, docs);
            }
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default BookUpdateController