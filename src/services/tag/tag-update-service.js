import TagRepository from "../../repositories/tag-repository.js";

export default class TagUpdateService {
    static async update(id, data){
        const updated = await TagRepository.update(id, data);
        if(!updated || updated[0] === 0){
            const error = new Error();
            error.status = 400;
            error.message = "Can't update the tag data";
            throw error;
        }       
        return updated;
    }
}