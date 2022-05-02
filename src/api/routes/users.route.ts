import express from 'express';
import { UsersApi } from '../controller/users.api';
import { UsersService } from '../services/users.service';

const router = express.Router();

const service: UsersService = new UsersService();
const api: UsersApi = new UsersApi(service);

router.post('',  api.logIn);

export default router