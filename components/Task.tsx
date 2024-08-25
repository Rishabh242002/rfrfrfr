// Task.tsx
"use client";

import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";
import { useTranslations } from "next-intl";
import { useUser } from "@clerk/nextjs";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const t = useTranslations(); // Initialize the translation function
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.text);
  const { user } = useUser();
  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      text: taskToEdit,
      userId: user!.id!,
    });
    setOpenModalEdit(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  };

  return (
    <tr key={task.id} className="hover:bg-[#87c0cd] transition">
      <td className="w-full">{task.text}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-[#215c69]"
          size={25}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo} className="flex flex-col gap-4">
            <h3 className="font-bold text-lg text-[#113f67]">{t("editTitle")}</h3>
            <input
              value={taskToEdit}
              onChange={(e) => setTaskToEdit(e.target.value)}
              type="text"
              placeholder={t("placeholder")}
              className="input input-bordered w-full border-[#508c9b] focus:outline-none focus:ring-2 focus:ring-[#113f67] p-2 rounded"
            />
            <button type="submit" className="bg-[#508c9b] text-white hover:bg-[#113f67] py-2 px-4 rounded">
              {t("submitButton")}
            </button>
          </form>
        </Modal>
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor="pointer"
          className="text-red-500"
          size={25}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className="text-lg text-[#113f67]">
            {t("deleteConfirmation")}
          </h3>
          <div className="modal-action">
            <button onClick={() => handleDeleteTask(task.id)} className="bg-red-500 text-white hover:bg-red-600 py-2 px-4 rounded">
              {t("deleteButton")}
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
