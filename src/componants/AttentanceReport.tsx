import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { doc, collection, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { db } from "../firebase";

interface AttendanceProps {
  isOpen: boolean;
  setIsAttendanceOpen: (open: boolean) => void;
  docId: string | null;
}

const Attendance: React.FC<AttendanceProps> = ({ isOpen, setIsAttendanceOpen, docId }) => {
  const [Attendance, setAttendance] = useState<any[]>([]);

  useEffect(() => {
    if (docId && docId) {
      const docIdRef = doc(collection(db, "teachers"), docId);
      const unsubscribe = onSnapshot(docIdRef, (docSnapshot) => {
        const data = docSnapshot.data();
        if (data && data.attendance) {
          setAttendance(data.attendance);
        }
      });

      return () => unsubscribe();
    }
  }, [docId]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsAttendanceOpen(false)}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="bg-white rounded-md p-8 mx-auto border border-gray-100 overflow-y-auto relative z-20 w-full max-w-4xl">
          <Dialog.Title className="text-2xl font-bold">Attendance</Dialog.Title>
          <hr />
          <div className="px-4 py-2 grid grid-cols-4 font-bold">
            <div className="text-sm leading-6">Date</div>
            <div className="text-sm leading-6">Time</div>
            <div className="text-sm leading-6">Attendance</div>
          </div>
          <hr />
          <dl className="mt-2 divide-y divide-gray-100 max-h-60 overflow-y-scroll">
            {Attendance.slice().reverse().map((attendanceData, index) => {
              const date = Object.keys(attendanceData)[0];
              const time = attendanceData[date].time;
              return (
                <div key={index} className="px-4 py-2 grid grid-cols-4 gap-4">
                  <dt className="text-sm font-medium leading-6 text-gray-900">{date}</dt>
                  <dd className="text-sm leading-4">
                    {time}
                  </dd>
                  <dd className="text-sm leading-4">
                    Present
                  </dd>
                </div>
              );
            })}
          </dl>

          <button
            className="bg-red-500 text-white px-4 py-2 mt-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            onClick={() => setIsAttendanceOpen(false)}
          >
            Close
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default Attendance;
