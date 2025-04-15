import Link from "next/link";
import type { PatientData } from "../types";

interface PatientCardProps {
  item?: number;
  patient: PatientData;
}

export default function PatientCard({ item, patient }: PatientCardProps) {
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
    <Link href={`/patients/${id}`}>
      <div
        key={item}
        className="group relative rounded border border-gray-200 bg-white p-2"
      >
        <div className="h-20">
          <div className="relative h-full overflow-hidden rounded bg-gray-50">
            <svg
              className="absolute inset-0 h-full w-full stroke-blue-100"
              fill="none"
            >
              <title>{firstName + " " + lastName}</title>
              <defs>
                <pattern
                  id="pattern-1"
                  x="0"
                  y="0"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3" />
                </pattern>
              </defs>
              <rect
                stroke="none"
                fill="url(#pattern-1)"
                width="100%"
                height="100%"
              />
            </svg>
          </div>
        </div>
        <h3 className="mt-2 font-semibold">{`${firstName} ${lastName}`}</h3>
        <p className="text-gray-600"> {dateOfBirth}</p>
      </div>
    </Link>
  );
}
