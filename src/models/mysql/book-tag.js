import { DataTypes, Model } from "sequelize";
import Book from './book.js';
import Tag from './tag.js';

export default class BookTag extends Model {
    static init(sequelize) {
        super.init({   
            /*bookId: {
                type: DataTypes.STRING,
                references: {
                    model: Book,
                    key: 'isbn'
                },
                allowNull: false
            },
            tagId: {
                type: DataTypes.INTEGER,
                references: {
                    model: Tag,
                    key: 'id'
                },
                allowNull: false
            },*/
        },
        {
            sequelize,
            timestamps: true,
            modelName: 'BookTag'
        }
        );
    }
};
