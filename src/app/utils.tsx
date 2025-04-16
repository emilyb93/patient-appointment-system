export function formatTimeForDatabase(
  selectedDate: Date,
  selectedTime: string
) {
  const [time, modifier] = selectedTime.split(" ");
  if (!time) {
    throw new Error("Invalid time format");
  }
  const [hours, minutes] = time.split(":").map(Number);

  if (hours === undefined || minutes === undefined) {
    throw new Error("Invalid time format");
  }

  // Converts 24hr time to 12hr
  const adjustedHours =
    modifier === "PM" && hours !== 12
      ? hours + 12
      : modifier === "AM" && hours === 12
      ? 0
      : hours;

  const formattedDate = new Date(selectedDate);
  formattedDate.setHours(adjustedHours, minutes, 0, 0);
  return formattedDate;
}
