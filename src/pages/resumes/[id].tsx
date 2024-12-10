import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, Flex, Grid, GridItem, List, Text } from "@chakra-ui/react";
import React, { ReactElement, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";

import {
  TbBriefcase,
  TbCertificate,
  TbLink,
  TbPhone,
  TbSchool,
  TbStar,
  TbUserCircle,
} from "react-icons/tb";

export default function ResumePage() {
  const [items, setItems] = useState([
    "Personal Information",
    "Contact Information",
    "Professional Summary",
    "Links",
    "Employment History",
    "Education",
    "Certifications",
    "Skills",
  ]);

  const itemIcons = {
    "Personal Information": <TbUserCircle size={24} />,
    "Contact Information": <TbPhone size={24} />,
    "Professional Summary": <TbBriefcase size={24} />,
    Links: <TbLink size={24} />,
    "Employment History": <TbBriefcase size={24} />,
    Education: <TbSchool size={24} />,
    Certifications: <TbCertificate size={24} />,
    Skills: <TbStar size={24} />,
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setItems(reorderedItems);
  };

  return (
    <Grid templateColumns="1fr 3fr 2fr" gap="5">
      {/* Sidebar */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {/* Sidebar */}
        <GridItem>
          <Card.Root variant="elevated">
            <Card.Body>
              <Droppable droppableId="items">
                {(provided) => (
                  <List.Root
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    variant="plain"
                  >
                    {items.map((item, index) => (
                      <Draggable key={item} draggableId={item} index={index}>
                        {(provided) => (
                          <List.Item
                            display="block"
                            _hover={{
                              backgroundColor: "gray.100",
                            }}
                            borderRadius="lg"
                            p="2"
                            my="2"
                            fontSize={16}
                            fontWeight={500}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Flex gap="2" alignItems="center">
                              {itemIcons[item as keyof typeof itemIcons]}
                              {item}
                            </Flex>
                          </List.Item>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </List.Root>
                )}
              </Droppable>
            </Card.Body>
          </Card.Root>
        </GridItem>
      </DragDropContext>

      {/* Resume */}
      <GridItem>
        <Card.Root variant="elevated">
          <Card.Body>
            <Text>Resume</Text>
          </Card.Body>
        </Card.Root>
      </GridItem>

      {/* Preview */}
      <GridItem>
        <Card.Root variant="elevated">
          <Card.Body>
            <Text>Preview</Text>
          </Card.Body>
        </Card.Root>
      </GridItem>
    </Grid>
  );
}

ResumePage.getLayout = (page: ReactElement) => (
  <DashboardLayout isFullWidth>{page}</DashboardLayout>
);
