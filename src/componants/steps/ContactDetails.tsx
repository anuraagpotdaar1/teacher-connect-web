import { useContext } from 'react';
import { FormContext } from '../FormContext';

const ContactDetails: React.FC = () => {
  const { values, setValues } = useContext(FormContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ [name]: value });
  };

  return (
    <form>
      <h1 className="block text-2xl font-bold text-gray-700">Contact details of {values.f_name}</h1>
      <div className="my-10 grid grid-flow-col auto-cols-max gap-12">
        <div className='w-96'>
          <label htmlFor="cno" className="block mb-2 text-base font-bold text-gray-700">Contact number of {values.f_name}</label>
          <input
            id="cno"
            name="cno"
            type="tel"
            value={values.cno}
            onChange={handleChange}
            className="border border-black rounded p-2 focus:outline-blue-500 w-full"
          />
        </div>
        <div className='w-96'>
          <label htmlFor="emergency_cno" className="block mb-2 text-base font-bold text-gray-700">Emergency contact number</label>
          <input
            id="emergency_cno"
            name="emergency_cno"
            type="tel"
            value={values.emergency_cno}
            onChange={handleChange}
            className="border border-black rounded p-2 focus:outline-blue-500 w-full"
          />
        </div>
        <div className='w-96'>
          <label htmlFor="email" className="block mb-2 text-base font-bold text-gray-700">Email id</label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className="border border-black rounded p-2 focus:outline-blue-500 w-full"
          />
        </div>
      </div>
      <div className='w-full'>
        <label htmlFor="address" className="block mb-2 text-base font-bold text-gray-700">Current address</label>
        <textarea
          id="address"
          name="address"
          type="text"
          rows={4}
          value={values.address}
          onChange={handleChange}
          className="border border-black rounded p-2 focus:outline-blue-500 resize-none w-full"
        />
      </div>
    </form>
  );
};

export default ContactDetails;
