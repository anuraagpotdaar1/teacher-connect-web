import { useContext } from 'react';
import { FormContext } from './FormContext';

const Step3: React.FC = () => {
  const { values, setValues } = useContext(FormContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ step3: e.target.value });
  };

  return (
    <div>
      <label htmlFor="step3">Step 1:</label>
      <input
        id="step3"
        type="text"
        value={values.step3}
        onChange={handleChange}
        className="border border-gray-300 p-2"
      />
    </div>
  );
};

export default Step3;
