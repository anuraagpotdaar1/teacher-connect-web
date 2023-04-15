import React, { useContext, useState } from "react";
import { FormContext } from '../FormContext';

const PrevPostings: React.FC = () => {
  const { values, setValues } = useContext(FormContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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

      <div className="my-6 grid grid-flow-col auto-cols-max gap-12">
        <div className="w-96">
          <label htmlFor="behaviour" className="block mb-2 text-base font-bold text-gray-700">Overall behaviour</label>
          <select name="behaviour" id="behaviour" value={values.behaviour} onChange={handleSelectChange} className="border border-black rounded p-2 focus:outline-blue-500 flex w-full ">
            <option value="" disabled>Select</option>
            <option value="Good">Good</option>
            <option value="Neutral">Neutral</option>
            <option value="Bad">Bad</option>
          </select>
        </div>
        <div className="w-96">
          <label htmlFor="behaviour" className="block mb-2 text-base font-bold text-gray-700">Upload service book</label>
          <input
            type="file"
            id="service_book"
            name="service_book"
            accept=".pdf"
            className="border border-black rounded p-1 focus:outline-blue-500 flex w-full "></input>
        </div>
      </div>

      {institutes.map((institute) => (
        <details key={`details-${institute}`} open={expandedInstitute === institute}>
          <summary onClick={(event) => handleSummaryClick(event, institute)} className="my-2 text-black text-lg font-bold bg-indigo-300 p-4 rounded-md">{`Details of institute #${institute}`}</summary>
          <div className="p-4 bg-indigo-100 rounded-md">

            {/* Institute name */}
            <div className="mt-4 w-96">
              <label htmlFor={`institute_name_${institute}`} className="block mb-2 text-base font-bold text-gray-700">{`Institute name #${institute}`}</label>
              <select name={`institute_name_${institute}`} id={`institute_name_${institute}`} value={values[`institute_name_${institute}`]} onChange={handleSelectChange} className="border border-black rounded p-2 focus:outline-blue-500 flex w-full ">
                <option value="" disabled>Select</option>
                <option value="ZP Pune">ZP Pune</option>
                <option value="ZP Mumbai">ZP Mumbai</option>
                <option value="Army Public School">Army Public School</option>
                <option value="Kendriya Vidyalaya, Southern Command, Pune">Kendriya Vidyalaya, Southern Command, Pune</option>
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
                <select name={`post_${institute}`} id={`post_${institute}`} value={values[`post_${institute}`]} onChange={handleSelectChange} className="border border-black rounded p-2 focus:outline-blue-500 flex w-full ">
                  <option value="" disabled>Select</option>
                  <option value="Primary teacher">Primary teacher</option>
                  <option value="Secondary teacher">Secondary teacher</option>
                  <option value="Assistant professor">Assistant professor</option>
                  <option value="Principal">Principal</option>
                  <option value="Head of Department">Head of Department</option>
                </select>
              </div>
              <div className="mt-4 w-96">
                <label htmlFor={`subject_${institute}`} className="block mb-2 text-base font-bold text-gray-700">{`Subject #${institute}`}</label>
                <select name={`subject_${institute}`} id={`subject_${institute}`} value={values[`subject_${institute}`]} onChange={handleSelectChange} className="border border-black rounded p-2 focus:outline-blue-500 flex w-full ">
                  <option value="" disabled>Select</option>
                  <option value="Maths 1">Maths 1</option>
                  <option value="Maths 2">Maths 2</option>
                  <option value="Science">Science</option>
                  <option value="Data science">Data science</option>
                  <option value="Data structures and algorithms">Data structures and algorithms</option>
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