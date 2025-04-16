import type { AppointmentOutput } from "../types";

type AppointmentListProps = {
  appointments: AppointmentOutput[];
};

export function AppointmentList({ appointments }: AppointmentListProps) {
  if (appointments.length === 0) {
    return <p>No appointments yet</p>;
  }

  return (
    <ul>
      {appointments.map((app) => {
        return (
          <li key={app.id} className="mt-2">
            <div className="border rounded p-2 bg-gray-50">
              <p className="text-sm text-gray-700">
                Appointment Date: {new Date(app.scheduledFor).toDateString()} at{" "}
                {new Date(app.scheduledFor).toTimeString().split(" ")[0]}
              </p>
              <p className="text-sm text-gray-700">Reason: {app.reason}</p>
              <p className="text-sm text-gray-700">Status: {app.status}</p>
              <p className="text-sm text-gray-700">Notes: {app.notes}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
