import React, { ChangeEventHandler } from "react";

interface Props {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

const Input: React.FC<Props> = ({ value, onChange, className }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      className={`w-full ${className}`}
    />
  );
};

export default Input;
