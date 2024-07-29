import TagUpdateService from "../../../services/tag/tag-update-service.js";

export class TagUpdateController {
    static  async update(req, res){
        try{
            const { id } = req.params;
            const response = await TagUpdateService.update(id, req.body);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default TagUpdateController