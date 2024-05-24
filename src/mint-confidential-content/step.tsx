import React, { useState } from 'react';

type StepProps = {
  title: string;
  children: React.ReactNode;
};

const Step = ({ title, children }: StepProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="inner-div">
      <h2 className="h2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {title} {isOpen ? '^' : 'v'}
      </h2>
      {isOpen && (
        <div className="transition-all duration-500 ease-in-out">
          {children}
        </div>
      )}
    </div>
  );
};

export default Step;
