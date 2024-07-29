import TagRepository from "../../repositories/tag-repository.js";

export default class TagDeleteService {
    static async delete(id){
        const tag = await TagRepository.delete(id);
        if(!tag){
            const error = new Error();
            error.status = 400;
            error.message = "No tag finded";
            throw error;
        }       
        return tag;
    }
}