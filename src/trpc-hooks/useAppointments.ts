import { useContext } from "react";
import { api } from "@lutra/trpc/react";
import { useQueryClient } from "@tanstack/react-query";

export const useAppointments = (patientId: number) => {
  const trpc = api.useUtils();

  // Query to list appointments
  const queryClient = useQueryClient();
  const {
    data: appointmentList,
    error,
    isLoading,
  } = api.appointmentRouter.listPatientsAppointments.useQuery({ patientId });

  // Mutation to create an appointment
  const createAppointment = api.appointmentRouter.addAppointment.useMutation({
    onSuccess: () => {
      trpc.appointmentRouter.listPatientsAppointments.invalidate({ patientId });
    },
  });
  return {
    appointmentList: appointmentList,
    appointmentError: error,
    appointmentsLoading: isLoading,
    createAppointment,
  };
};
