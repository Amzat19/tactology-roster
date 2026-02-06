"use client";

import { Dialog, Box, Text, VStack, HStack, Circle } from "@chakra-ui/react";
import { PlannerEvent } from "@/data/planner-events";
import { groupEventsByHour } from "@/utils/group-events";
import { getInitials } from "@/utils/getInitials";

interface Props {
  open: boolean;
  onClose: () => void;
  dateLabel: string;
  events: PlannerEvent[];
}

export function getEventColor(event: PlannerEvent) {
  if (event.title === "Surgery") {
    return {
      border: "#F97316",
      bg: "#FFF7ED",
      text: "#F97316",
    };
  }

  if (event.person === "Diane Lane") {
    return {
      border: "#22C55E",
      bg: "#F0FDF4",
      text: "#22C55E",
    };
  }

  return {
    border: "#EAB308",
    bg: "#FEFCE8",
    text: "#A16207",
  };
}

export default function SeeAllModal({
  open,
  onClose,
  dateLabel,
  events,
}: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      {/* NO blur, NO dark overlay */}
      <Dialog.Backdrop bg="transparent" />

      <Dialog.Positioner
        zIndex={9999}
        justifyContent={"center"}
        alignItems="center"
      >
        <Dialog.Content
          w="360px"
          maxH="520px"
          borderRadius="xl"
          border="1px solid #E6EDF5"
          boxShadow="sm"
          fontFamily={"body"}
        >
          {/* Header */}
          <Box px={4} py={3} borderBottom="1px solid #E6EDF5">
            <HStack justify="space-between">
              <Text fontSize="lg" fontWeight={600}>
                {dateLabel}
              </Text>
              <Dialog.CloseTrigger bg={"black"} color={"black"} />
            </HStack>
          </Box>

          {/* Body */}
          <Dialog.Body p={0}>
            <Box px={4} py={3} maxH="440px" overflowY="auto">
              <VStack align="stretch" gap={4}>
                {/* Group by hour */}
                {groupEventsByHour(events).map(({ hour, items }) => (
                  <Box key={hour}>
                    <Text fontSize="md" fontWeight={600} mb={4}>
                      {hour}
                    </Text>

                    <VStack align="stretch" gap={3}>
                      {items.map((event) => {
                        const color = getEventColor(event);

                        return (
                          <HStack
                            key={event.id}
                            align="start"
                            p={3}
                            borderRadius="lg"
                            border="1px solid"
                            borderColor={color.border}
                            bg={color.bg}
                            gap={3}
                          >
                            {/* Avatar */}
                            <Circle
                              size="32px"
                              bg="white"
                              border="1px solid #E6EDF5"
                            >
                              <Text
                                fontSize="xs"
                                fontWeight={600}
                                color="#7E919F"
                              >
                                {getInitials(event.person)}
                              </Text>
                            </Circle>

                            {/* Content */}
                            <Box>
                              <HStack gap={2}>
                                <Text fontSize="sm" fontWeight={600}>
                                  {event.title}
                                </Text>
                                <Text fontSize="sm" color="#7E919F">
                                  {event.start} – {event.end}
                                </Text>
                              </HStack>

                              <Text fontSize="sm" color={color.text}>
                                {event.person}
                              </Text>
                            </Box>
                          </HStack>
                        );
                      })}
                    </VStack>
                  </Box>
                ))}
              </VStack>
            </Box>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
