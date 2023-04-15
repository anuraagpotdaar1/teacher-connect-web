import { useState, useContext } from 'react';
import { FormContext } from './FormContext';
import { initialValues } from './formTypes';
import PersonalDetails from './steps/PersonalDetails';
import ContactDetails from './steps/ContactDetails';
import EducationalDetails from './steps/EducationalDetails';
import PrevPostings from './steps/PrevPostings';

const steps = [
    { key: 'step1', component: <PersonalDetails /> },
    { key: 'step2', component: <ContactDetails /> },
    { key: 'step3', component: <EducationalDetails /> },
    { key: 'step4', component: <PrevPostings /> },
];

const MultiStepForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const { values, setValues } = useContext(FormContext);

    const next = () => {
        setCurrentStep(currentStep + 1);
    };

    const back = () => {
        setCurrentStep(currentStep - 1);
    };

    const submit = () => {
        console.log('Form submitted:', values);
        setValues(initialValues);
    };

    return (
        <div>
            <div className="mb-4">
                <div>Step {currentStep + 1} of {steps.length}</div>
                <div className="h-2 bg-gray-200 mt-2 rounded-full">
                    <div className="h-2 bg-indigo-500 rounded-full" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}></div>
                </div>
            </div>

            <div className='w-full p-8 bg-indigo-50/50 border rounded-lg'>{steps[currentStep].component}</div>

            <div className="flex justify-between mt-6">
                {currentStep > 0 && (
                    <button onClick={back} className="bg-gray-500 text-white font-bold rounded px-4 py-2 w-1/4">
                        Back
                    </button>
                )}
                {currentStep < steps.length - 1 && (
                    <button onClick={next} className="bg-indigo-500 text-white font-bold rounded px-4 py-2 w-1/4">
                        Next
                    </button>
                )}
                {currentStep === steps.length - 1 && (
                    <button onClick={submit} className="bg-green-500 text-white font-bold rounded px-4 py-2 w-1/4">
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
};

export default MultiStepForm;

