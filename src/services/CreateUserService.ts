import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { hash } from "bcryptjs";

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

export class CreateUserService {
  async execute({name, email, password, admin = false}: IUserRequest) {
    const userRepository = getCustomRepository(UserRepository);

    if(!email){
      throw new Error('E-mail is required');
    }

    if(!password){
      throw new Error('Password is required');
    }
    
    const userAlreadyExists = await userRepository.findOne({email});
    if(userAlreadyExists){
      throw new Error('User already exists');
    }
    
    const passwordHash = await hash(password, 8);
    const user = userRepository.create({
      name,
      email,
      password: passwordHash,
      admin
    });
    
    await userRepository.save(user);
    
    return user;
  }
}