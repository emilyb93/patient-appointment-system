import { db } from "@lutra/server/db";

export const patientService = {
  getAllPatients: async () => {
    const patients = await db.query.patients.findMany();

    return patients;
  },
};
