import BookCoverService from "../../../services/book/book-cover-service.js";
import BookGetService from "../../../services/book/book-get-service.js";

export class BookCoverController {
    static  async cover(req, res){
        try{
            const { isbn } = req.params;
            const response = await BookGetService.get(isbn);
            const generateCover = await BookCoverService.cover(response);
            res.status(200).json(generateCover);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default BookCoverController