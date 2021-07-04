import { Request, Response } from "express";
import { CreateTagService } from "../services/CreateTagService";

export class TagController {
  async store(request: Request, response: Response) {
    const { name } = request.body;

    const tagService = new CreateTagService();
    const tag = await tagService.execute({name});
    
    return response.json(tag);
  }
}