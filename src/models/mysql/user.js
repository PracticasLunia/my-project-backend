import { DataTypes, Model } from "sequelize";

export default class User extends Model {
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
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            admin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            },
            verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false
            }
        },
        {
            sequelize,
            timestamps: true,
            modelName: 'User'
        }
        );
    }
};
