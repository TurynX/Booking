import { AuthRepository, RegisterUser } from "../repositories/auth-repository";

export class RegisterUserUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(data: RegisterUser) {
    const user = await this.authRepository.registerUser(data);
    if (!user) {
      throw new Error("User already exists");
    }
    return user;
  }
}
