import { useEffect } from 'react';
import { db } from '../firebase';
import { DataType } from '../pages/home';
import { collection, query, where, onSnapshot, Query } from "firebase/firestore";

interface TeacherSearchProps {
    setDocumentsData: (data: DataType[]) => void;
    searchText: string;
    setSearchText: (text: string) => void;
}

const TeacherSearch: React.FC<TeacherSearchProps> = ({ setDocumentsData, searchText, setSearchText }) => {

    useEffect(() => {
        if (searchText === "") {
            setDocumentsData([]);
            return;
        }

        const [f_name, surname] = searchText.split(" ");

        let baseQuery: Query = collection(db, "teachers");

        if (f_name) {
            baseQuery = query(
                baseQuery,
                where("Personal_details.f_name", ">=", f_name),
                where("Personal_details.f_name", "<", f_name + "\uf8ff")
            );
        }

        const unsubscribe = onSnapshot(baseQuery, (snapshot) => {
            let fetchedData: DataType[] = [];
            snapshot.forEach((doc) => {
                fetchedData.push({ docId: doc.id, ...doc.data() } as DataType);
            });

            if (surname) {
                fetchedData = fetchedData.filter((docData) => {
                    if (docData.Personal_details.surname) {
                        return (
                            docData.Personal_details.surname >= surname &&
                            docData.Personal_details.surname < surname + "\uf8ff"
                        );
                    }
                    return false;
                });
            }
            console.log(fetchedData);
            setDocumentsData(fetchedData);
        });

        // Clean up the listener on unmount
        return () => {
            unsubscribe();
        };
    }, [searchText, setDocumentsData]);


    return (
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
    );
};

export default TeacherSearch;