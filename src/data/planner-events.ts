import { addDays, startOfWeek } from "@/utils/date";

export type PlannerEvent = {
  id: string;
  date: Date;
  start: string;
  end: string;
  columnId: number;
  title: string;
  person: string;
};

const today = new Date();
const thisWeekStart = startOfWeek(today);

// 7 days last week + 7 this week + 7 next week
const DAYS_RANGE = 21;

const columns = ["Behandelkamer1", "Management", "Bijzonderheden", "Financien"];

export const plannerEvents: PlannerEvent[] = Array.from(
  { length: DAYS_RANGE },
  (_, i) => {
    const date = addDays(thisWeekStart, i - 7);

    return columns.flatMap((_, columnId) => [
      {
        id: `${date.toDateString()}-${columnId}-1`,
        date,
        start: "11:00",
        end: "12:00",
        columnId,
        title: "Morning shift",
        person: "Alex",
      },
      {
        id: `${date.toDateString()}-${columnId}-2`,
        date,
        start: "13:00",
        end: "15:00",
        columnId,
        title: "Afternoon shift",
        person: "Sam",
      },
    ]);
  },
).flat();
