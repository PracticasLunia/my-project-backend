import CategoryRepository from "../../repositories/category-repository.js";

export default class CategoryDeleteService {
    static async delete(id){
        const category = await CategoryRepository.delete(id);
        if(!category){
            const error = new Error();
            error.status = 400;
            error.message = "No category finded";
            throw error;
        }       
        return category;
    }
}