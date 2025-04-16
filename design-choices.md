# Design Choices

The purpose of this tech test was to create a full-stack application that prioritises scalability, maintainability, and performance.

---

## Frontend

In the frontend of the application, I compartmentalised components into meaningful pieces to ensure a clear separation of concerns. Since some of the code is client-side rendered, it was important to minimise unnecessary re-renders. For example, placing queries and state too high in the component tree could cause excessive re-renders of unrelated parts of the UI. By carefully managing state and query placement, I believe this balance has been successfully achieved.

To maintain flexibility for future updates, I kept backend API calls within container components. These components handle data fetching and pass the necessary information down to child components, allowing the UI to remain decoupled from data-fetching logic. See the code below for an example from [PatientListContainer](./src/app/_components/PatientListContainer.tsx):

```ts
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
```

Additionally, I utilised custom hooks wherever possible to extract logic from components. This approach keeps the components clean, reusable, and easier to test.

---

## Backend

The backend of the application is built using tRPC and Drizzle ORM.

When designing the backend, I ensured a clear separation of concerns by organising the logic into **services**, **procedures**, and **routers**:

- **Services**: Responsible solely for interacting with the database.
- **Procedures**: Call one or more services and format the data to be returned to the client.
- **Routers**: Group related procedures into logical units. For example:
  - Patient-related actions are handled in the `patientsRouter`.
  - Appointment-related actions are handled in the `appointmentsRouter`.

This structure makes the backend easy to navigate and ensures that each layer has a single responsibility.

```ts
// -- trpc-hooks/useAppointments.ts --

// TRPC Hook that will be called from the frontend component with the a single patientId whenever the page /patients/[id] is requested
export const useAppointments = (patientId: number) => {
  // Create a connection to tRPC
  const trpc = api.useUtils();

  // Connect with the appointmentRouter, find the right procedure, invoke it with the specific patients id
  // Gives us the data, as well as error and loading states we can use for conditional component logic in our components
  const {
    data: appointmentList,
    error,
    isLoading,
  } = api.appointmentRouter.listPatientsAppointments.useQuery({ patientId });

  return {
    appointmentList: appointmentList,
    appointmentError: error,
    appointmentsLoading: isLoading,
  };
};

// -- api/routers/appointment.ts --

// Router contains the procedures
export const appointmentRouter = {
  listPatientsAppointments: publicProcedure
    .input(z.object({ patientId: z.number() }))
    .output(ZodAppointmentListOutputSchema)
    .query(async ({ input: { patientId } }) => {
      // Procedures call services
      const appointmentsList = await appointmentService.listAppointments({
        patientId,
      });

      return appointmentsList;
    }),
} satisfies TRPCRouterRecord;

// -- api/services/appointmentService.ts --
export const appointmentService = {
  listAppointments: async ({
    patientId,
  }: {
    patientId: number;
  }): Promise<AppointmentWithNullableNotes[]> => {
    // Service interacts with database directly
    const appointmentList = await db
      .select()
      .from(appointments)
      .where(eq(appointments.patientId, patientId));

    // Returns results to the procedure
    return appointmentList || [];
  },
};
```

---

## Learning Experience with Drizzle

Prior to this project, I primarily worked with Prisma and its GraphQL-style query language. Transitioning to Drizzle was a learning curve, but I came to appreciate its SQL-style query syntax. I now prefer Drizzle for its simplicity and closer alignment with SQL, which makes it easier to reason about database interactions.

---

## Summary

This project demonstrates a focus on:

- **Frontend**: Clean component structure, minimal re-renders, and reusable logic through custom hooks.
- **Backend**: A well-structured architecture with clear separation of concerns using tRPC and Drizzle.
- **Scalability**: Flexible design choices that allow for future updates and enhancements.
- **Maintainability** - Separation of concerns, clear readable logic, and centralisation of reused constants and types
- **Performance** - Efficient state management, invalidating queries, pagination to reduce the amount of data being queried
