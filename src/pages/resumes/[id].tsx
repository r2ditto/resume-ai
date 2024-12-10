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
import PersonalDetailsForm from "@/components/forms/personal-details-form";

enum ResumeSections {
  PersonalInformation = "Personal Information",
  ContactInformation = "Contact Information",
  ProfessionalSummary = "Professional Summary",
  Links = "Links",
  EmploymentHistory = "Employment History",
  Education = "Education",
  Certifications = "Certifications",
  Skills = "Skills",
}

// Switching sections should only rerender sidebar and resume, not preview
export default function ResumePage() {
  const [items, setItems] = useState<ResumeSections[]>([
    ResumeSections.PersonalInformation,
    ResumeSections.ContactInformation,
    ResumeSections.ProfessionalSummary,
    ResumeSections.Links,
    ResumeSections.EmploymentHistory,
    ResumeSections.Education,
    ResumeSections.Certifications,
    ResumeSections.Skills,
  ]);
  const [activeSection, setActiveSection] = useState<ResumeSections>(
    ResumeSections.PersonalInformation
  );

  const renderForm = () => {
    switch (activeSection) {
      case ResumeSections.PersonalInformation:
        return <PersonalDetailsForm />;
      default:
        return null;
    }
  };

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

  const handleSectionClick = (section: ResumeSections) =>
    setActiveSection(section);

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
                            px="2"
                            py="3"
                            my="1"
                            fontSize={16}
                            fontWeight={500}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            onClick={() => handleSectionClick(item)} // Added onClick event
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
            <Text>{activeSection}</Text>
            {renderForm()}
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