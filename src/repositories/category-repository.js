import Category from "../models/mysql/category.js";

export default class CategoryRepository {
    static async get(id) {
        try {
            return await Category.findByPk(id);
        } catch (err) {
            throw new Error("Error while finding category")
        }
    }

    static async create(category) {
        try {
            return (await Category.create(category));
        } catch (err) {
            throw new Error("Some field is wrong or category already exists")
        }
    }

    static async update(id, category) {
        try {
            return await Category.update(category, { where: { id: id } });
        } catch (err) {
            throw new Error("Error while updating category")
        }
    }

    static async delete(id) {
        try {
            return await Category.destroy({ where: { id: id } });
        } catch (err) {
            throw new Error("Error while deleting category")
        }
    }

    static async getAll() {
        try {
            return await Category.findAll();
        } catch (err) {
            throw new Error("Error while getting categories")
        }
    }
}