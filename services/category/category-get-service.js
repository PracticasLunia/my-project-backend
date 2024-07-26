import CategoryRepository from "../../repositories/category-repository.js";

export default class CategoryGetService {
    static async get(id){
        const category = await CategoryRepository.get(id);
        if(!category){
            const error = new Error();
            error.status = 400;
            error.message = "No category finded";
            throw error;
        }       
        return category;
    }
}