import CategoryGetAllService from '../../../services/category/category-getAll-service.js';

export class CategoryGetAllController {
    static  async getAll(req, res){
        try{
            const response = await CategoryGetAllService.getAll();
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default CategoryGetAllController