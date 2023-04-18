import { useState, useContext } from 'react';
import { FormContext } from './FormContext';
import { BasicFormValues, DynamicInstituteFormValues, FormValues, initialValues } from "./formTypes";
import PersonalDetails from './steps/PersonalDetails';
import ContactDetails from './steps/ContactDetails';
import EducationalDetails from './steps/EducationalDetails';
import PrevPostings from './steps/PrevPostings';
import { db } from '@/firebase';
import { Dialog } from '@headlessui/react'

const steps = [
    { key: 'step1', component: <PersonalDetails /> },
    { key: 'step2', component: <ContactDetails /> },
    { key: 'step3', component: <EducationalDetails /> },
    { key: 'step4', component: <PrevPostings /> },
];


const MultiStepForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const { values, setValues } = useContext(FormContext);

    const [showDialog, setShowDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState('');


    const next = () => {
        setCurrentStep(currentStep + 1);
    };

    const back = () => {
        setCurrentStep(currentStep - 1);
    };

    const closeDialog = () => {
        setShowDialog(false);
        setDialogMessage('');
        setCurrentStep(0);
    };


    const submit = async () => {
        try {
            const formId = db.collection("forms").doc().id;

            const stepData: {
                Personal_details: Partial<BasicFormValues>,
                Contact_details: Partial<BasicFormValues>,
                Educational_details: Partial<BasicFormValues>,
                Prev_postings: Partial<DynamicInstituteFormValues>,
            } = {
                Personal_details: {},
                Contact_details: {},
                Educational_details: {},
                Prev_postings: {},
            };

            // TODO: improve logic of step determination
            for (const key in values) {
                if (Object.prototype.hasOwnProperty.call(values, key)) {
                    const value = values[key as keyof FormValues];
                    let stepName: string = '';

                    if (key.startsWith("f_") || key.startsWith("m_") || key.startsWith("surn") || key.startsWith("dob") || key.startsWith("pob") || key.startsWith("blood") || key.startsWith("rel") || key.startsWith("caste") || key.startsWith("gend") || key.startsWith("disab") || key.startsWith("marit") || key.startsWith("id_")) {
                        stepName = "Personal_details";
                    } else if (key.startsWith("cno") || key.startsWith("emerg") || key.startsWith("email") || key.startsWith("address")) {
                        stepName = "Contact_details";
                    } else if (key.startsWith("tenth") || key.startsWith("twelfth") || key.startsWith("ug_") || key.startsWith("grad_")) {
                        stepName = "Educational_details";
                    } else if (key.startsWith("behav") || key.startsWith("institute") || key.startsWith("doj") || key.startsWith("dol") || key.startsWith("post") || key.startsWith("subject") || key.startsWith("start") || key.startsWith("end") || key.startsWith("remark")) {
                        stepName = "Prev_postings";
                    }

                    if (stepName === "Personal_details") {
                        stepData.Personal_details[key as keyof BasicFormValues] = value;
                    } else if (stepName === "Contact_details") {
                        stepData.Contact_details[key as keyof BasicFormValues] = value;
                    } else if (stepName === "Educational_details") {
                        stepData.Educational_details[key as keyof BasicFormValues] = value;
                    } else if (stepName === "Prev_postings") {
                        stepData.Prev_postings[key as keyof DynamicInstituteFormValues] = value;
                    }
                }
            }
            await db.collection("forms").doc(formId).set(stepData);
            console.log("Form submitted:", values);
            setValues(initialValues); // Reset form values
            setDialogMessage('Form submitted successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
            setDialogMessage('Failed to submit the form.');
        } finally {
            setShowDialog(true);
        }
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

            <Dialog open={showDialog} onClose={closeDialog} className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0">
                    <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform sm:align-middle sm:max-w-md sm:w-full sm:p-6">
                        <div>
                            <div className="mt-3 text-center sm:mt-5">
                                <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                    Form Submission Result
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">{dialogMessage}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6">
                            <button
                                type="button"
                                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm"
                                onClick={closeDialog}
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </Dialog>

        </div>
    );
};

export default MultiStepForm;

