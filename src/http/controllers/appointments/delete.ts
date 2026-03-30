import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaAppointmentsRepository } from "../../../repositories/prisma/prisma-appointments-repository";
import { DeleteAppointmentUseCase } from "../../../use-cases/delete-appointment";

export async function deleteAppointment(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = request.params as { id: string };

  const appointmentRepository = new PrismaAppointmentsRepository();
  const deleteAppointmentService = new DeleteAppointmentUseCase(
    appointmentRepository,
  );

  const appointment = await deleteAppointmentService.execute(id);
  return reply.status(200).send(appointment);
}
