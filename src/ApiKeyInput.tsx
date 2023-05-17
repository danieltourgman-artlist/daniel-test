import React from "react";

interface PromptInputProps {
  onInputChange: (value: string) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({ onInputChange }) => {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value.trim();
    onInputChange(value);
  };

  return <input type="text" onChange={handleChange} className="w-full" />;
};

export default PromptInput;
