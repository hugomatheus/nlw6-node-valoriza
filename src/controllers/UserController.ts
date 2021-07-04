import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import { ListUsersService } from "../services/ListUsersService";

export class UserController {
  async store(request: Request, response: Response) {
    const { name, email, password, admin } = request.body; 

    const userService = new CreateUserService();
    const user = await userService.execute({name, email, password, admin});
    
    return response.json(user);
  }

  async index(request: Request, response: Response) {
    const userService = new ListUsersService();
    const users = await userService.execute();
    return response.json(users);
  }
}