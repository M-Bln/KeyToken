import React, { useState } from 'react';

type StepProps = {
  title: string;
  children: React.ReactNode;
};

const Step: React.FC<StepProps> = ({ title, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="border-2 border-secondary-light rounded-lg shadow-sm mb-12 focus:border-secondary-light">
      <button
        onClick={toggleCollapse}
        className="w-full text-left px-4 py-2 bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-primary-light rounded-md"
      >
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-secondary-light">
            {title}
          </span>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              isCollapsed ? '' : 'rotate-180'
            } text-primary-light`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </button>
      <div
        className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
          isCollapsed ? 'max-h-0' : 'max-h-screen'
        }`}
      >
        <div className="px-4 py-2 bg-primary-light">{children}</div>
      </div>
    </div>
  );
};

export default Step;
