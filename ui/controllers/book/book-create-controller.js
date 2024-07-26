import BookCreateService from "../../../services/book/book-create-service.js";

export class BookCreateController {
    static  async create(req, res){
        try{
            const response = await BookCreateService.create(req.body);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default BookCreateController