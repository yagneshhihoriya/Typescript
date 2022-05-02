import jwt from 'jsonwebtoken';
import { compare } from 'bcryptjs';
import config from '../../config/environment.config'
import db, { IUser } from '../models/users.model';
import { DataStoredInToken, User } from '../interfaces/users.interface';


export class UsersService {

    public async logIn(users: IUser): Promise<any> {
        const findUser: User = await db.findOne({ email: users.email });
        if (!findUser) {
            return Promise.reject(new Error('Email does not exists'));
        }

        const isPasswordMatching: boolean = await compare(users.password, findUser.password);
        if (!isPasswordMatching) {
            return Promise.reject(new Error('Password does not match'));
        }
      
        const tokenData = this.createToken(findUser);
        return { tokenData, findUser};
    }

    private createToken(users: User) {
        const dataStoredInToken: DataStoredInToken = { _id: users._id };
        const secretKey: string = config.TOKEN_SECRET;
        const expiresIn: number = 60 * 60;
    
        return jwt.sign(dataStoredInToken, secretKey, { expiresIn });
    }
    
}