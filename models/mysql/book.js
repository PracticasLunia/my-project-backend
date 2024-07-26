import { DataTypes, Model } from "sequelize";
import Category from "./category.js";

export default class Book extends Model {
    static init(sequelize) {
        super.init({   
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            author: {
                type: DataTypes.STRING,
                allowNull: false
            },
            isbn: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            genre: {
                type: DataTypes.STRING,
                allowNull: false
            },
            publicationDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            publisher: {
                type: DataTypes.STRING,
                allowNull: false
            },
            language: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            },
            pageCount: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            coverImage: {
                type: DataTypes.STRING,
                allowNull: false
            },
            format: {
                type: DataTypes.STRING,
                allowNull: false
            },
            availability: {
                type: DataTypes.STRING,
                allowNull: false
            },
            category: {
                type: DataTypes.INTEGER,
                references: {
                    model: Category,
                    key: 'id'
                },
                allowNull: false
            },
            //category: {}, One-To-One
            //tags: [{}], One-To-Many
            averageRating: {
                type: DataTypes.FLOAT,
                allowNull: false
            },
            ratingCount: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
        },
        {
            sequelize,
            timestamps: true,
            modelName: 'Book'
        });
    }
};
