import React, { useState } from "react";
import { Dialog } from "@headlessui/react";

interface ReprimandsProps {
  isOpen: boolean;
  setIsReprimandsOpen: (open: boolean) => void;
}

const Reprimands: React.FC<ReprimandsProps> = ({ isOpen, setIsReprimandsOpen }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsReprimandsOpen(false)}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="bg-white rounded-md p-8 mx-auto border border-gray-100 overflow-y-auto relative z-20 w-full max-w-4xl">
          <Dialog.Title className="text-2xl font-bold">
            service book
          </Dialog.Title>
          <div className='mt-6 flex flex-auto gap-4 flex-row-reverse font-semibold'>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              onClick={() => setIsReprimandsOpen(false)}
            >
              Close
            </button>
           
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default Reprimands;