import React, { useState } from "react";
import {
  AboutCompany,
  AboutSelf,
  VerifyEmail,
  CreatePassword,
  Register,
} from "@components/Authentication";

const RegisterFlow = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div>
      {currentStep === 1 && <Register onNext={handleNextStep} />}
      {currentStep === 2 && (
        <CreatePassword
          onNext={handleNextStep}
          onBack={handlePreviousStep}
          currentStep={currentStep}
        />
      )}
      {currentStep === 3 && (
        <VerifyEmail
          onNext={handleNextStep}
          onBack={handlePreviousStep}
          currentStep={currentStep}
        />
      )}
      {currentStep === 4 && (
        <AboutSelf
          onNext={handleNextStep}
          onBack={handlePreviousStep}
          currentStep={currentStep}
        />
      )}
      {currentStep === 5 && (
        <AboutCompany
          onNext={handleNextStep}
          onBack={handlePreviousStep}
          currentStep={currentStep}
        />
      )}
    </div>
  );
};

export default RegisterFlow;
