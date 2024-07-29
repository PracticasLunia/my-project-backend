import TagRepository from "../../repositories/tag-repository.js";

export default class TagGetService {
    static async get(id){
        const tag = await TagRepository.get(id);
        if(!tag){
            const error = new Error();
            error.status = 400;
            error.message = "No tag finded";
            throw error;
        }       
        return tag;
    }
}