import { Request, Response } from "express";
import { CreateComplimentService } from "../services/CreateComplimentService";
import { ListUserReceiveComplimentsService } from "../services/ListUserReceiveComplimentsService";
import { ListUserSendComplimentsService } from "../services/ListUserSendComplimentsService";

export class ComplimentController {
  async store(request: Request, response: Response) {
    const { user_receiver, tag_id, message } = request.body; 
    const { user_id } = request;

    const complimentService = new CreateComplimentService();
    const compliment = await complimentService.execute({
      user_sender: user_id, 
      user_receiver, 
      tag_id, message
    });
    
    return response.json(compliment);
  }

  async getListUserReceiver(request: Request, response: Response) {
    const {user_id} = request;
    const listUserReceiveComplimentsService = new ListUserReceiveComplimentsService();
    const receives = await listUserReceiveComplimentsService.execute({user_id});
    return response.json(receives);
  }

  async getListUserSend(request: Request, response: Response) {
    const {user_id} = request;
    const listUserReceiveComplimentsService = new ListUserSendComplimentsService();
    const sends = await listUserReceiveComplimentsService.execute({user_id});
    return response.json(sends);
  }
}