import { HydrateClient, api } from "@lutra/trpc/server";

import PatientCard from "@lutra/app/_components/PatientCard";
import PatientListContainer from "@lutra/app/_components/PatientListContainer";

export default async function Home() {
  const doctorSurname = "Groenefeld";
  return (
    <HydrateClient>
      <div className="space-y-4 p-4 sm:p-6 lg:p-8">
        {/* <InstructionBanner /> */}
        <header>
          <h1>Hello Mr {doctorSurname}</h1>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">Patients</h3>
          </div>
        </header>
        <main>
          <div className="mt-6">
            <PatientListContainer />
          </div>
        </main>
      </div>
    </HydrateClient>
  );
}
