import BookFindService from '../../services/book-find-service.js';

export class BookFindController {
    static  async find(req, res){
        try{
            const { title, author } = req.body;
            const response = await BookFindService.find(title, author);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default BookFindController