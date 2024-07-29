import TagRepository from "../../repositories/tag-repository.js";

export default class TagGetAllService {
    static async getAll(){
        const categories = await TagRepository.getAll();
        if(!categories){
            const error = new Error();
            error.status = 400;
            error.message = "No tags finded"
            throw error;
        }       
        return categories;
    }
}