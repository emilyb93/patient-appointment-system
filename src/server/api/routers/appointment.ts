import type { TRPCRouterRecord } from "@trpc/server";
import { publicProcedure } from "../trpc";
import { db } from "@lutra/server/db";
import { appointmentService } from "../services/appointmentService";
import { appRouter } from "../root";
import { z } from "zod";

const ZodAppointmentInsertSchema = z.object({
  patientId: z.number(),
  dateTime: z.date(),
  notes: z.string(),
  reason: z.string(),
});

const ZodAppointmentListOutputSchema = z.array(
  z.object({
    id: z.number(),
    scheduledFor: z.date(),
    notes: z.string().nullable(),
    reason: z.string(),
    status: z.enum(["SCHEDULED", "CONFIRMED", "COMPLETED", "CANCELLED"]),
    createdAt: z.date(),
    updatedAt: z.date().nullable(),
  })
);

export const appointmentRouter = {
  addAppointment: publicProcedure
    .input(ZodAppointmentInsertSchema)
    .mutation(async ({ input: { patientId, dateTime, notes, reason } }) => {
      // add an appointment
      const result = await db.transaction(async (tx) => {
        const appointment = await appointmentService.createAppointment(tx, {
          patientId,
          dateTime,
          notes,
          reason,
        });
      });

      return result;
    }),
  listPatientsAppointments: publicProcedure
    .input(z.object({ patientId: z.number() }))
    .output(ZodAppointmentListOutputSchema)
    .query(async ({ input: { patientId } }) => {
      const appointmentsList = await appointmentService.listAppointments({
        patientId,
      });

      return appointmentsList;
    }),
} satisfies TRPCRouterRecord;
