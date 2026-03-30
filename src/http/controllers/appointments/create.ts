import { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";
import { PrismaAppointmentsRepository } from "../../../repositories/prisma/prisma-appointments-repository";
import { CreateAppointmentUseCase } from "../../../use-cases/create-appointment.ts";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const customer_id = req.user.sub;

  const createAppointmentBodySchema = z.object({
    professional_id: z.string(),
    date: z.coerce.date(),
  });

  const { professional_id, date } = createAppointmentBodySchema.parse(req.body);

  const appointmentRepository = new PrismaAppointmentsRepository();
  const createAppointmentService = new CreateAppointmentUseCase(
    appointmentRepository,
  );

  const appointment = await createAppointmentService.execute(
    customer_id,
    professional_id,
    date,
  );

  return reply.status(201).send(appointment);
}
