import TagDeleteService from "../../../services/tag/tag-delete-service.js";

export class TagDeleteController {
    static  async delete(req, res){
        try{
            const { id } = req.params;
            const response = await TagDeleteService.delete(id);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default TagDeleteController