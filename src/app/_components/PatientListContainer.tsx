"use client";

import PatientList from "./PatientList";

import { api } from "@lutra/trpc/react";
import { usePatientList } from "@lutra/trpc-hooks/usePatientList";

export default function PatientListContainer() {
  const { patients } = usePatientList();

  return <PatientList patients={patients} />;
}
