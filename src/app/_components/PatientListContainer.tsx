"use client";

import PatientList from "./PatientList";

import { api } from "@lutra/trpc/react";
import { usePatientList } from "@lutra/trpc-hooks/usePatientList";
import { useState } from "react";
import { ChangePage } from "./ChangePage";

export default function PatientListContainer() {
  const [page, setPage] = useState<number>(1);
  const { patients, patientsLoading } = usePatientList({ page });

  return (
    <div>
      <ChangePage page={page} setPage={setPage} />
      {patientsLoading ? (
        <p>Loading Patients</p>
      ) : (
        <PatientList patients={patients} />
      )}
    </div>
  );
}
