import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface DeclineRequestDialogProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    requestId: string;
}

const DeclineRequestDialog: React.FC<DeclineRequestDialogProps> = ({ isOpen, setIsOpen, requestId }) => {
    const [remark, setRemark] = useState('');

    const submitRemark = async () => {
        if (remark !== '') {
            const requestRef = doc(db, 'requests', requestId);
            await updateDoc(requestRef, {
                status: 'Completed',
                action: 'Declined',
                remark,
            });

            setIsOpen(false);
        }
    };

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
                <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
                <div className="bg-white rounded-md p-8 mx-auto border border-gray-100 overflow-y-auto relative z-20 w-full max-w-md">
                    <Dialog.Title className="text-2xl font-bold">Decline Reason</Dialog.Title>
                    <input
                        type="text"
                        value={remark}
                        onChange={(e) => setRemark(e.target.value)}
                        className="w-full p-2 mt-4 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                        placeholder="Enter remark"
                    />
                    <div className="mt-6 flex flex-auto gap-4 flex-row-reverse font-semibold">
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-indigo-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                            onClick={submitRemark}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default DeclineRequestDialog;