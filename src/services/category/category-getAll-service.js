import CategoryRepository from "../../repositories/category-repository.js";

export default class CategoryGetAllService {
    static async getAll(){
        const categories = await CategoryRepository.getAll();
        if(!categories){
            const error = new Error();
            error.status = 400;
            error.message = "No categorys finded"
            throw error;
        }       
        return categories;
    }
}