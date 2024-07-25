import { DataTypes, Model } from "sequelize";
import Book from './book.js';
import Tag from './tag.js';

export default class BookTag extends Model {
    init(sequelize) {
        super.init({   
            bookId: {
                type: DataTypes.INTEGER,
                references: {
                    model: Book,
                    key: 'id'
                }
            },
            tagId: {
                type: DataTypes.INTEGER,
                references: {
                    model: Tag,
                    key: 'id'
                }
            },
        },
        {
            sequelize,
            timestamps: true,
            modelName: 'BookTag'
        }
        );
    }
};
