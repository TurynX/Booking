import { FastifyRequest, FastifyReply } from "fastify";
import { PrismaAppointmentsRepository } from "../../../repositories/prisma/prisma-appointments-repository";
import { GetAppointmentUseCase } from "../../../use-cases/get-appointment";

export async function get(req: FastifyRequest, reply: FastifyReply) {
  const appointmentRepository = new PrismaAppointmentsRepository();
  const getAppointmentService = new GetAppointmentUseCase(
    appointmentRepository,
  );

  const appointment = await getAppointmentService.execute();
  return reply.status(200).send(appointment);
}
