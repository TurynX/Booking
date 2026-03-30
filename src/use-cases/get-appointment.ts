import { AppointmentsRepository } from "../repositories/appointments-repository";

export class GetAppointmentUseCase {
  constructor(private appointmentsRepository: AppointmentsRepository) {}

  async execute() {
    const appointment = await this.appointmentsRepository.findAll();

    if (!appointment) {
      throw new Error("There are no appointments yet");
    }

    return appointment;
  }
}
