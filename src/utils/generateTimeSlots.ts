const START_HOUR = 11;
const END_HOUR = 18;

function generateTimeSlots() {
  const slots: string[] = [];

  for (let hour = START_HOUR; hour < END_HOUR; hour++) {
    slots.push(`${hour}:00`);
    slots.push(`${hour}:30`);
  }

  return slots;
}

export default generateTimeSlots;
