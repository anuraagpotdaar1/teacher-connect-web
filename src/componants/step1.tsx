import { useContext } from 'react';
import { FormContext } from './FormContext';

const Step1: React.FC = () => {
  const { values, setValues } = useContext(FormContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ [name]: value });
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="field1" className="block mb-2">Field 1:</label>
        <input
          id="field1"
          name="field1"
          type="text"
          value={values.field1}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="field2" className="block mb-2">Field 2:</label>
        <input
          id="field2"
          name="field2"
          type="text"
          value={values.field2}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="field3" className="block mb-2">Field 3:</label>
        <input
          id="field3"
          name="field3"
          type="text"
          value={values.field3}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="field4" className="block mb-2">Field 4:</label>
        <input
          id="field4"
          name="field4"
          type="text"
          value={values.field4}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="field5" className="block mb-2">Field 5:</label>
        <input
          id="field5"
          name="field5"
          type="text"
          value={values.field5}
          onChange={handleChange}
          className="border border-gray-300 p-2 w-full"
        />
      </div>
    </div>
  );
};

export default Step1;