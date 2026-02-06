"use client";

import { type PlannerEvent } from "@/data/planner-events";
import generateTimeSlots from "@/utils/generateTimeSlots";
import { groupEvents, type RenderBlock } from "@/utils/group-events";
import { getHeight, getTop, toMinutes } from "@/utils/time";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import SeeAllModal, { getEventColor } from "./SeeAllModal";

const columns = [
  "Behandelkamer1",
  "Management",
  "Bijzonderheden-Verlof-Cursus-",
  "Financien",
];

const timeSlots = generateTimeSlots();
const SLOT_HEIGHT = 120;
const TIME_COL_WIDTH = "120px";

export default function PlannerTimeGrid({
  date,
  events,
  loading,
}: {
  date: Date;
  events: PlannerEvent[];
  loading: boolean;
}) {
  const renderBlocks = groupEvents(events);
  const [activeBlock, setActiveBlock] = useState<RenderBlock | null>(null);
  const MAX_VISIBLE_LANES = 2;
  const LANE_GAP = 6; // px

  if (!loading && renderBlocks.length === 0) {
    return (
      <Flex
        h="300px"
        align="center"
        justify="center"
        direction="column"
        color="gray.500"
      >
        <Text fontWeight={600}>No schedules for this day</Text>
        <Text fontSize="sm">Try another date or create a new shift</Text>
      </Flex>
    );
  }

  return (
    <Box
      mx={6}
      borderRadius="lg"
      borderWidth="1px"
      borderColor="#E6EDF5"
      overflow="hidden"
    >
      <Box maxH="600px" overflowY="auto" position="relative">
        {/* GRID BACKGROUND */}
        <Box>
          {timeSlots.map((time) => (
            <Flex
              key={time}
              minH={`${SLOT_HEIGHT}px`}
              borderBottom="1px solid #E6EDF5"
            >
              {/* Time column */}
              <Box
                w={TIME_COL_WIDTH}
                px={2}
                py={2}
                borderRight="1px solid #E6EDF5"
              >
                <Text fontSize="xs" color="#7E919F">
                  {time}
                </Text>
              </Box>

              {/* Empty grid cells */}
              {columns.map((_, i) => (
                <Box
                  key={i}
                  flex="1"
                  borderRight={
                    i !== columns.length - 1 ? "1px solid #E6EDF5" : undefined
                  }
                />
              ))}
            </Flex>
          ))}
        </Box>

        {/* EVENT LAYER */}
        <Flex
          position="absolute"
          top={0}
          left={TIME_COL_WIDTH}
          right={0}
          bottom={0}
          pointerEvents="auto"
        >
          {columns.map((_, colIndex) => (
            <Box
              key={colIndex}
              flex="1"
              position="relative"
              borderRight={
                colIndex !== columns.length - 1
                  ? "1px solid transparent"
                  : undefined
              }
            >
              {renderBlocks
                .filter((b) => b.columnId === colIndex)
                .map((block) => {
                  console.log({
                    start: block.start,
                    end: block.end,
                    startMin: toMinutes(block.start),
                    endMin: toMinutes(block.end),
                    diff: toMinutes(block.end) - toMinutes(block.start),
                  });
                  const top = getTop(block.start);
                  const height = getHeight(block.start, block.end);
                  const visibleEvents = block.events.slice(
                    0,
                    MAX_VISIBLE_LANES,
                  );
                  const hiddenCount =
                    block.events.length - visibleEvents.length;

                  // +1 lane if we need a "See all"
                  const laneCount =
                    hiddenCount > 0
                      ? visibleEvents.length + 1
                      : visibleEvents.length;

                  const laneWidth = `calc(${100 / laneCount}% - ${
                    ((laneCount - 1) * LANE_GAP) / laneCount
                  }px)`;

                  return (
                    <Box
                      key={`${block.columnId}-${block.start}`}
                      position="absolute"
                      top={`${top}px`}
                      left="4px"
                      right="4px"
                      height={`${height}px`}
                      zIndex={1}
                      fontFamily={"body"}
                    >
                      <Flex gap={`${LANE_GAP}px`} h="100%">
                        {/* Event lanes */}
                        {visibleEvents.map((event) => {
                          const color = getEventColor(event);
                          const eventTop =
                            getTop(event.start) - getTop(block.start);

                          const eventHeight = getHeight(event.start, event.end);

                          return (
                            <Box
                              key={event.id}
                              w={laneWidth}
                              //   position="absolute"
                              top={`${eventTop}px`}
                              height={`${eventHeight}px`}
                              border="1px solid"
                              borderColor={color.border}
                              bg={color.bg}
                              borderRadius="md"
                              p={2}
                            >
                              <Text fontSize="xs" fontWeight={600}>
                                {event.title}
                              </Text>
                              <Text fontSize="xs">
                                {event.start} – {event.end}
                              </Text>
                              <Text fontSize="xs" color={color.text}>
                                {event.person}
                              </Text>
                            </Box>
                          );
                        })}

                        {/* See all lane */}
                        {hiddenCount > 0 && (
                          <Box
                            w={laneWidth}
                            h={"115px"}
                            border="1px dashed #CBD5E1"
                            borderRadius="md"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            alignSelf={"center"}
                            cursor="pointer"
                            fontFamily={"body"}
                            bg={"#F0F5FA"}
                            onClick={() => setActiveBlock(block)}
                          >
                            <Text
                              fontSize="xs"
                              fontWeight={600}
                              color="gray.600"
                            >
                              See all
                            </Text>
                          </Box>
                        )}
                      </Flex>
                    </Box>
                  );
                })}
            </Box>
          ))}
        </Flex>
      </Box>

      {activeBlock && (
        <SeeAllModal
          open={true}
          onClose={() => setActiveBlock(null)}
          dateLabel={date.toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
          })}
          events={activeBlock.events}
        />
      )}
    </Box>
  );
}
