import { db } from "@lutra/server/db";
import { patients } from "@lutra/server/db/schema";
import { eq } from "drizzle-orm";

export const patientService = {
  getAllPatients: async ({ page }: { page: number }) => {
    const pageSize = 5;
    const offset = (page - 1) * pageSize;
    const patientList = await db
      .select()
      .from(patients)
      .limit(5)
      .offset(offset);

    return patientList;
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
