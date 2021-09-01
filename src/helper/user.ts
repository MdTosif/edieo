import User from '../models/user';
import { hash, compare } from 'bcryptjs';
import { Sequelize } from 'sequelize';

class UserHelper {

    static async AddUser(data: { username: string; password: any; email: string; }) {
        const hashPassword = await hash(data.password, 10);
        data.password = hashPassword;
        const newUser = await User.create(data);
        console.log(newUser.toJSON());
        return newUser.toJSON();
    };

    static async getAllUser() {
        const allUser = await User.findAll({
            attributes: ['username', 'email'],
        });
        console.log(allUser);
        return allUser;
    }

    static async deleteAllUser() {
        const result = await User.destroy({
            truncate: true
        });
        console.log(result);
        return result;
    }

    static async getUser(usernameOrEmail: string) {
        const user = await User.findOne({
            where: Sequelize.or(
                { email: usernameOrEmail },
                { username: usernameOrEmail })
        });
        // console.log(user);
        return user;
    }

    static async authenticate(data: { user: string; password: any; }) {
        const user = await this.getUser(data.user);
        const oldPassword = user?.getDataValue('password');
        const result = await compare(data.password, oldPassword);
        console.log(result);

        return result;
    }
}

// UserHelper.AddUser({
//     username: 'Tosif2',
//     password: 'xy123',
//     email: 'tosif1@xyoz.in'
// });

// UserHelper.getAllUser();
// UserHelper.deleteAllUser();

// UserHelper.authenticate({
//     user: 'Tosif4',
//     password: 'xy123'
// });

// UserHelper.getUser('Tosif4');



export default UserHelper;