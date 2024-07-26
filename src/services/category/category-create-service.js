import CategoryRepository from "../../repositories/category-repository.js";

export default class CategoryCreateService {
    static async create(data){
        const created = await CategoryRepository.create(data);
        if(!created || created[0] === 0){
            const error = new Error();
            error.status = 400;
            error.message = "Can't create the category data";
            throw error;
        }       
        return created;
    }
}