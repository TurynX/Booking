import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaAppointmentsRepository } from "../../../repositories/prisma/prisma-appointments-repository";
import { GetByIdAppointmentUseCase } from "../../../use-cases/get-by-id-appointment";

export async function getById(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  const appointmentRepository = new PrismaAppointmentsRepository();
  const getAppointmentService = new GetByIdAppointmentUseCase(
    appointmentRepository,
  );

  const appointment = await getAppointmentService.execute(id);
  return reply.status(200).send(appointment);
}
