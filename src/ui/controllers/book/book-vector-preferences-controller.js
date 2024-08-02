import BookVectorSearchService from "../../../services/book/book-vector-search-service.js";
import UserGetService from "../../../services/user/user-get-service.js";

export class BookVectorPreferencesController {
    static  async preferences(req, res){
        try{
            if(res.locals.user){
                const response = await BookVectorSearchService.search(res.locals.user.preferences);
                res.status(200).json(response);
            } else {
                const error = new Error("Something bad");
                error.status = 500;
                throw error;
            }
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default BookVectorPreferencesController