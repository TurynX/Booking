import { randomUUID } from "crypto";
import { AppointmentsRepository } from "../repositories/appointments-repository";

export class CreateAppointmentUseCase {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute(customer_id: string, professional_id: string, date: Date) {
    const appointmentOnSameDate =
      await this.appointmentsRepository.findByDate(date);

    if (appointmentOnSameDate) {
      throw new Error("Appointment already booked");
    }

    const create = await this.appointmentsRepository.create({
      customer_id,
      professional_id,
      date,
    });

    return create;
  }
}
