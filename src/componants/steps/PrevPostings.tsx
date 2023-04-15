import React, { useContext, useState } from "react";
import { FormContext } from '../FormContext';

const PrevPostings: React.FC = () => {
  const { values, setValues } = useContext(FormContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ [name]: value });
  };

  const numOfInstitutes = 3;
  const institutes = Array.from({ length: numOfInstitutes }, (_, i) => i + 1);

  const [expandedInstitute, setExpandedInstitute] = useState(-1);

  const handleSummaryClick = (event: React.MouseEvent, index: number) => {
    event.preventDefault();
    if (expandedInstitute === index) {
      setExpandedInstitute(-1);
    } else {
      setExpandedInstitute(index);
    }
  };

  return (
    <form>
      <h1 className="block text-2xl font-bold text-gray-700">Previous postings of {values.f_name}</h1>
      <div className="w-96 my-6">
        <label htmlFor="behaviour" className="block mb-2 text-base font-bold text-gray-700">Overall behaviour</label>
        <select name="behaviour" id="behaviour" className="border border-black rounded p-2 focus:outline-blue-500 flex w-full ">
          <option value="" disabled selected>Select</option>
          <option value={values.behaviour}>Good</option>
          <option value={values.behaviour}>Neutral</option>
          <option value={values.behaviour}>Bad</option>
        </select>
      </div>
      {Array.from({ length: numOfInstitutes }, (_, index) => index + 1).map((institute) => (
        <details key={`details-${institute}`} open={expandedInstitute === institute}>
          <summary onClick={(event) => handleSummaryClick(event, institute)} className="my-2 text-black text-lg font-bold bg-indigo-300 p-4 rounded-md">{`Details of institute #${institute}`}</summary>
          <div className="p-4 bg-indigo-100 rounded-md">
            {/* Institute name */}
            <div className="mt-4 w-96">
              <label htmlFor={`institute_name_${institute}`} className="block mb-2 text-base font-bold text-gray-700">{`Institute name #${institute}`}</label>
              <select name={`institute_name_${institute}`} id={`institute_name_${institute}`} className="border border-black rounded p-2 focus:outline-blue-500 flex w-full ">
                <option value="" disabled selected>Select</option>
                <option value={`institute_name_${institute}`}>ZP Pune</option>
                <option value={`institute_name_${institute}`}>ZP Mumbai</option>
                <option value={`institute_name_${institute}`}>Army Public School</option>
                <option value={`institute_name_${institute}`}>Kendriya Vidyalaya, Southern Command, Pune</option>
              </select>
            </div>

            {/* Date of joining and leaving */}
            <div className="mt-4 grid grid-cols-3 gap-12">
              <div className="mt-4 w-96">
                <label htmlFor={`doj_${institute}`} className="block mb-2 text-base font-bold text-gray-700">Date of joining</label>
                <input
                  id={`doj_${institute}`}
                  name={`doj_${institute}`}
                  type="date"
                  onChange={handleChange}
                  className="border border-black rounded p-2 focus:outline-blue-500 w-full"
                />
              </div>
              <div className="mt-4 w-96">
                <label htmlFor={`dol_${institute}`} className="block mb-2 text-base font-bold text-gray-700">Date of leaving</label>
                <input
                  id={`dol_${institute}`}
                  name={`dol_${institute}`}
                  type="date"
                  onChange={handleChange}
                  className="border border-black rounded p-2 focus:outline-blue-500 w-full"
                />
              </div>
            </div>

            {/* Post and Subject*/}
            <div className="mt-4 grid grid-cols-3 gap-12">
              <div className="mt-4 w-96">
                <label htmlFor={`post_${institute}`} className="block mb-2 text-base font-bold text-gray-700">{`Post #${institute}`}</label>
                <select name={`post_${institute}`} id={`post_${institute}`} className="border border-black rounded p-2 focus:outline-blue-500 flex w-full ">
                  <option value="" disabled selected>Select</option>
                  <option value={`post_${institute}`}>Primary teacher</option>
                  <option value={`post_${institute}`}>Secondary teacher</option>
                  <option value={`post_${institute}`}>Assistant professor</option>
                  <option value={`post_${institute}`}>Principal</option>
                  <option value={`post_${institute}`}>Head of Department</option>
                </select>
              </div>
              <div className="mt-4 w-96">
                <label htmlFor={`subject_${institute}`} className="block mb-2 text-base font-bold text-gray-700">{`Subject #${institute}`}</label>
                <select name={`subject_${institute}`} id={`subject_${institute}`} className="border border-black rounded p-2 focus:outline-blue-500 flex w-full ">
                  <option value="" disabled selected>Select</option>
                  <option value={`subject_${institute}`}>Maths 1</option>
                  <option value={`subject_${institute}`}>Maths 2</option>
                  <option value={`subject_${institute}`}>Science</option>
                  <option value={`subject_${institute}`}>Data science</option>
                  <option value={`subject_${institute}`}>Data structures and algorithms</option>
                </select>
              </div>
            </div>

            {/* Salary */}
            <div className="mt-4 grid grid-cols-3 gap-12">
              <div className="mt-4 w-96">
                <label htmlFor={`starting_salary_${institute}`} className="block mb-2 text-base font-bold text-gray-700">{`Starting salary #${institute}`}</label>
                <input
                  id={`starting_salary_${institute}`}
                  name={`starting_salary_${institute}`}
                  type="number"
                  min={5000}
                  step={5000}
                  onChange={handleChange}
                  className="border border-black rounded p-2 focus:outline-blue-500 w-full"
                />
              </div>
              <div className="mt-4 w-96">
                <label htmlFor={`ending_salary_${institute}`} className="block mb-2 text-base font-bold text-gray-700">{`Ending salary #${institute}`}</label>
                <input
                  id={`ending_salary_${institute}`}
                  name={`ending_salary_${institute}`}
                  type="number"
                  min={5000}
                  step={5000}
                  onChange={handleChange}
                  className="border border-black rounded p-2 focus:outline-blue-500 w-full"
                />
              </div>
            </div>

            {/* Remark by authority */}
            <div className="mt-4 w-96">
              <label htmlFor={`remark_${institute}`} className="block mb-2 text-base font-bold text-gray-700">{`Remark by authority #${institute}`}</label>
              <input
                id={`remark_${institute}`}
                name={`remark_${institute}`}
                type="text"
                onChange={handleChange}
                className="border border-black rounded p-2 focus:outline-blue-500 w-full"
              />
            </div>
          </div>
        </details>
      ))}
    </form>
  );
};

export default PrevPostings;