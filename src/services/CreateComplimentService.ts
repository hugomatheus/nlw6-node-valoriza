import { getCustomRepository } from "typeorm";
import { ComplimentRepository } from "../repositories/ComplimentRepository";
import { UserRepository } from "../repositories/UserRepository";

interface IComplimentRequest {
  user_sender: string;
  user_receiver: string;
  tag_id: string;
  message: string;
}

export class CreateComplimentService {
  async execute({user_sender, user_receiver, tag_id, message}: IComplimentRequest) {

    if(user_sender === user_receiver) {
      throw new Error("sender equals receiver");
    }

    const userRepository = getCustomRepository(UserRepository);

    const receiverExists = userRepository.findOne(user_receiver);
    if(!receiverExists){
      throw new Error("Receiver does not exists");
    }

    const complimentRepository = getCustomRepository(ComplimentRepository);
    const compliment = complimentRepository.create({user_sender, user_receiver, tag_id, message});
    await complimentRepository.save(compliment);
    
    return compliment;

  }
}