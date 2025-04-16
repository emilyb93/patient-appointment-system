import { useContext } from "react";
import { api } from "@lutra/trpc/react";

export const usePatientList = ({ page }: { page: number }) => {
  const { data: patients, isLoading } = api.patients.getAllPatients.useQuery({
    page,
  });

  return {
    patients: patients || [],
    patientsLoading: isLoading,
  };
};
