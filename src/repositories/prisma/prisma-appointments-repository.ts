import { prisma } from "../../lib/db";
import { AppointmentsRepository } from "../appointments-repository";
import { Appointment } from "../../repositories/appointments-repository";

export class PrismaAppointmentsRepository implements AppointmentsRepository {
  async create(appointment: Appointment): Promise<void> {
    await prisma.appointment.create({
      data: {
        date: appointment.date,
        customer_id: appointment.customer_id,
        professional_id: appointment.professional_id,
      },
    });
  }

  async findByDate(date: Date): Promise<Appointment | null> {
    const appointment = await prisma.appointment.findFirst({
      where: {
        date,
      },
    });

    return appointment;
  }

  async findById(id: string): Promise<Appointment | null> {
    const appointment = await prisma.appointment.findUnique({
      where: {
        id,
      },
    });

    return appointment;
  }

  async findAll(): Promise<Appointment[]> {
    const appointments = await prisma.appointment.findMany();
    return appointments;
  }
  async delete(id: string): Promise<Appointment> {
    const appointment = await prisma.appointment.delete({
      where: {
        id,
      },
    });

    return appointment;
  }
}
