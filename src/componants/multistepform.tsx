import { useState } from 'react';

type Step = {
  label: string;
  component: React.FC<StepProps>;
};

type StepProps = {
  formData: any;
  onSubmit: (formData: any) => void;
};


type MultiStepFormProps = {
  steps: Step[];
};

const MultiStepForm: React.FC<MultiStepFormProps> = ({ steps }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleFormSubmit = (data: any) => {
    setFormData({ ...formData, ...data });
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      console.log('Form submitted:', formData);
    }
  };

  const CurrentStep = steps[step].component;

  return (
    <div>
      <ul className="flex mb-4">
        {steps.map((s, i) => (
          <li
            key={s.label}
            className={`flex-1 text-center ${i === step ? 'font-bold' : 'text-gray-600'
              }`}
          >
            {s.label}
          </li>
        ))}
      </ul>
      <div className="mb-8">
        <CurrentStep formData={formData} onSubmit={handleFormSubmit} />
      </div>
      <div className="text-center">
        {step > 0 && (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            onClick={() => setStep(step - 1)}
          >
            Back
          </button>
        )}
        {step === steps.length - 1 ? (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => console.log(formData)}
          >
            Submit
          </button>
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setStep(step + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};


export default MultiStepForm;
