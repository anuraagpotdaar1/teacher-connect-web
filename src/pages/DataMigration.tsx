import { FormProvider } from "../componants/FormContext";
import MultiStepForm from "../componants/multistepform";
import withAuth from "./hoc/withAuth";

const FormPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl text-indigo-800 font-bold mb-4">
        Data Migration
      </h1>
      <FormProvider>
        <MultiStepForm />
      </FormProvider>
    </div>
  );
};

export default withAuth(FormPage);
