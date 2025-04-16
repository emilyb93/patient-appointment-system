"use client";

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAppointmentPicker } from "../_react-hooks/useAppointmentPicker";

export default function AppointmentPicker({
  patientId,
}: {
  patientId: number;
}) {
  const {
    selectedDate,
    selectedTime,
    selectedReason,
    notes,
    availableTimes,
    handleDateChange,
    handleTimeSelect,
    handleSubmit,
    setSelectedReason,
    setNotes,
  } = useAppointmentPicker(patientId);

  return (
    <div className="w-1/2 mx-auto">
      <h2 className="text-xl font-bold mb-4">Book another appointment</h2>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        inline
        className="border rounded-md p-2"
      />
      {selectedDate && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Available Times</h3>
          <ul className="space-y-2">
            {availableTimes.map((time) => (
              <li key={time}>
                <button
                  onClick={() => handleTimeSelect(time)}
                  className={`px-4 py-2 border rounded-md ${
                    selectedTime === time
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {time}
                </button>
              </li>
            ))}
          </ul>
          <form className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Reason for Appointment
              </label>
              <select
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
                className="w-full border rounded-md p-2"
              >
                <option value="" disabled>
                  Select a reason
                </option>
                <option value="Consultation">Consultation</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Routine Checkup">Routine Checkup</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full border rounded-md p-2"
                rows={4}
                placeholder="Add any additional notes here..."
              />
            </div>
          </form>
          <button
            onClick={handleSubmit}
            className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}
