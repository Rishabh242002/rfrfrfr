"use server";

import { ITask } from "./types/tasks";
import Todos from "./lib/post";
import dbConnect from "./lib/mongodb";

// Get all todos for a specific user
export const getAllTodos = async (userId: string) => {
  await dbConnect();
  const todosOfId = await Todos.find({ userId });

  // Convert each todo to a plain object
  console.log("get", todosOfId) ; 

  return todosOfId.map((todo) => ({
    id: todo.id, // Convert ObjectId to string
    text: todo.text,
    userId: todo.userId,
  }));
};

// Add a new todo
export const addTodo = async (todo: ITask) => {
  await dbConnect();

  const result = new Todos(todo);
  const savedTodo = await result.save();
  console.log("Add", savedTodo) ; 

  // Convert the saved todo to a plain object
  return {
    id: savedTodo.id,
    text: savedTodo.text,
    userId: savedTodo.userId,
  };
};

// Edit an existing todo
export const editTodo = async (todo: ITask) => {
  await dbConnect();
  const { id, ...rest } = todo;

  // Update the todo
  const updatedTodo = await Todos.findOneAndUpdate({ _id: id }, rest, {
    new: true,
  });

  // Convert the updated todo to a plain object
  return {
    id: updatedTodo?.id,
    text: updatedTodo?.text,
    userId: updatedTodo?.userId,
  };
};

// Delete a todo by ID
export const deleteTodo = async (id: string) => {
  await dbConnect();
  await Todos.deleteOne({ _id: id });
  return { success: true };
};
