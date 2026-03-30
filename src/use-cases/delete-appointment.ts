import { AppointmentsRepository } from "../repositories/appointments-repository";

export class DeleteAppointmentUseCase {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute(id: string) {
    const appointment = await this.appointmentsRepository.findById(id);

    if (!appointment) {
      throw new Error("Appointment not found by id");
    }

    await this.appointmentsRepository.delete(id);
  }
}
