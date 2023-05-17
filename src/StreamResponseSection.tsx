import React from "react";
import { Box, BoxDataObject } from "./AssetGroupComponent";

interface DataObject {
  id: string;
  assetType: string;
  name: string;
  playableFileUrl: string;
  thumbnailUrl: string;
}

interface StreamResponseSectionProps {
  prompt: string;
}

const StreamResponseSection: React.FC<StreamResponseSectionProps> = ({
  prompt,
}) => {
  const [footageBoxes, setFootageBoxes] = React.useState<BoxDataObject[]>([]);
  const [musicBoxes, setMusicBoxes] = React.useState<BoxDataObject[]>([]);
  const [sfxBoxes, setSfxBoxes] = React.useState<BoxDataObject[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showClearButton, setShowClearButton] = React.useState(false);

  const handleClickClear = () => {
    setShowClearButton(false);
    setFootageBoxes([]);
    setMusicBoxes([]);
    setSfxBoxes([]);
  };

  const handleClickSend = async () => {
    setIsLoading(true);
    setShowClearButton(false);

    try {
      const response = await fetch(
        `http://localhost:3037/v1/curator/stream-ideas?query=${prompt}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        console.error(`Error: ${response.statusText}`);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        console.error("Error: fail to read data from response");
        return;
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        const textDecoder = new TextDecoder("utf-8");
        const chunk = textDecoder.decode(value);
        const obj = JSON.parse(chunk);
        const title = obj.title;
        const assets: DataObject[] = obj.assets;
        const assetType = obj.assetType;
        console.log("title", title);
        console.log("assets", assets);
        // obj is an array of json objects where each object is json in the format of
        // { "id": "123", "assetType": "footage", "name": "some name" , "playableFileUrl": "some url" , "thumbnailUrl": "some url" }
        //check the asset type
        if (assetType == "footage") {
          setFootageBoxes((prev) => prev.concat({ title, assets }));
        } else if (assetType == "music") {
          setMusicBoxes((prev) => prev.concat({ title, assets }));
        } else {
          setSfxBoxes((prev) => prev.concat({ title, assets }));
        }
        // setBoxes((prev) => prev.concat({ title, assets }));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
      setShowClearButton(true);
    }
  };

  const isPromptEmpty = prompt.trim() === "";

  return (
    <section className="py-2 flex flex-col gap-1">
      <div>
        <div className="flex justify-between">
          <div className="py-2 flex gap-4">
            <button
              className="rounded-md bg-sky-500/100 disabled:opacity-75 px-2 py-1"
              onClick={handleClickSend}
              disabled={isLoading || isPromptEmpty}
            >
              Send to Personal Curator
            </button>
            {showClearButton && (
              <button
                className="ml-2 rounded-md bg-red-500/100 px-2 py-1"
                onClick={handleClickClear}
              >
                Clear result
              </button>
            )}
          </div>{" "}
        </div>{" "}
        <section className="py-2 flex flex-col gap-4">
          {footageBoxes.length > 0 && (
            <>
              <h2 className="text-2xl">Footage</h2>
              <div className="max-w-full mx-4 grid grid-cols-3 gap-4">
                {footageBoxes.map((box) => (
                  <Box key={box.title} data={box} />
                ))}
              </div>{" "}
            </>
          )}
          {musicBoxes.length > 0 && (
            <>
              <h2 className="text-2xl">Music</h2>
              <div className="max-w-full mx-4 grid grid-cols-3 gap-4">
                {musicBoxes.map((box) => (
                  <Box key={box.title} data={box} />
                ))}
              </div>{" "}
            </>
          )}
          {sfxBoxes.length > 0 && (
            <>
              <h2 className="text-2xl">Sound Effects</h2>
              <div className="max-w-full mx-4 grid grid-cols-3 gap-4">
                {sfxBoxes.map((box) => (
                  <Box key={box.title} data={box} />
                ))}
              </div>{" "}
            </>
          )}
        </section>
      </div>
    </section>
  );
};

export default StreamResponseSection;
