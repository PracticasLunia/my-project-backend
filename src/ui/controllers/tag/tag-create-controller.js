import TagCreateService from "../../../services/tag/tag-create-service.js";

export class TagCreateController {
    static  async create(req, res){
        try{
            const response = await TagCreateService.create(req.body);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default TagCreateController