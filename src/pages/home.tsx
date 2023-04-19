import { useEffect, useState } from 'react';
import { db } from '../firebase';

interface PersonalDetails {
  f_name: string;
  surname: string;
}

interface Contactdetails {
  cno: number;
}

interface DataType {
  Personal_details: PersonalDetails;
  Contact_details: Contactdetails;
  // Add other fields as needed
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
    <div>
      <input
        type="text"
        className="border border-gray-300 px-3 py-2 m-10"
        placeholder="Search by first and middle names"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      {documentsData.length > 0 ? (
        <>
          <p>Documents with the name exist:</p>
          <table className="min-w-full table-auto">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Cno</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {documentsData.map((docData, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                  <td className="px-4 py-2">{docData.Personal_details.f_name} {docData.Personal_details.surname}</td>
                  <td className="px-4 py-2">{docData.Contact_details.cno}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p>No document with the name exists.</p>
      )}
    </div>
  );
};

export default Home;