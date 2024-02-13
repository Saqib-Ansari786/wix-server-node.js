import { DataTypes } from "sequelize";

import sequelize from "../utils/dbConnect.js";


const WixToken = sequelize.define("wixToken", {
        id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        },
        token: {
        type: DataTypes.STRING,
        allowNull: false,
        },
    },
    {
        timestamps: true,
    }
    );

export default WixToken;