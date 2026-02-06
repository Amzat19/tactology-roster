// utils/group-events.ts
import { PlannerEvent } from "@/data/planner-events";
import { toMinutes } from "./time";

export interface RenderBlock {
  columnId: number;
  start: string;
  end: string;
  events: PlannerEvent[];
}

export function groupEvents(events: PlannerEvent[]): RenderBlock[] {
  const byColumn = new Map<number, PlannerEvent[]>();

  // 1. Group by column
  events.forEach((e) => {
    if (!byColumn.has(e.columnId)) {
      byColumn.set(e.columnId, []);
    }
    byColumn.get(e.columnId)!.push(e);
  });

  const blocks: RenderBlock[] = [];

  // 2. Process each column independently
  byColumn.forEach((columnEvents, columnId) => {
    // Sort by start time
    const sorted = [...columnEvents].sort(
      (a, b) => toMinutes(a.start) - toMinutes(b.start),
    );

    let current: RenderBlock | null = null;

    sorted.forEach((event) => {
      if (!current) {
        current = {
          columnId,
          start: event.start,
          end: event.end,
          events: [event],
        };
        return;
      }

      // Check overlap ONLY with current block
      if (toMinutes(event.start) < toMinutes(current.end)) {
        current.events.push(event);
        current.end =
          toMinutes(event.end) > toMinutes(current.end)
            ? event.end
            : current.end;
      } else {
        blocks.push(current);
        current = {
          columnId,
          start: event.start,
          end: event.end,
          events: [event],
        };
      }
    });

    if (current) blocks.push(current);
  });

  return blocks;
}

export function groupEventsByHour(events: PlannerEvent[]) {
  const map = new Map<string, PlannerEvent[]>();

  events.forEach((event) => {
    const hour = event.start.split(":")[0] + ":00";
    if (!map.has(hour)) map.set(hour, []);
    map.get(hour)!.push(event);
  });

  return Array.from(map.entries()).map(([hour, items]) => ({
    hour,
    items,
  }));
}
