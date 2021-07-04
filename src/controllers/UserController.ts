import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";

export class UserController {
  async store(request: Request, response: Response) {
    const { name, email, password, admin } = request.body; 

    const userService = new CreateUserService();
    const user = await userService.execute({name, email, password, admin});
    
    return response.json(user);
  }
}