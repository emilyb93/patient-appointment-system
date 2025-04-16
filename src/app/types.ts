import type { db } from "@lutra/server/db";

export type PatientData = {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
};

export type ExtendedClient = Omit<
  typeof db,
  | "$connect"
  | "$disconnect"
  | "$on"
  | "$transaction"
  | "$use"
  | "$extends"
  | "$client"
>;

export type AppointmentOutput = {
  id: number;
  scheduledFor: Date;
  notes: string | null;
  reason: string;
  status: "SCHEDULED" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  createdAt: Date;
  updatedAt: Date | null;
};
