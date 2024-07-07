"use client";
import Spinner from "@/app/components/Spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Flex,
  Select,
  Table,
  Text,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import axios, { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { AiFillEdit } from "react-icons/ai";
import { z } from "zod";
import AxiosErrorMessage from "./components/AxiosErrorMessage";
import ErrorMessage from "./components/ErrorMessage";
import { taskSchema } from "./ValidationSchemas";
import { Task, TaskContext } from "./providers/TaskProvider";
import TaskList from "./TaskList";

type TaskFormData = z.infer<typeof taskSchema>;

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const [axiosError, setAxiosError] = useState<AxiosError | null>(null);
  const [selectValue, setSelectValue] = useState("OPEN");
  const [editTask, setEditTask] = useState<Task | null>(null);
  const { tasks, fetchTasks } = useContext(TaskContext);
  const [loading, setLoading] = useState(false);
  const {
    register,
    setValue,
    control,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const handleSubmitTask = async (data: TaskFormData) => {
    try {
      setSubmitting(true);
      let message = "Task";
      if (editTask) {
        await axios.patch("/api/task/" + editTask.id, data);
        message = message + " updated successfully.";
        setShowForm(false);
      } else {
        await axios.post("/api/task", data);
        message = message + " created successfully.";
      }
      toast.success(message);
      fetchTasks();
      setSubmitting(false);
      setEditTask(null);
      resetForm({
        name: "",
        details: "",
        status: "OPEN",
      });
      setSelectValue("OPEN");
    } catch (error) {
      setSubmitting(false);
      setAxiosError(error as AxiosError);
    }
  };

  const handleEditTask = async (id: number) => {
    try {
      setLoading(true);
      setShowForm(true);
      const response = await axios.get("/api/task/" + id);
      setEditTask(response.data);
      setLoading(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (error) {
      setAxiosError(error as AxiosError);
      setLoading(false);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      setShowForm(false);
      setLoading(true);
      await axios.delete("/api/task/" + id);
      toast.success("Task deleted successfully.");
      setLoading(false);
      fetchTasks();
    } catch (error) {
      setAxiosError(error as AxiosError);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editTask) {
      resetForm({
        name: editTask.name,
        details: editTask.details,
        status: editTask.status,
      });
      setSelectValue(editTask.status);
    }
  }, [editTask]);

  const showHideForm = () => {
    if (!showForm) {
      setEditTask(null);
      setSelectValue("OPEN");
      resetForm({
        name: "",
        details: "",
        status: "OPEN",
      });
      setShowForm(true);
    } else {
      setShowForm(false);
    }
  };

  return (
    <div>
      {/* Axios Error & Toaster Message & Add Task Button */}
      <Box>
        {axiosError && <AxiosErrorMessage error={axiosError} />}
        <Toaster />
        <Button
          title="Add Task"
          style={{ float: "right" }}
          onClick={() => {
            showHideForm();
          }}
        >
          {showForm ? "-" : "+"}
        </Button>
      </Box>

      {/* Loading while fetching for Edit */}
      {loading && (
        <Box style={{ textAlign: "center" }}>
          <Spinner />
        </Box>
      )}

      {/* Add Task Form */}
      {showForm && (
        <form onSubmit={handleSubmit(handleSubmitTask)}>
          <Box
            pt="2"
            pb="3"
            mb="2"
            style={{
              background: "var(--gray-a2)",
              borderRadius: "var(--radius-3)",
            }}
          >
            <Container size="2">
              <Flex direction="column">
                <Flex mt="1">
                  <Text style={{ width: "20%" }} mt="1">
                    Status
                  </Text>
                  <Select.Root
                    value={selectValue}
                    onValueChange={(value: string) => {
                      setSelectValue(value);
                      setValue("status", value);
                    }}
                  >
                    <Select.Trigger
                      style={{ width: "70%" }}
                      placeholder="Select"
                    />
                    <Select.Content>
                      <Select.Group>
                        <Select.Item value="OPEN">OPEN</Select.Item>
                        <Select.Item value="IN_PROGRESS">
                          IN_PROGRESS
                        </Select.Item>
                        <Select.Item value="CLOSED">CLOSED</Select.Item>
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                </Flex>
                <ErrorMessage>{errors.status?.message}</ErrorMessage>
                <Flex mt="2">
                  <Text style={{ width: "20%" }} mt="1">
                    Name
                  </Text>
                  <TextField.Root
                    style={{ width: "70%" }}
                    radius="none"
                    placeholder="Name"
                    {...register("name")}
                    disabled={editTask ? true : false}
                  />
                </Flex>
                <ErrorMessage>{errors.name?.message}</ErrorMessage>
                <Flex mt="2">
                  <Text style={{ width: "20%" }} mt="2">
                    Details
                  </Text>
                  <TextArea
                    resize="vertical"
                    style={{ width: "70%" }}
                    radius="none"
                    placeholder="Details..."
                    {...register("details")}
                  />
                </Flex>
                <ErrorMessage>{errors.details?.message}</ErrorMessage>
                <Box
                  mt="4"
                  style={{
                    textAlign: "center",
                  }}
                >
                  <Button disabled={isSubmitting}>
                    {editTask ? "Update" : "Create"}
                    {isSubmitting && <Spinner />}
                  </Button>
                </Box>
              </Flex>
            </Container>
          </Box>
        </form>
      )}

      {/* Task List Loading While Fetching */}
      {tasks.length == 0 && !axiosError && (
        <Box
          style={{
            background: "var(--gray-a2)",
            borderRadius: "var(--radius-3)",
          }}
        >
          <Container style={{ textAlign: "center" }} size="3">
            <Spinner />
          </Container>
        </Box>
      )}

      {/* Task List Table */}
      {tasks.length > 0 && (
        <TaskList
          tasks={tasks}
          handleEditTask={handleEditTask}
          handleDeleteTask={handleDeleteTask}
        />
      )}
    </div>
  );
}
