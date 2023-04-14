import { FormProvider } from '../componants/FormContext';
import MultiStepForm from '../componants/MultiStepForm';

const FormPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl mb-4">Data Migration</h1>
      <FormProvider>
        <MultiStepForm />
      </FormProvider>
    </div>
  );
};

export default FormPage;