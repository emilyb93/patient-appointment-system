import { useState } from "react";
import { formatTimeForDatabase } from "../utils";
import { useAppointments } from "@lutra/trpc-hooks/useAppointments";

export function useAppointmentPicker(patientId: number) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [notes, setNotes] = useState<string>("");

  const { createAppointment, appointmentList } = useAppointments(patientId);

  const availableTimes = [
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
  ];

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset selected time when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleSubmit = async () => {
    if (selectedDate && selectedTime && selectedReason) {
      const dateTime = formatTimeForDatabase(selectedDate, selectedTime);

      try {
        await createAppointment.mutateAsync({
          patientId,
          dateTime,
          reason: selectedReason,
          notes,
        });

        alert(`${selectedReason} booked for ${dateTime}`);
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Please select a date, time, and reason.");
    }
  };

  return {
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    selectedReason,
    setSelectedReason,
    notes,
    setNotes,
    availableTimes,
    handleDateChange,
    handleTimeSelect,
    handleSubmit,
    appointmentList,
  };
}
