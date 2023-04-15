import { useContext } from 'react';
import { FormContext } from '../FormContext';

const PersonalDetails: React.FC = () => {
  const { values, setValues } = useContext(FormContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ [name]: value });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues({ [name]: value });
  };

  return (
    <form className='max-w-md '>
      <h1 className="block text-2xl font-bold text-gray-700">Personal details of {values.f_name}</h1>

      {/* Name section */}
      <div className="my-10 grid grid-flow-col auto-cols-max gap-12">
        <div className='w-96'>
          <label htmlFor="f_name" className="block mb-2 text-base font-bold text-gray-700">First name</label>
          <input
            id="f_name"
            name="f_name"
            type="text"
            value={values.f_name}
            onChange={handleChange}
            className="border border-black rounded p-2 focus:outline-blue-500 w-full"
          />
        </div>
        <div className='w-96'>
          <label htmlFor="m_name" className="block mb-2 text-base font-bold text-gray-700">Middle name</label>
          <input
            id="m_name"
            name="m_name"
            type="text"
            value={values.m_name}
            onChange={handleChange}
            className="border border-black rounded p-2 focus:outline-blue-500 w-full"
          />
        </div>
        <div className='w-96'>
          <label htmlFor="surname" className="block mb-2 text-base font-bold text-gray-700">Surname</label>
          <input
            id="surname"
            name="surname"
            type="text"
            value={values.surname}
            onChange={handleChange}
            className="border border-black rounded p-2 focus:outline-blue-500 w-full"
          />
        </div>
      </div>

      {/* Birth section */}
      <div className="my-10 grid grid-flow-col auto-cols-max gap-12">
        <div className='w-96'>
          <label htmlFor="dob" className="block mb-2 text-base font-bold text-gray-700">Date of birth</label>
          <input
            id="dob"
            name="dob"
            type="date"
            value={values.dob}
            onChange={handleChange}
            className="border border-black rounded p-2 focus:outline-blue-500 w-full"
          />
        </div>
        <div className='w-96'>
          <label htmlFor="pob" className="block mb-2 text-base font-bold text-gray-700">Place of birth</label>
          <input
            id="pob"
            name="pob"
            type="text"
            value={values.pob}
            onChange={handleChange}
            className="border border-black rounded p-2 focus:outline-blue-500 w-full"
          />
        </div>
        <div className='w-96'>
          <label htmlFor="blood_group" className="block mb-2 text-base font-bold text-gray-700">Blood group</label>
          <select name="blood_group" id="blood_group" value={values.blood_group} onChange={handleSelectChange} className="border border-black rounded p-2 focus:outline-blue-500 w-full">
            <option value="" disabled>Select</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
      </div>

      {/* Religion / Caste section */}
      <div className="my-10 grid grid-flow-col auto-cols-max gap-12">
        <div className='w-96'>
          <label htmlFor="religion" className="block mb-2 text-base font-bold text-gray-700">Religion</label>
          <select name="religion" id="religion" value={values.religion} onChange={handleSelectChange} className="border border-black rounded p-2 focus:outline-blue-500 w-full">
            <option value="" disabled>Select</option>
            <option value="Hindu">Hindu</option>
            <option value="Muslim">Muslim</option>
            <option value="Christian">Christian</option>
            <option value="Buddhish">Buddhist</option>
            <option value="Sikh">Sikh</option>
          </select>
        </div>
        <div className='w-96'>
          <label htmlFor="caste" className="block mb-2 text-base font-bold text-gray-700">Caste</label>
          <input
            id="caste"
            name="caste"
            type="caste"
            value={values.caste}
            onChange={handleChange}
            className="border border-black rounded p-2 focus:outline-blue-500 w-full"
          />
        </div>
      </div>

      {/* Gender / disability section */}
      <div className="my-10 grid grid-flow-col auto-cols-max gap-12">
        <div className='w-96'>
          <label htmlFor="gender" className="block mb-2 text-base font-bold text-gray-700">Gender</label>
          <select name="gender" id="gender" value={values.gender} onChange={handleSelectChange} className="border border-black rounded p-2 focus:outline-blue-500 w-full ">
            <option value="" disabled>Select</option>
            <option value="Male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className='w-96'>
          <label htmlFor="disability" className="block mb-2 text-base font-bold text-gray-700">Physical disability</label>
          <select name="disability" id="disability" value={values.disability} onChange={handleSelectChange} className="border border-black rounded p-2 focus:outline-blue-500 w-full">
            <option value="" disabled>Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      {/* Marital section */}
      <div className='my-10'>
        <label htmlFor="marital_status" className="block mb-2 text-base font-bold text-gray-700">Marital Status</label>
        <select name="marital_status" id="marital_status" value={values.marital_status} onChange={handleSelectChange} className="border border-black rounded p-2 focus:outline-blue-500 flex w-full">
          <option value="" disabled>Select</option>
          <option value="Single">Single</option>
          <option value="Married">Married</option>
          <option value="Widowed">Widowed</option>
          <option value="Divorced">Divorced</option>
        </select>
      </div>

      {/* Personal identification section */}
      <div className='my-10'>
        <label htmlFor="id_mark" className="block mb-2 text-base font-bold text-gray-700">Personal identification mark</label>
        <input
          id="id_mark"
          name="id_mark"
          type="text"
          value={values.id_mark}
          onChange={handleChange}
          className="border border-black rounded p-2 focus:outline-blue-500 w-full"
        />
      </div>
    </form >
  );
};

export default PersonalDetails;