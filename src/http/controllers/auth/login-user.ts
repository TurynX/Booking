import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { PrismaAuthRepository } from "../../../repositories/prisma/prisma-auth-repository";
import { LoginUserUseCase } from "../../../use-cases/login-user";

export async function loginUser(req: FastifyRequest, reply: FastifyReply) {
  const loginBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = loginBodySchema.parse(req.body);

  const prismaAuthRepository = new PrismaAuthRepository();
  const loginUserUseCase = new LoginUserUseCase(prismaAuthRepository);

  const user = await loginUserUseCase.execute({
    email,
    password,
  });

  const token = await reply.jwtSign(
    {
      role: user.role,
    },
    {
      sub: user.id,
      expiresIn: "1d",
    },
  );

  return reply.status(200).send({ token });
}
