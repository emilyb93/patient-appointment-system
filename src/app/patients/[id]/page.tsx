"use client";

import { redirect, useParams, useSearchParams } from "next/navigation";
import PatientDetailsContainer from "../../_components/PatientDetailsContainer";
import { usePatientDetails } from "trpc-hooks/useSinglePatient";
import AppointmentPicker from "@lutra/app/_components/AppointmentPicker";

export default function PatientDetails() {
  const searchParams = useParams<{ id: string }>();
  const patientId = Number(searchParams.id);
  return (
    <div className="container mx-auto p-4 flex flex-row">
      <div className="w-1/2">
        <div className="">
          <button
            aria-label="Go back to the patient list"
            onClick={() => redirect("/patients")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {"<-"} Home
          </button>
        </div>
        <h1 className="text-2xl font-bold mb-4 ">Patient Details</h1>
        <PatientDetailsContainer patientId={patientId} />
      </div>
      <div className="w-1/2">
        <AppointmentPicker patientId={patientId} />
      </div>
    </div>
  );
}
