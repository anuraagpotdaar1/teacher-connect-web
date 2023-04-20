import { createContext, useState } from 'react';
import { FormValues, initialValues } from './formTypes';

interface FormContextProps {
    values: FormValues;
    setValues: (value: Partial<FormValues>) => void;
}

export const FormContext = createContext<FormContextProps>({
    values: initialValues,
    setValues: () => { },
});

interface FormContextProps {
    values: FormValues;
    setValues: (newValues: Partial<FormValues>) => void;
}

interface FormProviderProps {
    children: React.ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
    const [values, setValues] = useState<FormValues>(initialValues);
    
    const updateValues = (newValues: Partial<FormValues>) => {
        setValues((prevValues: FormValues) => ({ ...prevValues, ...newValues } as FormValues));
    };

    return (
        <FormContext.Provider value={{ values, setValues: updateValues }}>
            {children}
        </FormContext.Provider>
    );
};
