import { db } from "@lutra/server/db";
import { patients } from "@lutra/server/db/schema";
import { eq } from "drizzle-orm";

export const patientService = {
  getAllPatients: async () => {
    const patients = await db.query.patients.findMany();

    return patients;
  },
  getSinglePatient: async (id: number) => {
    const patientDetails = await db
      .select()
      .from(patients)
      .where(eq(patients.id, id));

    if (!patientDetails) throw new Error("Patient ID not found");
    return patientDetails[0];
  },
};
