import Link from "next/link";
import type { PatientData } from "../types";

interface PatientCardProps {
  patient: PatientData;
}

export default function SinglePatientCard({ patient }: PatientCardProps) {
  const {
    id,
    firstName,
    lastName,
    email,
    dateOfBirth,
    isActive,
    createdAt,
    updatedAt,
  } = patient;

  return (
    <div
      key={patient.id}
      className="group relative rounded border border-gray-200 bg-white p-4 shadow-md"
    >
      <h3 className="text-lg font-semibold">{`${firstName} ${lastName}`}</h3>
      <p className="text-sm text-gray-600">Date of Birth: {dateOfBirth}</p>
      <p className="text-sm text-gray-600">
        Status: {isActive ? "Active" : "Inactive"}
      </p>
      <p className="text-sm text-gray-600">Email: {email}</p>
      <p className="text-sm text-gray-600">
        Last updated:{" "}
        {updatedAt
          ? new Date(updatedAt).toDateString()
          : new Date(createdAt).toDateString()}
      </p>
    </div>
  );
}
