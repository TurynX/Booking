import { FastifyRequest, FastifyReply } from "fastify";
import z from "zod";
import { PrismaAuthRepository } from "../../../repositories/prisma/prisma-auth-repository";
import { RegisterUserUseCase } from "../../../use-cases/register-user";

export async function registerUser(req: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.enum(["CUSTOMER", "PROFESSIONAL"]),
  });

  const { name, email, password, role } = registerBodySchema.parse(req.body);

  const prismaAuthRepository = new PrismaAuthRepository();
  const registerUserUseCase = new RegisterUserUseCase(prismaAuthRepository);

  const user = await registerUserUseCase.execute({
    name,
    email,
    password,
    role,
  });

  return reply.status(201).send(user);
}
