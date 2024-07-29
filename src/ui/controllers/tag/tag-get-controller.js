import TagGetService from "../../../services/tag/tag-get-service.js";

export class TagGetController {
    static  async get(req, res){
        try{
            const { id } = req.params;
            const response = await TagGetService.get(id);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default TagGetController