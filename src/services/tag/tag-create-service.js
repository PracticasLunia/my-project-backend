import TagRepository from "../../repositories/tag-repository.js";

export default class TagCreateService {
    static async create(data){
        const created = await TagRepository.create(data);
        if(!created || created[0] === 0){
            const error = new Error();
            error.status = 400;
            error.message = "Can't create the tag data";
            throw error;
        }       
        return created;
    }
}