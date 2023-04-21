import { Dialog } from '@headlessui/react';
import { DataType } from '../pages/home';
import _ from 'lodash';

const detailsList = [
  { title: "Overall behaviour", value: 'Prev_postings.behaviour' },
  { title: "Current school name", value: 'Prev_postings.institute_name_1' },
  { title: "Current post", value: 'Prev_postings.post_1' },
  { title: "Subject", value: 'Prev_postings.subject_1' },
  { title: "Contact number", value: 'Contact_details.cno' },
  { title: "Email id", value: 'Contact_details.email' },
  { title: "Emergency contact number", value: 'Contact_details.emergency_cno' },
  { title: "Address", value: 'Contact_details.address' },
  { title: "Blood group", value: 'Personal_details.blood_group' },
  { title: "Gender", value: 'Personal_details.gender' },
  { title: "Religion", value: 'Personal_details.religion' },
  { title: "Caste", value: 'Personal_details.caste' },
  { title: "Is disabled", value: 'Personal_details.disability' },
  { title: "Date of birth", value: 'Personal_details.dob' },
  { title: "Personal identification mark", value: 'Personal_details.id_mark' },
  { title: "Marital status", value: 'Personal_details.marital_status' },
  { title: "Current salary", value: 'Prev_postings.ending_salary_1' },
];

interface TeacherDetailsDialogProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  selectedData: DataType | null;
}

const TeacherDetailsDialog: React.FC<TeacherDetailsDialogProps> = ({ isModalOpen, setIsModalOpen, selectedData }) => {
  return (
    <Dialog
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="bg-white rounded-md p-8 mx-auto border border-gray-100 overflow-y-auto relative z-20 w-full max-w-6xl">
          <Dialog.Title className="text-2xl font-bold">
            {_.get(selectedData, "Personal_details.f_name")}{" "}
            {_.get(selectedData, "Personal_details.m_name")}{" "}
            {_.get(selectedData, "Personal_details.surname")}&apos;s digital
            service book
          </Dialog.Title>
          <hr className='my-4'/>
          {selectedData && (
            <dl className="divide-y divide-gray-100">
              {detailsList.map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0"
                >
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    {item.title}:
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {_.get(selectedData, item.value)}
                  </dd>
                </div>
              ))}
            </dl>
          )}
          <div className='mt-6 flex flex-auto gap-4 flex-row-reverse font-semibold'>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            >
              View uploaded service book
            </button>
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            >
              View attentance report
            </button>
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            >
              Manage reprimands
            </button>
            <button
              className="bg-indigo-500 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            >
              Manage tasks
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default TeacherDetailsDialog;



