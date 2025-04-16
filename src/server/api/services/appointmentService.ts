import type { ExtendedClient } from "@lutra/app/types";
import { db } from "@lutra/server/db";
import { appointments, patients } from "@lutra/server/db/schema";
import { eq, type ExtractTableRelationsFromSchema } from "drizzle-orm";
import type { NodePgQueryResultHKT } from "drizzle-orm/node-postgres";
import type {
  PgDatabase,
  PgQueryResultHKT,
  PgTransaction,
} from "drizzle-orm/pg-core";
import type { Client } from "pg";
import type { TransactionSql } from "postgres";

type AppointmentStatus = "SCHEDULED" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

interface CreateAppointmentInput {
  patientId: number;
  dateTime: Date;
  reason: string;
  notes: string;
}

interface Appointment {
  patientId: number;
  scheduledFor: Date;
  status: AppointmentStatus;
  reason: string;
  notes: string;
}
type AppointmentWithNullableNotes = Omit<Appointment, "notes" | "patientId"> & {
  id: number;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date | null;
};

export const appointmentService = {
  createAppointment: async (
    tx: ExtendedClient,
    { patientId, dateTime, reason, notes }: CreateAppointmentInput
  ): Promise<Appointment> => {
    const newAppointment: Appointment = {
      patientId,
      scheduledFor: dateTime,
      status: "SCHEDULED" as AppointmentStatus,
      reason,
      notes,
    };

    const confirmation = await tx
      .insert(appointments)
      .values([newAppointment])
      .returning({
        patientId: appointments.id,
        scheduledFor: appointments.scheduledFor,
        status: appointments.status,
        reason: appointments.reason,
        notes: appointments.notes,
      });

    if (!confirmation[0]) throw new Error("Appointment creation error");
    return {
      ...confirmation[0],
      notes: confirmation[0].notes ?? "",
    };
  },
  listAppointments: async ({
    patientId,
  }: {
    patientId: number;
  }): Promise<AppointmentWithNullableNotes[]> => {
    const appointmentList = await db
      .select()
      .from(appointments)
      .where(eq(appointments.patientId, patientId));

    return appointmentList || [];
  },
};
