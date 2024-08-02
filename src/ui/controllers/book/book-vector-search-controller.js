import BookVectorSearchService from "../../../services/book/book-vector-search-service.js";

export class BookVectorSearchController {
    static  async search(req, res){
        try{
            const { description } = req.body;
            const response = await BookVectorSearchService.search(description);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default BookVectorSearchController