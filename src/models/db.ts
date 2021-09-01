import { Sequelize } from "sequelize";

const sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: './edieo.sqlite',
  logging: false,
  define: {
    freezeTableName: true,
    timestamps: true,
  }
});
sequelize.sync();
export default sequelize;
