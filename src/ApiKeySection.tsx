import { useState } from "react";
import PromptInput from "./ApiKeyInput";
import StreamResponseSection from "./StreamResponseSection";

const PromptSection: React.FC = () => {
  const [apiKey, setApiKey] = useState("");

  const handleInputChange = (value: string) => {
    setApiKey(value);
  };

  return (
    <section className="py-2 flex flex-col gap-1">
      <h2 className="text">Describe your project:</h2>
      <p>
        <PromptInput onInputChange={handleInputChange} />
      </p>
      <div className="flex">
        <div className="flex-1">
          <StreamResponseSection prompt={apiKey} />
        </div>
      </div>
    </section>
  );
};

export default PromptSection;
