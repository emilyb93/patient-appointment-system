"use client";

import { useSearchParams } from "next/navigation";
import PatientDetailsContainer from "../../_components/PatientDetailsContainer";
import { usePatientDetails } from "trpc-hooks/useSinglePatient";

export default function PatientDetails() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Patient Details</h1>
      <PatientDetailsContainer />
    </div>
  );
}
