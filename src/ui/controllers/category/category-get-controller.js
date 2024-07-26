import CategoryGetService from "../../../services/category/category-get-service.js";

export class CategoryGetController {
    static  async get(req, res){
        try{
            const { id } = req.params;
            const response = await CategoryGetService.get(id);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default CategoryGetController