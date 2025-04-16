"use client";

import PatientCard from "./PatientCard";
import { useParams, useSearchParams } from "next/navigation";
import { usePatientDetails } from "@lutra/trpc-hooks/useSinglePatient";
import SinglePatientCard from "./SinglePatientCard";
import { AppointmentList } from "./AppointmentList";
import { useAppointments } from "@lutra/trpc-hooks/useAppointments";

export default function PatientDetailsContainer({
  patientId,
}: {
  patientId: number;
}) {
  const { patient } = usePatientDetails({ id: Number(patientId) });
  const { appointmentList, appointmentsLoading } = useAppointments(patientId);
  console.log(appointmentList, "<<<<<<<<<?");

  if (!patient || !appointmentList) return <div>Loading ...</div>;
  return (
    <div>
      <SinglePatientCard patient={patient.patient} />

      <section>
        <p className="mt-5 text-2xl">Appointments</p>

        {appointmentList && <AppointmentList appointments={appointmentList} />}
      </section>
    </div>
  );
}
