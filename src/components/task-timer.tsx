"use client";

import { type FormEvent, Fragment, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@/components/ui/combo-box";
import { Input } from "@/components/ui/input";
import {
  selectStartTimestamp,
  startTimer,
} from "@/lib/features/timer/timer-slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useInterval } from "@/hooks/useInterval";
import { format } from "@/lib/format";

type Task = {
  id: string | null;
  title: string;
};

const TaskForm = ({ onSubmit }: { onSubmit: (task: Task) => void }) => {
  const tasks: Task[] = [{ id: "1", title: "10-minutes workout" }];
  const [query, setQuery] = useState("");
  const visualTasks = tasks.filter(({ title }) => {
    return title.toLowerCase().includes(query.toLowerCase());
  });

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedTask !== null) onSubmit(selectedTask);
  };

  return (
    <form className="flex items-start gap-4" onSubmit={handleSubmit}>
      <Combobox
        value={selectedTask}
        onChange={setSelectedTask}
        onClose={() => setQuery("")}
      >
        <ComboboxInput
          as={Fragment}
          aria-label="task title"
          displayValue={(task: Task) => task?.title}
          onChange={(event) => setQuery(event.target.value)}
        >
          <Input placeholder="Reading a book" />
        </ComboboxInput>
        <ComboboxOptions>
          {query.length > 0 && (
            <ComboboxOption
              value={{ id: null, title: query }}
              className="data-[focus]:bg-blue-100"
            >
              Create <span className="font-bold">{`"${query}"`}</span>
            </ComboboxOption>
          )}
          {visualTasks?.map((item) => (
            <ComboboxOption key={item.id} value={item}>
              {item.title}
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
      <Button type="submit">Start</Button>
    </form>
  );
};

export const TaskTimer = () => {
  const startTimestamp = useAppSelector(selectStartTimestamp);
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(0);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const elapsedTime = currentTimestamp - startTimestamp;
  const visualElapsedTime = format("%2d : %2d", [
    Math.floor(elapsedTime / 1000 / 60),
    Math.floor(elapsedTime / 1000) % 60,
  ]);

  const dispatch = useAppDispatch();
  const { startInterval } = useInterval();

  const onSubmit = (task: Task) => {
    dispatch(startTimer());
    setCurrentTask(task);
    startInterval(() => {
      setCurrentTimestamp(Date.now());
    }, 1000);
  };

  return (
    <div className="mx-auto w-full space-y-8 md:w-2/3 lg:w-1/2">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-6xl font-bold">
            {visualElapsedTime}
          </CardTitle>
          <CardDescription>
            {currentTask === null && "Time to start your task!"}
            {currentTask !== null && (
              <>
                {`Stay focused! You're doing awesome at `}
                <b>{`"${currentTask.title}"`}</b>!
              </>
            )}
          </CardDescription>
        </CardHeader>
      </Card>
      <TaskForm onSubmit={onSubmit} />
    </div>
  );
};
