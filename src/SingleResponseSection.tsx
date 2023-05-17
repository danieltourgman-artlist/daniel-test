import React from "react";
import { ApiKeyHelper } from "./ApiKeyHelper";
import _ from "lodash";

const SingleResponseSection: React.FC = () => {
  const [answer, setAnswer] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const prompt = ApiKeyHelper.getKey();

  const handleClickSend = async () => {
    setAnswer("");
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3037/v1/curator/ideas?query=${prompt}`,
        {
          method: "GET",
        }
      );

      console.log("response");
      console.log("response", response);
      const data = await response.json();
      console.log("data", data);
      console.log("data.data", data.data);
      console.log("data.success", data.success);

      if (!response.ok) {
        console.error(`Error: ${response.statusText}`);
        return;
      }
      console.log(data);
      setAnswer(_.toString(data.data));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-2 flex flex-col gap-1">
      <h2 className="text-xl">Single Response</h2>
      <div>
        <p>Prompt: </p>
        <p className="pl-8">{prompt}</p>
        <div className="py-2">
          <button
            className="rounded-md bg-sky-500/100 disabled:opacity-75 px-2 py-1"
            onClick={handleClickSend}
            disabled={isLoading}
          >
            Send to OpenAI
          </button>
        </div>
        {answer && (
          <>
            <p>Answer: </p>
            <p className="pl-8">{answer}</p>
          </>
        )}
      </div>
    </section>
  );
};

export default SingleResponseSection;
