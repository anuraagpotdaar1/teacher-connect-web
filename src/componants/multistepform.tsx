import { useState, useContext } from 'react';
import { FormContext } from './FormContext';
import { initialValues } from './formTypes';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const steps = [
    { key: 'step1', component: <Step1 /> },
    { key: 'step2', component: <Step2 /> },
    { key: 'step3', component: <Step3 /> },
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
        <div className="w-full max-w-md mx-auto">
            <div className="mb-4">
                <div>Step {currentStep + 1} of {steps.length}</div>
                <div className="h-2 bg-gray-200 mt-2">
                    <div className="h-2 bg-blue-500" style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}></div>
                </div>
            </div>

            <div>{steps[currentStep].component}</div>

            <div className="flex justify-between mt-4">
                {currentStep > 0 && (
                    <button onClick={back} className="bg-gray-500 text-white px-4 py-2">
                        Back
                    </button>
                )}
                {currentStep < steps.length - 1 && (
                    <button onClick={next} className="bg-blue-500 text-white px-4 py-2">
                        Next
                    </button>
                )}
                {currentStep === steps.length - 1 && (
                    <button onClick={submit} className="bg-green-500 text-white px-4 py-2">
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
};

export default MultiStepForm;

