import TagGetAllService from '../../../services/tag/tag-getAll-service.js';

export class TagGetAllController {
    static  async getAll(req, res){
        try{
            const response = await TagGetAllService.getAll();
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default TagGetAllController