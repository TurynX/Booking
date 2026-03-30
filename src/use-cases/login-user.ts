import { AuthRepository, Login, AuthResponse } from "../repositories/auth-repository";

export class LoginUserUseCase {
  constructor(private authRepository: AuthRepository) {}

  async execute(data: Login): Promise<AuthResponse> {
    const user = await this.authRepository.login(data);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
