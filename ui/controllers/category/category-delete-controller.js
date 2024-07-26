import CategoryDeleteService from "../../../services/category/category-delete-service.js";

export class CategoryDeleteController {
    static  async delete(req, res){
        try{
            const { isbn } = req.params;
            const response = await CategoryDeleteService.delete(isbn);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default CategoryDeleteController