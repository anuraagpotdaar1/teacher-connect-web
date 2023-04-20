import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { PersonalDetailsValues, ContactDetailsValues, EducationalDetailsValues, DynamicInstituteFormValues, FormValues, initialValues } from "../componants/formTypes";

const stats = [
  { name: 'Total Schools', stat: '15,897' },
  { name: 'Total Teacher Intake', stat: '72,253' },
  { name: 'Teacher Occupied', stat: '70,152' },
  { name: 'Teacher Vacancy', stat: '2,156' },
]

interface DataType {
  Personal_details: Pick<PersonalDetailsValues, 'f_name' | 'surname'>;
  Contact_details: Pick<ContactDetailsValues, 'cno'>;
  Prev_postings: Pick<DynamicInstituteFormValues, 'institute_name_1' | 'subject_1'>;
}

const Home = () => {
  const [documentsData, setDocumentsData] = useState<DataType[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    if (searchText === '') {
      setDocumentsData([]);
      return;
    }

    const [f_name, surname] = searchText.split(' ');

    let query = db.collection('teachers');

    if (f_name) {
      query = query.where('Personal_details.f_name', '>=', f_name).where('Personal_details.f_name', '<', f_name + '\uf8ff') as unknown as typeof query;
    }

    const unsubscribe = query.onSnapshot((snapshot) => {
      let fetchedData: DataType[] = [];
      snapshot.forEach((doc) => {
        fetchedData.push(doc.data() as DataType);
      });

      if (surname) {
        fetchedData = fetchedData.filter((docData) => {
          if (docData.Personal_details.surname) {
            return docData.Personal_details.surname >= surname && docData.Personal_details.surname < surname + '\uf8ff';
          }
          return false;
        });
      }

      setDocumentsData(fetchedData);
    });

    // Clean up the listener on unmount
    return () => {
      unsubscribe();
    };
  }, [searchText]);


  return (
    <div className='m-10 mx-16'>
      <dl className="grid grid-cols-1 gap-16 sm:grid-cols-4">
        {stats.map((item) => (
          <div key={item.name} className="px-4 py-5 shadow-lg bg-indigo-50 rounded-lg overflow-hidden sm:p-6">
            <dt className="text-sm font-medium text-black truncate">{item.name}</dt>
            <dd className="mt-1 text-3xl text-indigo-700 font-bold">{item.stat}</dd>
          </div>
        ))}
      </dl>

      <div className="my-14">
        <div className="relative">
          <input
            type="text"
            className="w-full pl-10 pr-10 bg-white h-10 rounded-md text-lg font-medium border-2 focus:border-none focus:outline-none focus:ring-2 focus:ring-blue-300 focus:shadow-md"
            placeholder="Search teacher"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="absolute left-0 top-0 mt-2.5 ml-3">
            <svg
              className="text-gray-400 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 42 42"
            >
              <path d="M21,3c-9.39844,0 -17,7.60156 -17,17c0,9.39844 7.60156,17 17,17c3.35547,0 6.46094,-0.98437 9.09375,-2.65625l12.28125,12.28125l4.25,-4.25l-12.125,-12.09375c2.17969,-2.85937 3.5,-6.40234 3.5,-10.28125c0,-9.39844 -7.60156,-17 -17,-17zM21,7c7.19922,0 13,5.80078 13,13c0,7.19922 -5.80078,13 -13,13c-7.19922,0 -13,-5.80078 -13,-13c0,-7.19922 5.80078,-13 13,-13z"></path>
            </svg>
          </div>
          {searchText && (
            <button type="button" className="absolute right-0 top-0 mt-3 mr-4" onClick={() => setSearchText('')}>
              <svg
                className="text-gray-400 h-4 w-4 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
              >
                <path d="M25,2c-12.681,0 -23,10.319 -23,23c0,12.681 10.319,23 23,23c12.681,0 23,-10.319 23,-23c0,-12.681 -10.319,-23 -23,-23zM33.71,32.29c0.39,0.39 0.39,1.03 0,1.42c-0.2,0.19 -0.45,0.29 -0.71,0.29c-0.26,0 -0.51,-0.1 -0.71,-0.29l-7.29,-7.29l-7.29,7.29c-0.2,0.19 -0.45,0.29 -0.71,0.29c-0.26,0 -0.51,-0.1 -0.71,-0.29c-0.39,-0.39 -0.39,-1.03 0,-1.42l7.29,-7.29l-7.29,-7.29c-0.39,-0.39 -0.39,-1.03 0,-1.42c0.39,-0.39 1.03,-0.39 1.42,0l7.29,7.29l7.29,-7.29c0.39,-0.39 1.03,-0.39 1.42,0c0.39,0.39 0.39,1.03 0,1.42l-7.29,7.29z"></path>
              </svg>
            </button>
          )}
        </div>
      </div>

      {documentsData.length > 0 ? (
        <div>
          <p className='font-medium'>{documentsData.length} {documentsData.length === 1 ? "entry" : "entries"} exist:</p>
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
            <tbody className="bg-white ">
              {documentsData.map((docData, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-indigo-50' : 'bg-indigo-100'}>
                  <td className="px-6 py-2 font-medium">{docData.Personal_details.f_name} {docData.Personal_details.surname}</td>
                  <td className="px-6 py-2 font-medium">{docData.Prev_postings.institute_name_1}</td>
                  <td className="px-6 py-2 font-medium">{docData.Prev_postings.subject_1}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        searchText !== '' && <p className='font-medium'>😓 No teacher with the provided name exists.</p>
      )}
    </div>
  );
};

export default Home;