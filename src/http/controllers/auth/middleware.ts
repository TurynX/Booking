import { FastifyRequest, FastifyReply } from "fastify";

export async function jwtAuthMiddleware(
  req: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    await req.jwtVerify();
  } catch (err) {
    return reply.status(401).send({ message: "Unauthorized" });
  }
}
