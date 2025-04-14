import type { TRPCRouterRecord } from "@trpc/server";
import { publicProcedure } from "../trpc";
import { db } from "@lutra/server/db";
import { patientService } from "../services/patientService";
import { appRouter } from "../root";
import { z } from "zod";

export const patientRouter = {
  getAllPatients: publicProcedure
    .output(
      z.array(
        z.object({
          id: z.number(),
          firstName: z.string().max(100),
          lastName: z.string().max(100),
          dateOfBirth: z.string(),
          email: z.string().email().nullable(),
          isActive: z.boolean(),
          createdAt: z.string(),
          updatedAt: z.string(),
        })
      )
    )
    .query(async () => {
      const patients = await patientService.getAllPatients();
      const formattedPatients = patients.map((patient) => {
        return {
          ...patient,
          createdAt: patient.createdAt.toString(),
          updatedAt: patient.updatedAt?.toString() || "",
          dateOfBirth: patient.dateOfBirth.toString(),
        };
      });
      return formattedPatients || [];
    }),
} satisfies TRPCRouterRecord;
