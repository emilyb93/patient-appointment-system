"use client";

import PatientCard from "./PatientCard";
import { useParams, useSearchParams } from "next/navigation";
import { usePatientDetails } from "trpc-hooks/useSinglePatient";
import SinglePatientCard from "./SinglePatientCard";

export default function PatientDetailsContainer({}) {
  const searchParams = useParams<{ id: string }>();
  const id = searchParams.id;
  const { patient } = usePatientDetails({ id: Number(id) });

  if (!patient) return <div>Loading ...</div>;
  return (
    <div>
      <SinglePatientCard patient={patient.patient} />
    </div>
  );
}
