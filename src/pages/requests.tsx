import MultiStepForm from '../componants/multistepform';
import Step1 from '../componants/step1';
import Step2 from '../componants/step2';

const steps = [
  { label: 'Step 1', component: Step1 },
  { label: 'Step 2', component: Step2 },
];

const Home: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Multi-Step Form</h1>
      <MultiStepForm steps={steps} />
    </div>
  );
};

export default Home;