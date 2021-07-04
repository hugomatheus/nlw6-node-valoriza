import { Request, Response } from "express";
import { CreateTagService } from "../services/CreateTagService";
import { ListTagsService } from "../services/ListTagsService";

export class TagController {
  async store(request: Request, response: Response) {
    const { name } = request.body;

    const tagService = new CreateTagService();
    const tag = await tagService.execute({name});
    
    return response.json(tag);
  }
  async index(request: Request, response: Response){
    const tagService = new ListTagsService();
    const tags = await tagService.execute();
    return response.json(tags);
  }
}