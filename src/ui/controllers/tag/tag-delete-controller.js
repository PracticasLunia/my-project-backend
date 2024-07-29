import TagDeleteService from "../../../services/tag/tag-delete-service.js";

export class TagDeleteController {
    static  async delete(req, res){
        try{
            const { isbn } = req.params;
            const response = await TagDeleteService.delete(isbn);
            res.status(200).json(response);
        } catch (err){
            res.status(err.status || 400).json({ error: err.message })
        }
    }
}

export default TagDeleteController