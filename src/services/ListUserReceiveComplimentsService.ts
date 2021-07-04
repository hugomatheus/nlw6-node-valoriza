import { getCustomRepository } from "typeorm";
import { ComplimentRepository } from "../repositories/ComplimentRepository";

interface IReceiverRequest {
  user_id: string;
}

export class ListUserReceiveComplimentsService {
  async execute({user_id}: IReceiverRequest) {
    const complimentRepository = getCustomRepository(ComplimentRepository);
    const receives = await complimentRepository.find({
      where: {
        user_receiver: user_id
      },
      relations: ["userSender", "userReceiver", "tag"]
    });
    return receives;
  }
}