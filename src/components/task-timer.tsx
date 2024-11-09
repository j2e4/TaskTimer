"use client";

import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
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

const schema = z.object({
  task: z.object(
    {
      id: z.string().nullable(),
      title: z.string().min(1, {
        message: "Please enter a task. It cannot be empty string.",
      }),
    },
    { message: "Please enter a task. It cannot be empty." },
  ),
});

const TaskForm = ({ onSubmit }: { onSubmit: (task: Task) => void }) => {
  const tasks: Task[] = [{ id: "1", title: "10-minutes workout" }];
  const [query, setQuery] = useState("");
  const visualTasks = tasks.filter(({ title }) => {
    return title.toLowerCase().includes(query.toLowerCase());
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      task: { id: null, title: "" },
    },
  });

  return (
    <Form {...form}>
      <form
        className="flex items-start gap-4"
        onSubmit={form.handleSubmit(({ task }) => onSubmit(task))}
      >
        <FormField
          control={form.control}
          name="task"
          render={({
            field: { onChange, onBlur, value, name, ref },
            formState: { errors },
          }) => (
            <FormItem className="w-full">
              <Combobox
                name={name}
                value={value}
                onChange={onChange}
                onClose={() => setQuery("")}
              >
                <FormControl>
                  <ComboboxInput
                    as={Fragment}
                    aria-label="task title"
                    displayValue={(task: Task) => task?.title}
                    onChange={(e) => setQuery(e.target.value)}
                  >
                    <Input
                      ref={ref}
                      placeholder="Reading a book"
                      onBlur={onBlur}
                    />
                  </ComboboxInput>
                </FormControl>
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
              <FormField
                control={form.control}
                name="task.title"
                render={() => (
                  // 에러인데 task.title 메시지가 없으면 task 메시지를 보여준다.
                  <FormMessage>
                    {errors.task && String(errors.task.message)}
                  </FormMessage>
                )}
              />
            </FormItem>
          )}
        />
        <Button type="submit">Start</Button>
      </form>
    </Form>
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
