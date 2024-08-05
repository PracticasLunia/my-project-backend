import BookGetService from "../../../services/book/book-get-service.js";

export class BookDownloadController {
    static  async download(req, res){
        try{
            const { isbn } = req.params;
            const response = await BookGetService.get(isbn);
            if (response){
                const file = `./uploads/books/${isbn}.pdf`;
                res.status(200).download(file);
            } else {
                const error = new Error('No book finded')
                throw error;
            }
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default BookDownloadController