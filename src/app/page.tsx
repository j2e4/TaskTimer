import { TaskTimer } from "@/components/task-timer";

export default function Home() {
  return (
    <main className="grid min-h-dvh grid-cols-[10px_1fr_10px] grid-rows-[1fr_2fr_1fr] font-[family-name:var(--font-geist-sans)]">
      <TaskTimer />
    </main>
  );
}
