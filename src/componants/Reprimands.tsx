import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { DataType } from "../pages/home";
import { doc, collection, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { db } from "../firebase";

interface ReprimandsProps {
  isOpen: boolean;
  setIsReprimandsOpen: (open: boolean) => void;
  selectedData: DataType | null;
}

const Reprimands: React.FC<ReprimandsProps> = ({ isOpen, setIsReprimandsOpen, selectedData }) => {
  const [newReprimand, setNewReprimand] = useState("");
  const [reprimands, setReprimands] = useState<any[]>([]);

  useEffect(() => {
    if (selectedData && selectedData.docId) {
      const selectedDataRef = doc(collection(db, "teachers"), selectedData.docId);
      const unsubscribe = onSnapshot(selectedDataRef, (docSnapshot) => {
        const data = docSnapshot.data();
        if (data && data.Reprimands) {
          setReprimands(data.Reprimands);
        }
      });

      return () => unsubscribe();
    }
  }, [selectedData]);

  const submitReprimand = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newReprimand && selectedData && selectedData.docId) {
      const newReprimandObj = {
        remark: newReprimand,
        timestamp: new Date().toISOString(),
      };

      const selectedDataRef = doc(collection(db, "teachers"), selectedData.docId);
      await updateDoc(selectedDataRef, {
        Reprimands: arrayUnion(newReprimandObj),
      });

      setNewReprimand("");
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsReprimandsOpen(false)}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="bg-white rounded-md p-8 mx-auto border border-gray-100 overflow-y-auto relative z-20 w-full max-w-4xl">
          <Dialog.Title className="text-2xl font-bold">Reprimands</Dialog.Title>
          <dl className="mt-2 divide-y divide-gray-100 max-h-60 overflow-y-scroll">
            {reprimands.slice().reverse().map((reprimand, index) => (
              <div key={index} className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {new Date(reprimand.timestamp).toLocaleString()}
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{reprimand.remark}</dd>
              </div>
            ))}
          </dl>
          <form onSubmit={submitReprimand}>
            <input
              type="text"
              value={newReprimand}
              onChange={(e) => setNewReprimand(e.target.value)}
              className="w-full px-4 py-2 mt-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              placeholder="Enter reprimand remark"
            />
          </form>
          <div className="mt-6 flex flex-auto gap-4 flex-row-reverse font-semibold">
            <button
              className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              onClick={() => setIsReprimandsOpen(false)}
            >
              Close
            </button>
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              onClick={submitReprimand}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Reprimands