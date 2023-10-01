import React, { useState, useEffect } from "react";
import { Tab } from "@headlessui/react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import DeclineRequestDialog from "../componants/DeclineRequestDialog";
import withAuth from "./hoc/withAuth";

interface RequestData {
  id: string;
  request: string;
  status: string;
  [key: string]: any;
}

const Requests: React.FC = () => {
  const [activeRequests, setActiveRequests] = useState<RequestData[]>([]);
  const [completedRequests, setCompletedRequests] = useState<RequestData[]>([]);

  const [declineRequestDialogOpen, setDeclineRequestDialogOpen] =
    useState(false);
  const [currentRequestId, setCurrentRequestId] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "requests"), (snapshot) => {
      const active: RequestData[] = [];
      const completed: RequestData[] = [];

      snapshot.docs.forEach((doc) => {
        const requestData = {
          id: doc.id,
          ...doc.data(),
        } as RequestData;

        if (requestData.status === "Active") {
          active.push(requestData);
        } else if (requestData.status === "Completed") {
          completed.push(requestData);
        }
      });

      setActiveRequests(active);
      setCompletedRequests(completed);
    });

    return () => unsubscribe();
  }, []);

  const handleAccept = async (requestId: string) => {
    const requestRef = doc(db, "requests", requestId);
    await updateDoc(requestRef, {
      status: "Completed",
      action: "Accepted",
    });
  };

  const handleDecline = (requestId: string) => {
    setCurrentRequestId(requestId);
    setDeclineRequestDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl text-indigo-800 font-bold mb-14">Requests</h1>
      <div className="mt-14 flex flex-col justify-center">
        <Tab.Group>
          <Tab.List className="flex m-auto p-1 w-1/4 space-x-1 bg-blue-900/20 rounded-xl">
            <Tab
              className={({ selected }) =>
                `w-full py-2.5 text-sm leading-5 font-bold text-blue-700 rounded-lg
            ${
              selected
                ? "bg-white shadow outline-none"
                : "text-blue-100 hover:bg-white/[0.12] hover:text-blue-800"
            }`
              }
            >
              Active ({activeRequests.length})
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full py-2.5 text-sm leading-5 font-bold text-blue-700 rounded-lg
            ${
              selected
                ? "bg-white shadow outline-none"
                : "text-blue-100 hover:bg-white/[0.12] hover:text-blue-800"
            }`
              }
            >
              Completed ({completedRequests.length})
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-10">
            <Tab.Panel>
              <table className="min-w-full divide-y mt-10 shadow-md divide-indigo-200">
                <thead className="bg-indigo-200 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-black text-indigo-800 uppercase tracking-wider">
                      Request type
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-black text-indigo-800 uppercase tracking-wider">
                      Request
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-black text-indigo-800 uppercase tracking-wider">
                      By
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-black text-indigo-800 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {activeRequests.map((request, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? "bg-indigo-50" : "bg-indigo-100"
                      }
                    >
                      <td className="px-6 py-2 font-medium">
                        {request.reqType}
                      </td>
                      <td className="px-6 py-2 font-medium">
                        {request.request}
                      </td>
                      <td className="px-6 py-2 font-medium">{request.by}</td>
                      <td className="px-6 py-2 font-medium text-center">
                        <button
                          onClick={() => handleAccept(request.id)}
                          className="bg-indigo-500 text-white px-4 py-2 mx-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleDecline(request.id)}
                          className="bg-red-500 text-white px-4 py-2 mx-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                        >
                          Decline
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Tab.Panel>
            <Tab.Panel>
              <table className="min-w-full divide-y mt-10 shadow-md divide-indigo-200">
                <thead className="bg-indigo-200 sticky top-0">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-black text-indigo-800 uppercase tracking-wider">
                      Request type
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-black text-indigo-800 uppercase tracking-wider">
                      Request
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-black text-indigo-800 uppercase tracking-wider">
                      By
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-black text-indigo-800 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {completedRequests.map((request, index) => (
                    <tr key={index}>
                      <td className="px-6 py-2 font-medium">
                        {request.reqType}
                      </td>
                      <td className="px-6 py-2 font-medium">
                        {request.request}
                      </td>
                      <td className="px-6 py-2 font-medium">{request.by}</td>
                      <td className="px-6 py-2 font-medium">
                        {request.action}
                        {request.action === "Declined"
                          ? ` - ${request.remark}`
                          : ""}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
      <DeclineRequestDialog
        isOpen={declineRequestDialogOpen}
        setIsOpen={setDeclineRequestDialogOpen}
        requestId={currentRequestId}
      />
    </div>
  );
};

export default withAuth(Requests);
