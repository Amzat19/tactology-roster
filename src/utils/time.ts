const START_HOUR = 11;
const SLOT_HEIGHT = 120; // 30 mins

export function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function getTop(time: string) {
  return (toMinutes(time) - START_HOUR * 60) * (SLOT_HEIGHT / 30);
}

export function getHeight(start: string, end: string) {
  return (toMinutes(end) - toMinutes(start)) * (SLOT_HEIGHT / 30) + 120;
}

export function overlaps(
  aStart: string,
  aEnd: string,
  bStart: string,
  bEnd: string,
) {
  return (
    toMinutes(aStart) < toMinutes(bEnd) && toMinutes(bStart) < toMinutes(aEnd)
  );
}
