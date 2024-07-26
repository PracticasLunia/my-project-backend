import CategoryUpdateService from "../../../services/category/category-update-service.js";

export class CategoryUpdateController {
    static  async update(req, res){
        try{
            const { isbn } = req.params;
            const response = await CategoryUpdateService.update(isbn, req.body);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default CategoryUpdateController