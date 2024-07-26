import BookDeleteService from "../../../services/book/book-delete-service.js";

export class BookDeleteController {
    static  async delete(req, res){
        try{
            const { isbn } = req.params;
            const response = await BookDeleteService.delete(isbn);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default BookDeleteController