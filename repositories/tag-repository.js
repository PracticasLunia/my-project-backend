import Tag from "../models/mysql/tag.js";

export default class TagRepository {
    static async get(id) {
        try {
            return await Tag.findByPk(id, { raw: true });
        } catch (err) {
            throw new Error("Error while finding tag")
        }
    }

    static async create(tag) {
        try {
            return (await Tag.create(tag, {raw: true})).dataValues;
        } catch (err) {
            throw new Error("Some field is wrong or tag already exists")
        }
    }

    static async update(id, tag) {
        try {
            return await Tag.update(tag, { where: { id: id } });
        } catch (err) {
            throw new Error("Error while updating tag")
        }
    }

    static async delete(id) {
        try {
            return await Tag.destroy({ where: { id: id } });
        } catch (err) {
            throw new Error("Error while deleting tag")
        }
    }
}