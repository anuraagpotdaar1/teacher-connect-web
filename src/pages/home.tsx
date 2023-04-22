import { useState } from 'react';
import TeacherSearch from '../componants/TeacherSearch';
import TeacherDetailsDialog from '../componants/TeacherDetailsDialog';
import {
  PersonalDetailsValues,
  ContactDetailsValues,
  DynamicInstituteFormValues,
} from '../componants/formTypes';

const stats = [
  { name: 'Total Schools', stat: '15,897' },
  { name: 'Total Teacher Intake', stat: '72,253' },
  { name: 'Teacher Occupied', stat: '70,152' },
  { name: 'Teacher Vacancy', stat: '2,156' },
];

export interface DataType {
  docId: string;
  Personal_details: Pick<PersonalDetailsValues, 'f_name' | 'm_name' | 'surname'>;
  Contact_details: Pick<ContactDetailsValues, 'cno'>;
  Prev_postings: Pick<DynamicInstituteFormValues, 'institute_name_1' | 'subject_1'>;
  Reprimands?: Array<{
    timestamp: any;
    text: string;
  }>;
}

const Home = () => {
  const [documentsData, setDocumentsData] = useState<DataType[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<DataType | null>(null);

  const handleRowClick = (data: DataType) => {
    setSelectedData(data);
    setIsModalOpen(true);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl text-indigo-800 font-bold mb-14">Dashboard</h1>

      <dl className="grid grid-cols-1 gap-16 sm:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 shadow-lg bg-indigo-50 rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-black truncate">{item.name}</dt>
            <dd className="mt-1 text-3xl text-indigo-700 font-bold">{item.stat}</dd>
          </div>
        ))}
      </dl>

      <TeacherSearch
        setDocumentsData={setDocumentsData}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      {documentsData.length > 0 ? (
        <div>
          <p className="font-medium">
            {documentsData.length} {documentsData.length === 1 ? 'entry' : 'entries'} exist:
          </p>
          <table className="min-w-full divide-y mt-10 shadow-md divide-indigo-200">
            <thead className="bg-indigo-200 sticky top-0">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-black text-indigo-800 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-black text-indigo-800 uppercase tracking-wider"
                >
                  School name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-sm font-black text-indigo-800 uppercase tracking-wider"
                >
                  Subject
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {documentsData.map((docData, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-indigo-50' : 'bg-indigo-100'} onClick={() => handleRowClick(docData)} style={{ cursor: 'pointer' }}>
                  <td className="px-6 py-2 font-medium">
                    {docData.Personal_details.f_name} {docData.Personal_details.m_name} {docData.Personal_details.surname}
                  </td>
                  <td className="px-6 py-2 font-medium">{docData.Prev_postings.institute_name_1}</td>
                  <td className="px-6 py-2 font-medium">{docData.Prev_postings.subject_1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        searchText !== '' && (<p className="font-medium">😓 No teacher with the provided name exists.</p>)
      )}

      <TeacherDetailsDialog isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedData={selectedData} />
    </div>
  );
};

export default Home;