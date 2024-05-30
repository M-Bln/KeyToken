import React from 'react';

type OptionProps = {
  title: string;
  children: React.ReactNode;
};

const Option: React.FC<OptionProps> = ({ title, children }) => {
  return (
    <div className="pl-6 mb-4">
      <h3 className="text-lg font-bold text-primary-dark mb-2 border-b-2 border-neutral-dark pb-2">
        {title}
      </h3>
      <div className="mt-2">{children}</div>
    </div>
  );
};

export default Option;
