import React, { useState, useEffect, ChangeEvent } from "react";
import { Dialog } from "@headlessui/react";
import {
  doc,
  collection,
  updateDoc,
  arrayUnion,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";

interface TasksProps {
  isOpen: boolean;
  setIsTasksOpen: (open: boolean) => void;
  docId: string | null;
}

const Tasks: React.FC<TasksProps> = ({ isOpen, setIsTasksOpen, docId }) => {
  const [newTask, setNewTask] = useState("");
  const [Tasks, setTasks] = useState<any[]>([]);
  const [newTaskPriority, setNewTaskPriority] = useState("");

  useEffect(() => {
    if (docId && docId) {
      const docIdRef = doc(collection(db, "teachers"), docId);
      const unsubscribe = onSnapshot(docIdRef, (docSnapshot) => {
        const data = docSnapshot.data();
        if (data && data.Tasks) {
          setTasks(data.Tasks);
        }
      });

      return () => unsubscribe();
    }
  }, [docId]);

  const submitTask = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newTask && docId && docId) {
      const newTaskObj = {
        task: newTask,
        priority: newTaskPriority,
        status: "Incomplete",
        timestamp: new Date().toISOString(),
      };

      const docIdRef = doc(collection(db, "teachers"), docId);
      await updateDoc(docIdRef, {
        Tasks: arrayUnion(newTaskObj),
      });

      setNewTask("");
    }
  };

  function handlePriorityChange(event: ChangeEvent<HTMLSelectElement>): void {
    setNewTaskPriority(event.target.value);
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsTasksOpen(false)}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="bg-white rounded-md p-8 mx-auto border border-gray-100 overflow-y-auto relative z-20 w-full max-w-4xl">
          <Dialog.Title className="text-2xl my-2 font-bold">Tasks</Dialog.Title>
          <hr />
          <div className="px-4 py-2 grid grid-cols-4 font-bold">
            <div className="text-sm leading-6">Timestamp</div>
            <div className="text-sm leading-6">Task</div>
            <div className="text-sm leading-6">Priority</div>
            <div className="text-sm leading-6">Status</div>
          </div>
          <hr />
          <div className="mt-2 divide-y divide-gray-100 max-h-60 overflow-y-scroll">
            {Tasks.slice()
              .reverse()
              .map((Task, index) => (
                <div key={index} className="px-4 py-2 grid grid-cols-4 gap-4">
                  <div className="text-sm font-medium leading-6">
                    {new Date(Task.timestamp).toLocaleString()}
                  </div>
                  <div className="text-sm leading-4">{Task.task}</div>
                  <div className="text-sm leading-4">{Task.priority}</div>
                  <div
                    className={`text-sm font-semibold leading-4 ${
                      Task.status === "Incomplete"
                        ? "text-red-500"
                        : "text-green-900"
                    }`}
                  >
                    {Task.status}
                  </div>
                </div>
              ))}
          </div>
          <div className="columns-2 mt-4">
            <form onSubmit={submitTask}>
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="w-full p-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                placeholder="Enter task"
              />
            </form>
            <select
              name="priority"
              id="priority"
              value={newTaskPriority}
              onChange={handlePriorityChange}
              className="border border-black rounded p-2 focus:outline-blue-500 flex w-full "
            >
              <option value="" disabled>
                Select
              </option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>
          <div className="mt-6 flex flex-auto gap-4 flex-row-reverse font-semibold">
            <button
              className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              onClick={() => setIsTasksOpen(false)}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              onClick={submitTask}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Tasks;
