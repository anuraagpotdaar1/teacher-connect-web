import { useContext } from 'react';
import { FormContext } from '../FormContext';

const EducationalDetails: React.FC = () => {
  const { values, setValues } = useContext(FormContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ [name]: value });
  };

  return (
    <form>
      <h1 className="block text-2xl font-bold text-gray-700">Educational qualification of {values.f_name}</h1>
      <div className="my-10 grid grid-flow-col auto-cols-max gap-12">
        <div className='w-96'>
          <label htmlFor="tenth_per" className="block mb-2 text-base font-bold text-gray-700">10th percentage</label>
          <input
            id="tenth_per"
            name="tenth_per"
            type="number"
            value={values.tenth_per}
            onChange={handleChange}
            className="border border-black rounded p-2 focus:outline-blue-500 w-full"
          />
        </div>
        <div className='w-96'>
          <label htmlFor="tenth_board" className="block mb-2 text-base font-bold text-gray-700">10th board</label>
          <select name="tenth_board" id="tenth_board" className="border border-black rounded p-2 focus:outline-blue-500 flex w-full ">
            <option value="" disabled selected>Select</option>
            <option value={values.tenth_board}>CBSC</option>
            <option value={values.tenth_board}>ICSE</option>
            <option value={values.tenth_board}>Maharashtra SSC</option>
            <option value={values.tenth_board}>NIOS</option>
          </select>
        </div>
      </div>
      <div className="my-10 grid grid-flow-col auto-cols-max gap-12">
        <div className='w-96'>
          <label htmlFor="twelfth_per" className="block mb-2 text-base font-bold text-gray-700">12th / Diploma percentage</label>
          <input
            id="twelfth_per"
            name="twelfth_per"
            type="twelfth_per"
            value={values.twelfth_per}
            onChange={handleChange}
            className="border border-black rounded p-2 focus:outline-blue-500 w-full"
          />
        </div>
        <div className='w-96'>
          <label htmlFor="twelfth_board" className="block mb-2 text-base font-bold text-gray-700">12th / Diploma board</label>
          <select name="twelfth_board" id="twelfth_board" className="border border-black rounded p-2 focus:outline-blue-500 flex w-full ">
            <option value="" disabled selected>Select</option>
            <option value={values.twelfth_board}>CBSC</option>
            <option value={values.twelfth_board}>ICSE</option>
            <option value={values.twelfth_board}>Maharashtra HSC</option>
            <option value={values.twelfth_board}>MSBTE</option>
            <option value={values.twelfth_board}>NIOS</option>
          </select>
        </div>
      </div>
      <div className="my-10 grid grid-flow-col auto-cols-max gap-12">
        <div className='w-96'>
          <label htmlFor="ug_per" className="block mb-2 text-base font-bold text-gray-700">Undergraduate percentage / GPA</label>
          <input
            id="ug_per"
            name="ug_per"
            type="number"
            value={values.ug_per}
            onChange={handleChange}
            className="border border-black rounded p-2 focus:outline-blue-500 w-full"
          />
        </div>
        <div className='w-96'>
          <label htmlFor="ug_field" className="block mb-2 text-base font-bold text-gray-700">Field (Major)</label>
          <select name="ug_field" id="ug_field" className="border border-black rounded p-2 focus:outline-blue-500 flex w-full ">
            <option value="" disabled selected>Select</option>
            <option value={values.ug_field}>Engineering</option>
            <option value={values.ug_field}>MBA</option>
            <option value={values.ug_field}>PhD</option>
          </select>
        </div>
        <div className='w-96'>
          <label htmlFor="ug_uni" className="block mb-2 text-base font-bold text-gray-700">Undergraduate university</label>
          <select name="ug_uni" id="ug_uni" className="border border-black rounded p-2 focus:outline-blue-500 flex w-full ">
            <option value="" disabled selected>Select</option>
            <option value={values.ug_uni}>SPPU</option>
            <option value={values.ug_uni}>MU</option>
            <option value={values.ug_uni}>IIT</option>
            <option value={values.ug_uni}>IIIT</option>
            <option value={values.ug_uni}>IIM</option>
          </select>
        </div>
      </div>
      <div className="my-10 grid grid-flow-col auto-cols-max gap-12">
        <div className='w-96'>
          <label htmlFor="grad_per" className="block mb-2 text-base font-bold text-gray-700">Postgraduate percentage / GPA</label>
          <input
            id="grad_per"
            name="grad_per"
            type="number"
            value={values.grad_per}
            onChange={handleChange}
            className="border border-black rounded p-2 focus:outline-blue-500 w-full"
          />
        </div>
        <div className='w-96'>
          <label htmlFor="grad_uni" className="block mb-2 text-base font-bold text-gray-700">Field (Major)</label>
          <select name="grad_uni" id="grad_uni" className="border border-black rounded p-2 focus:outline-blue-500 flex w-full ">
            <option value="" disabled selected>Select</option>
            <option value={values.grad_uni}>Engineering</option>
            <option value={values.grad_uni}>MBA</option>
            <option value={values.grad_uni}>PhD</option>
          </select>
        </div>
        <div className='w-96'>
          <label htmlFor="grad_field" className="block mb-2 text-base font-bold text-gray-700">Postgraduate university</label>
          <select name="grad_field" id="grad_field" className="border border-black rounded p-2 focus:outline-blue-500 flex w-full ">
            <option value="" disabled selected>Select</option>
            <option value={values.grad_field}>SPPU</option>
            <option value={values.grad_field}>MU</option>
            <option value={values.grad_field}>IIT</option>
            <option value={values.grad_field}>IIIT</option>
            <option value={values.grad_field}>IIM</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default EducationalDetails;
