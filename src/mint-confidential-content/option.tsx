import React from 'react';

type OptionProps = {
  title: string;
  children: React.ReactNode;
};

const Option: React.FC<OptionProps> = ({ title, children }) => {
  return (
    <div className="pl-6 mb-4">
      <h3 className="text-lg font-medium text-gray-700 mb-2 border-b border-gray-300 pb-2">
        {title}
      </h3>
      <div className="mt-2">{children}</div>
    </div>
  );
};

export default Option;
