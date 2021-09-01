import User from "../models/user";
import { hash, compare } from "bcryptjs";
import { Sequelize } from "sequelize";
import joi from "joi";

const userValidation = joi.object({
  username: joi
    .string()
    .trim()
    .lowercase()
    .alphanum()
    .min(3)
    .max(30)
    .insensitive()
    .required(),
  password: joi.string().min(6).max(50).required(),
  email: joi.string().email().required(),
});

class UserHelper {
  static async AddUser(data: {
    username: string;
    password: any;
    email: string;
  }) {
    const userData = await userValidation.validateAsync(data);
    const hashPassword = await hash(userData.password, 10);
    userData.password = hashPassword;
    const newUser = await User.create(userData);
    console.log(newUser.toJSON());
    return newUser.toJSON();
  }

  static async getAllUser() {
    const allUser = await User.findAll({
      attributes: ["username", "email"],
    });
    console.log(allUser);
    return allUser;
  }

  static async deleteAllUser() {
    const result = await User.destroy({
      truncate: true,
    });
    console.log(result);
    return result;
  }

  static async getUser(usernameOrEmail: string) {
    const user = await User.findOne({
      where: Sequelize.or(
        { email: usernameOrEmail },
        { username: usernameOrEmail }
      ),
    });
    // console.log(user);
    return user;
  }

  static async authenticate(data: { user: string; password: any }) {
    const user = await this.getUser(data.user);
    const oldPassword = user?.getDataValue("password");
    const result = await compare(data.password, oldPassword);
    console.log(result);

    return result;
  }
}

export default UserHelper;
