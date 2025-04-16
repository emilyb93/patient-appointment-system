import { useContext } from "react";
import { api } from "@lutra/trpc/react";

export const usePatientList = () => {
  const { data: patients } = api.patients.getAllPatients.useQuery();

  return {
    patients: patients || [],
  };
};
