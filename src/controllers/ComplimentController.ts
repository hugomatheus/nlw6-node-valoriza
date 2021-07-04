import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";

export class ComplimentController {
  async store(request: Request, response: Response) {
    const { user_sender, user_receiver, tag_id, message } = request.body; 

    const complimentService = new CreateComplimentService();
    const compliment = await complimentService.execute({user_sender, user_receiver, tag_id, message});
    
    return response.json(compliment);
  }
}