import { DataTypes, Model } from "sequelize";
import sequelize from "../mysql.js";

class User extends Model {
    id;
    name;
    email;
    password;
    admin;
}
User.init(    
    {   
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
        }
    },
    {
        sequelize,
        modelName: 'User'
    }
);

User.sync({ force: true })

export default User