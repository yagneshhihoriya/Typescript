import { Response, Request } from "express";
import { UsersService } from '../services/users.service';
import { IUser } from '../models/users.model';

export class UsersApi {
    public constructor(private usersService: UsersService) {
        this.usersService = usersService;
    }

    public logIn = async (req: Request, res: Response): Promise<Response> => {
        try {
          const userData: IUser = req.body;
          const { tokenData, findUser }  = await this.usersService.logIn(userData);
        
          res.setHeader('Set-Token', tokenData);
          return  res.status(200).json({ data: findUser, message: 'login' });
        } catch (err) {
            return res.status(500).json({
                data: err,
            });
        }
    };
}





