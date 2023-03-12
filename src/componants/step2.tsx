import { useState } from 'react';

type StepProps = {
  formData: any;
  onSubmit: (data: any) => void;
};

const Step2: React.FC<StepProps> = ({ formData, onSubmit }) => {
  const [email, setEmail] = useState(formData.email || '');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onSubmit({ [name]: value });
  };

  return (
    <form>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            handleFormChange(e);
          }}
          required
        />
      </div>
    </form>
  );
};

export default Step2;
