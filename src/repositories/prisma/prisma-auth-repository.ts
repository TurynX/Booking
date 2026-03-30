import { prisma } from "../../lib/db";
import {
  AuthRepository,
  RegisterUser,
  Login,
  AuthResponse,
} from "../auth-repository";

export class PrismaAuthRepository implements AuthRepository {
  async registerUser(data: RegisterUser): Promise<AuthResponse> {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      },
    });
    return user;
  }

  async login(data: Login): Promise<AuthResponse> {
    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
        password: data.password,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }
}
