"use client";

import { AiOutlinePlus } from "react-icons/ai";
import Modal from "./Modal";
import { FormEventHandler, useState } from "react";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { useTranslations } from "next-intl"; // Import translations
import { useUser } from "@clerk/nextjs";

const AddTask = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const t = useTranslations(); // Use the translations hook
  const { user } = useUser();
  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await addTodo({
      id: uuidv4(),
      text: newTaskValue,
      userId: user!.id!,
    });
    setNewTaskValue("");
    setModalOpen(false);
    router.refresh();
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="w-full bg-[#87c0cd] text-white hover:bg-[#113f67] py-2 px-4 rounded flex items-center justify-center"
      >
        <span className="mr-2">{t("addNewTask")}</span>
        <AiOutlinePlus className="mr-2" size={18} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewTodo} className="flex flex-col gap-4">
          <h3 className="font-bold text-lg text-[#113f67]">
            {t("addNewTask")}
          </h3>
          <input
            value={newTaskValue}
            onChange={(e) => setNewTaskValue(e.target.value)}
            type="text"
            placeholder={t("placeholder")}
            className="input input-bordered w-full border-[#508c9b] focus:outline-none focus:ring-2 focus:ring-[#113f67] p-2 rounded"
          />
          <button
            type="submit"
            className="bg-[#87c0cd] text-white hover:bg-[#113f67] py-2 px-4 rounded"
          >
            {t("submit")}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
