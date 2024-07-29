import User from "../models/mysql/user.js";
import Sequelize from 'sequelize'
const Op = Sequelize.Op


export default class UserRepository {
    static async get(id) {
        try {
            return await User.findByPk(id);
        } catch (err) {
            throw new Error("Error while finding user")
        }
    }

    static async getByEmail(email) {
        try {
            return await User.findOne({ where: { email: email }});
        } catch (err) {
            throw new Error("Error while finding user")
        }
    }

    static async create(user) {
        try {
            return (await User.create(user));
        } catch (err) {
            throw new Error("Some field is wrong or user with email already exists")
        }
    }

    static async update(id, user) {
        try {
            return await User.update(user, { where: { id: id } });
        } catch (err) {
            throw new Error("Error while updating user")
        }
    }

    static async delete(id) {
        try {
            return await User.destroy({ where: { id: id } });
        } catch (err) {
            throw new Error("Error while deleting user")
        }
    }

    static async findAll(name = '', email = ''){
        try {
            return await User.findAll({ where: { 
                name: {[Op.like]: `%${name}%`},
                email: {[Op.like]: `%${email}%`}
            }});
        } catch (err) {
            throw new Error("Error while finding users")
        }
    }
}