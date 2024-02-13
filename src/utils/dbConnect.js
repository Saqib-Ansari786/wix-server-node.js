import { Sequelize } from "sequelize";

const sequelize = new Sequelize({ dialect: "mysql", host: "localhost", port: 3306, username: "root", password: "", database: "wix-database" });
export default sequelize;
