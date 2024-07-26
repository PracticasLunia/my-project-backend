import CategoryRepository from "../../repositories/category-repository.js";

export default class CategoryUpdateService {
    static async update(id, data){
        const updated = await CategoryRepository.update(id, data);
        if(!updated || updated[0] === 0){
            const error = new Error();
            error.status = 400;
            error.message = "Can't update the category data";
            throw error;
        }       
        return updated;
    }
}