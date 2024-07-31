import BookUpdateService from "../../../services/book/book-update-service.js";

export class BookUpdateController {
    static  async update(req, res){
        try{
            const { isbn } = req.params;
            const response = await BookUpdateService.update(isbn, req.body);
            res.status(200).json(response);

            /* IMPLEMENTAR
            const { file } = req.files;
            const book = JSON.parse(req.body.book);
            const docs = await PdfReaderService.read(file);
            let response = await BookCreateService.create(book);
            response = await BookCoverService.cover(response);
            await BookVectorStoreService.store(response, docs);
            res.status(200).json(response);
            */
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default BookUpdateController