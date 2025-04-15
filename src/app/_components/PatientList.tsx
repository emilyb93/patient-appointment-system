import type { PatientData } from "@lutra/app/types";
import PatientCard from "./PatientCard";

interface PatientListProps {
  patients: PatientData[];
}

export default function PatientList({ patients }: PatientListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 pb-1 sm:grid-cols-2 lg:grid-cols-3">
      {patients.map((patient) => {
        return <PatientCard key={patient.id} patient={patient} />;
      })}
    </div>
  );
}
