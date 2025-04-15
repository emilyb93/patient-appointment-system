import { useContext } from "react";
import { api } from "@lutra/trpc/react";

export const usePatientDetails = ({ id }: { id: number }) => {
  const { data: patient, error } = api.patients.getPatientDetails.useQuery({
    id,
  });

  if (error) throw error;
  return {
    patient: patient,
  };
};
