import { DataTypes, Model } from "sequelize";

export default class Tag extends Model {
    static init(sequelize) {
        super.init({   
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            timestamps: true,
            modelName: 'Tag'
        }
        );
    }
};
