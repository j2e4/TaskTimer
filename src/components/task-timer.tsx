"use client";

import { Fragment, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@/components/ui/combo-box";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Task = {
  id: string | null;
  name: string;
};
const TaskHistory: Task[] = [{ id: "1", name: "10-minutes workout" }];

export const TaskTimer = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [query, setQuery] = useState("");

  const title = "00:00";
  const description = "Time to start your task!";
  const visualTasks = TaskHistory.filter(({ name }) => {
    return name.toLowerCase().includes(query.toLowerCase());
  });

  return (
    <Card className="mx-auto w-full md:w-2/3 lg:w-1/2">
      <CardHeader className="text-center">
        <CardTitle className="text-6xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Combobox value={selectedTask} onChange={setSelectedTask}>
          <ComboboxInput
            as={Fragment}
            aria-label="task title"
            displayValue={(task: Task) => task?.name}
            onChange={(event) => setQuery(event.target.value)}
          >
            <Input placeholder="Reading a book" />
          </ComboboxInput>
          <ComboboxOptions>
            {visualTasks.map((item) => (
              <ComboboxOption key={item.id} value={item}>
                {item.name}
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Combobox>
      </CardContent>
      <CardFooter className="justify-end">
        <Button>Start</Button>
      </CardFooter>
    </Card>
  );
};
