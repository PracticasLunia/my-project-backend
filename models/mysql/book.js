import { DataTypes, Model } from "sequelize";

export default class Book extends Model {
    init(sequelize) {
        super.init({   
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true
            },
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
                unique: true,
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
            //category: {}, One-To-One
            //tags: [{}], One-To-Many
            averageRating: {
                type: DataTypes.NUMBER,
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
