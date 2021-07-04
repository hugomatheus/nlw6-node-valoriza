import { getCustomRepository } from "typeorm";
import { ComplimentRepository } from "../repositories/ComplimentRepository";

interface ISendRequest {
  user_id: string;
}

export class ListUserSendComplimentsService {
  async execute({user_id}: ISendRequest) {
    const complimentRepository = getCustomRepository(ComplimentRepository);
    const sends = await complimentRepository.find({
      where: {
        user_sender: user_id
      },
      relations: ["userSender", "userReceiver", "tag"]
    });
    return sends;
  }
}