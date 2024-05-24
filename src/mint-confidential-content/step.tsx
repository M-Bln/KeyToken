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
    <div className="border rounded-md shadow-sm mb-4">
      <button
        onClick={toggleCollapse}
        className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100 rounded-md"
      >
        <div className="flex justify-between items-center">
          <span className="text-lg font-medium text-gray-700">{title}</span>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              isCollapsed ? '' : 'rotate-180'
            }`}
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
        <div className="px-4 py-2">{children}</div>
      </div>
    </div>
  );
};

export default Step;

// import React, { useState } from 'react';

// type StepProps = {
//   title: string;
//   children: React.ReactNode;
// };

// const Step = ({ title, children }: StepProps) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="inner-div">
//       <h2 className="h2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
//         {title} {isOpen ? '^' : 'v'}
//       </h2>
//       {isOpen && (
//         <div className="transition-all duration-500 ease-in-out">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Step;
