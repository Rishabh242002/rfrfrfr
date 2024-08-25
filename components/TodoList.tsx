// TodoList.tsx
import { ITask } from "@/types/tasks";
import React from "react";
import Task from "./Task";
import { useTranslations } from "next-intl"; // Import translations

interface TodoListProps {
  tasks: ITask[];
}

const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
  const t = useTranslations(); // Use the translations hook

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th className="text-[#113f67]">{t("tasks")}</th>
            <th className="text-[#113f67]">{t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
