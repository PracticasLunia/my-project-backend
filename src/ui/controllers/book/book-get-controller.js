import BookGetService from "../../../services/book/book-get-service.js";

export class BookGetController {
    static  async get(req, res){
        try{
            const { isbn } = req.params;
            const response = await BookGetService.get(isbn);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default BookGetController