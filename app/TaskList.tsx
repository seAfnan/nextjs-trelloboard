import {
  AlertDialog,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  Text,
} from "@radix-ui/themes";
import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { Task } from "./providers/TaskProvider";
import { FaTrash } from "react-icons/fa";

interface Props {
  tasks: Task[];
  handleEditTask: (id: number) => void;
  handleDeleteTask: (id: number) => void;
}

const TaskList = ({ tasks, handleEditTask, handleDeleteTask }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [deleteTaskName, setDeleteTaskName] = useState("");

  const handleOpenModal = (id: number, name: string) => {
    setDeleteTaskName(name);
    setSelectedTaskId(id);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    if (selectedTaskId !== null) {
      handleDeleteTask(selectedTaskId);
    }
    setOpen(false);
    setSelectedTaskId(null);
  };

  const renderTasksByStatus = (status: string) => (
    <Box width="33.3%" key={status}>
      {tasks
        .filter((task) => task.status === status)
        .map((task) => (
          <Card
            variant="surface"
            key={task.id}
            style={{ position: "relative", marginBottom: "0.5rem" }}
          >
            <Text size="5" weight="medium">
              {task.name}
              <Badge
                ml="0.5rem"
                color={
                  task.status === "OPEN"
                    ? "green"
                    : task.status === "IN_PROGRESS"
                    ? "orange"
                    : "red"
                }
              >
                {task.status === "OPEN"
                  ? "Open"
                  : task.status === "IN_PROGRESS"
                  ? "In Progress"
                  : "Closed"}
              </Badge>
              <Text size="1"> {task.createdAt.split("T")[0]}</Text>
            </Text>
            <Text as="div" color="gray" size="2" mt="3">
              {task.details}
            </Text>
            <Flex
              direction="column"
              style={{
                position: "absolute",
                top: "12px",
                right: "8px",
              }}
            >
              <Flex direction="row">
                <Button
                  size="1"
                  style={
                    {
                      // height: "25px",
                    }
                  }
                  onClick={() => handleEditTask(task.id)}
                  color="cyan"
                >
                  <AiFillEdit />
                </Button>
                <Button
                  size="1"
                  variant="solid"
                  style={
                    {
                      // height: "25px",
                    }
                  }
                  onClick={() => handleOpenModal(task.id, task.name)}
                  color="crimson"
                >
                  <FaTrash />
                </Button>
              </Flex>
            </Flex>
          </Card>
        ))}
    </Box>
  );

  return (
    <Box
      style={{
        borderRadius: "var(--radius-3)",
      }}
    >
      <Flex gap="2" style={{ textAlign: "center" }}>
        {["OPEN", "IN_PROGRESS", "CLOSED"].map((status) =>
          renderTasksByStatus(status)
        )}
      </Flex>

      <AlertDialog.Root open={open} onOpenChange={setOpen}>
        <AlertDialog.Trigger>
          <Box />
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Delete Task</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Do you really want to delete{" "}
            <Text color="orange">{deleteTaskName}</Text>?
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="red" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Box>
  );
};

export default TaskList;
