import BookDeleteService from "../../../services/book/book-delete-service.js";
import BookGetService from "../../../services/book/book-get-service.js";
import BookVectorDeleteService from "../../../services/book/book-vector-delete-service.js";

export class BookDeleteController {
    static  async delete(req, res){
        try{
            const { isbn } = req.params;
            const book = await BookGetService.get(isbn);
            const response = await BookDeleteService.delete(isbn);
            await BookVectorDeleteService.delete(book);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default BookDeleteController