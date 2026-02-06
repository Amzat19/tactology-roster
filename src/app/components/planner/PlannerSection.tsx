"use client";

import {
  Box,
  Flex,
  Text,
  Button,
  HStack,
  IconButton,
  Menu,
} from "@chakra-ui/react";
import {
  ArrowDown2,
  Add,
  ArrowLeft2,
  ArrowRight2,
  Filter,
  People,
} from "iconsax-react";
import PlannerTimeGrid from "./PlannerTimeGrid";
import RosterPanel from "./RosterPanel";
import { useEffect, useState } from "react";
import { addDays, isSameDay, startOfWeek } from "@/utils/date";
import { plannerEvents, type PlannerEvent } from "@/data/planner-events";

type PlannerMode = "live" | "plan";
export type Granularity = "day" | "week" | "month";

export default function PlannerSection() {
  const [mode, setMode] = useState<PlannerMode>("live");
  const [activeRosterTab, setActiveRosterTab] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [granularity, setGranularity] = useState<Granularity>("day");
  const [loading, setLoading] = useState(false);

  const weekday = currentDate.toLocaleDateString("en-US", {
    weekday: "short",
  });

  const day = currentDate.getDate();

  const monthYear = currentDate.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  const shiftDate = (direction: -1 | 1) => {
    setCurrentDate((prev) => {
      const next = new Date(prev);

      if (granularity === "day") next.setDate(prev.getDate() + direction);
      if (granularity === "week") next.setDate(prev.getDate() + 7 * direction);
      if (granularity === "month") next.setMonth(prev.getMonth() + direction);

      return next;
    });
  };

  function filterEvents(
    events: PlannerEvent[],
    date: Date,
    granularity: "day" | "week" | "month",
  ) {
    if (granularity === "day") {
      return events.filter((e) => isSameDay(e.date, date));
    }

    if (granularity === "week") {
      const start = startOfWeek(date);
      const end = addDays(start, 7);
      return events.filter((e) => e.date >= start && e.date < end);
    }

    // month (basic, acceptable)
    return events.filter(
      (e) =>
        e.date.getMonth() === date.getMonth() &&
        e.date.getFullYear() === date.getFullYear(),
    );
  }

  const visibleEvents = filterEvents(plannerEvents, currentDate, granularity);

  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(id);
  }, [currentDate, granularity]);

  return (
    <Box>
      {/* Title + actions */}
      <Flex
        justify="space-between"
        align="center"
        py={4}
        borderBottomWidth={"1px"}
        px={6}
      >
        <Text
          fontSize="2xl"
          fontFamily={"body"}
          color={"#242424"}
          fontWeight={600}
        >
          Planner
        </Text>

        <HStack gap={2}>
          <Button variant="outline" size="md">
            <HStack gap={2} px={3}>
              <ArrowDown2 size={18} variant="Linear" color="black" />
              <Text fontSize="sm" fontFamily={"body"} fontWeight={600}>
                Open Days
              </Text>
            </HStack>
          </Button>

          <Button size="md" variant={"outline"}>
            <HStack gap={2} px={3}>
              <Add size={18} variant="Linear" color="black" />
              <Text fontSize="sm">Nieuw</Text>
              <ArrowDown2 size={18} variant="Linear" color="black" />
            </HStack>
          </Button>
        </HStack>
      </Flex>

      {/* Live / Planner bar */}
      <HStack
        gap={4}
        bg={mode === "live" ? "#FFF5F5" : "#F0F0FF"}
        py={2}
        px={3}
        borderRadius="20px"
        ml={3}
        my={4}
        fontFamily={"body"}
      >
        <Box bg={"white"} borderRadius={"20px"} p={1} display="flex" gap={1}>
          <Box
            px={4}
            py={1}
            borderRadius="full"
            bg={mode === "live" ? "red.500" : "transparent"}
            cursor="pointer"
            onClick={() => setMode("live")}
          >
            <Text
              fontSize="xs"
              fontWeight={700}
              color={mode === "live" ? "white" : "#7E919F"}
            >
              Live
            </Text>
          </Box>

          <Box
            px={4}
            py={1}
            borderRadius="full"
            bg={mode === "plan" ? "blue.500" : "transparent"}
            cursor="pointer"
            onClick={() => setMode("plan")}
          >
            <Text
              fontSize="xs"
              fontWeight={700}
              color={mode === "plan" ? "white" : "#7E919F"}
            >
              Planner
            </Text>
          </Box>
        </Box>

        <Text fontSize={"xs"} fontWeight={500}>
          Description of the {mode === "live" ? "live" : "planner vieww"} mode
        </Text>
      </HStack>

      {/* Date + controls */}

      <Flex mx={6}>
        {activeRosterTab && <RosterPanel />}
        <Box flex="1" overflow={"scroll"}>
          <Flex justify="space-between" align="center" mb={4} px={6}>
            {/* Date */}
            <HStack gap={3}>
              <Box
                px={3}
                py={2}
                borderRadius="2xl"
                borderColor={"#D9E5F2"}
                borderWidth={"1px"}
              >
                <HStack gap={1}>
                  <Text fontSize="xs" fontWeight={500} fontFamily={"body"}>
                    {weekday}
                  </Text>
                  <Text fontSize="xs" fontWeight={600} fontFamily={"body"}>
                    {day}
                  </Text>
                </HStack>
              </Box>

              <Text fontSize="xl" fontFamily={"body"} fontWeight={600}>
                {monthYear}
              </Text>
            </HStack>

            {/* Controls */}
            <HStack gap={2} fontFamily={"body"}>
              <IconButton
                variant={"outline"}
                onClick={() => setActiveRosterTab(!activeRosterTab)}
              >
                <People size={18} color="black" />
              </IconButton>

              <IconButton variant={"outline"}>
                <Filter size={18} color="black" />
              </IconButton>

              <HStack gap={0}>
                <IconButton variant={"outline"} onClick={() => shiftDate(-1)}>
                  <ArrowLeft2 size={18} color="black" />
                </IconButton>
                <Button size="md" variant="outline" fontWeight={600} px={3}>
                  Current{" "}
                  {granularity === "day"
                    ? "Day"
                    : granularity === "week"
                      ? "Week"
                      : "Month"}
                </Button>
                <IconButton variant={"outline"} onClick={() => shiftDate(+1)}>
                  <ArrowRight2 size={18} color="black" />
                </IconButton>
              </HStack>

              <Menu.Root>
                <Menu.Trigger asChild>
                  <Button
                    variant="outline"
                    px={3}
                    fontWeight={600}
                    fontFamily={"body"}
                  >
                    {granularity === "day"
                      ? "This Day"
                      : granularity === "week"
                        ? "This Week"
                        : "This Month"}
                    <ArrowDown2 size={18} color="black" />
                  </Button>
                </Menu.Trigger>

                <Menu.Content fontFamily={"body"}>
                  <Menu.Item
                    value="day"
                    onClick={() => setGranularity("day")}
                    textAlign={"center"}
                    fontFamily={"body"}
                  >
                    Day
                  </Menu.Item>
                  <Menu.Item
                    value="week"
                    onClick={() => setGranularity("week")}
                    textAlign={"center"}
                  >
                    Week
                  </Menu.Item>
                  <Menu.Item
                    value="month"
                    onClick={() => setGranularity("month")}
                    textAlign={"center"}
                  >
                    Month
                  </Menu.Item>
                </Menu.Content>
              </Menu.Root>

              <Button
                size="md"
                fontSize={"sm"}
                fontWeight={600}
                variant="outline"
                px={3}
              >
                Publish All
              </Button>

              <Button
                size="md"
                fontSize={"sm"}
                fontWeight={600}
                variant="outline"
                px={3}
              >
                <Add size={18} variant="Linear" color="black" />
                Lock Shift
              </Button>
            </HStack>
          </Flex>

          {/* Column headers */}
          <Flex
            bg="gray.100"
            borderRadius="lg"
            overflow="hidden"
            mx={6}
            mt={3}
            fontFamily="body"
          >
            {/* Days column – fixed width */}
            <Box
              w="120px"
              px={2}
              py={4}
              bg="purple.50"
              borderRight="1px solid #E6EDF5"
            >
              <Text
                fontSize="sm"
                fontWeight={600}
                textAlign="center"
                color="purple.600"
              >
                Days
              </Text>
            </Box>

            {/* Other columns – flexible */}
            {[
              "Behandelkamer1",
              "Management",
              "Bijzonderheden-Verlof-Cursus-",
              "Financien",
            ].map((label, index) => (
              <Box
                key={label}
                flex="1"
                px={2}
                py={4}
                borderRight={index !== 3 ? "1px solid #E6EDF5" : undefined}
              >
                <Text
                  fontSize="sm"
                  fontWeight={500}
                  textAlign="center"
                  color="gray.600"
                >
                  {label}
                </Text>
              </Box>
            ))}
          </Flex>

          <PlannerTimeGrid
            events={visibleEvents}
            date={currentDate}
            loading={loading}
          />
        </Box>
      </Flex>
    </Box>
  );
}
