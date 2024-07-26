import CategoryCreateService from "../../../services/category/category-create-service.js";

export class CategoryCreateController {
    static  async create(req, res){
        try{
            const response = await CategoryCreateService.create(req.body);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default CategoryCreateController