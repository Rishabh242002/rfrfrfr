// Home.tsx
import { getAllTodos } from "@/api";
import AddTask from "@/components/AddTask";
import ProtectedPageeco from "@/components/Protectedpageeco";
import TodoList from "@/components/TodoList";
import Todolisttitle from "@/components/todolist.title";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();

  const tasks = await getAllTodos(user!.id!);

  return (
    <ProtectedPageeco>
    <main className="max-w-4xl mx-auto mt-4 p-5 bg-[#508c9b] rounded-lg shadow-md">
      <div className="text-center my-5 flex flex-col gap-4">
        <Todolisttitle />

        <AddTask />
      </div>
      <TodoList tasks={tasks} />
    </main>
    </ProtectedPageeco>
  );
}
