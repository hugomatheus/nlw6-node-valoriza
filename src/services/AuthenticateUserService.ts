import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm"
import { UserRepository } from "../repositories/UserRepository"

interface IAuthenticateRequest {
  email: string;
  password: string;
}

export class AuthenticateUserService {
  async execute({email, password}: IAuthenticateRequest) {
    if(!email || !password) {
      throw new Error('Email/Password required')
    }

    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne({email});
    if(!user) {
      throw new Error('Email/Password incorrect')
    }

    const passwordCompare = await compare(password, user.password);
    if(!passwordCompare){
      throw new Error('Email/Password incorrect');
    }
    
    const token = sign({email: user.email}, process.env.APP_SECRET, {
      subject: user.id,
      expiresIn: "1d"
    });
    
    return token;

  }
}