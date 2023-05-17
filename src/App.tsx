import React from "react";
import "./styles.css";

import PromptKeySection from "./ApiKeySection";

const App: React.FC = () => {
  return (
    <div className="h-full">
      <h1 className="text-3xl">Personal Curator</h1>
      <hr />
      <PromptKeySection />
      <hr />
    </div>
  );
};

export default App;
