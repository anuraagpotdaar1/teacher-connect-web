import { useState } from 'react';

type StepProps = {
  formData: any;
  onSubmit: (formData: any) => void;
};

const Step1: React.FC<StepProps> = ({ formData, onSubmit }) => {
  const [name, setName] = useState(formData.name || '');

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    onSubmit({ name: e.target.value });
  };

  return (
    <form>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>
    </form>
  );
};

export default Step1;
