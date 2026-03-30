export interface Appointment {
  customer_id: string;
  professional_id: string;
  date: Date;
}

export interface CreateAppointmentInput {
  customer_id: string;
  professional_id: string;
  date: Date;
}

export interface AppointmentsRepository {
  create(appointment: CreateAppointmentInput): Promise<void>;
  findByDate(date: Date): Promise<Appointment | null>;
  findById(id: string): Promise<Appointment | null>;
  findAll(): Promise<Appointment[]>;
  delete(id: string): Promise<Appointment | null>;
}
