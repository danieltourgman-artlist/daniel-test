import { useState } from "react";
import ReactPlayer from "react-player";

interface DataObject {
  id: string;
  assetType: string;
  name: string;
  playableFileUrl: string;
  thumbnailUrl: string;
}

export interface BoxDataObject {
  title: string;
  assets: DataObject[];
}

interface BoxProps {
  data: BoxDataObject;
}

export const Box: React.FC<BoxProps> = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseOver = () => {
    setIsPlaying(true);
  };

  const handleMouseOut = () => {
    setIsPlaying(false);
  };

  return (
    <div className="border border-gray-400 rounded-md">
      <div className="flex flex-col gap-2">
        <h3
          className="text-lg font-bold text-center mb-4"
          style={{ marginRight: "10px" }}
        >
          {data.title}
        </h3>

        <div className="flex flex-nowrap overflow-x-auto gap-2 p-2">
          {data.assets.map((asset: DataObject) => (
            <div
              key={asset.id}
              className="bg-white rounded-md shadow-md flex-shrink-0"
            >
              {asset.assetType === "song" || asset.assetType === "sfx" ? (
                <div className="musiccontainer">
                  <img
                    src={asset.thumbnailUrl}
                    alt={asset.name}
                    width="200"
                    height="150"
                  />
                  <audio controls style={{ width: "200px" }}>
                    <source src={asset.playableFileUrl} type="audio/wav" />
                  </audio>
                </div>
              ) : (
                <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                  <ReactPlayer
                    url={asset.playableFileUrl}
                    controls={true}
                    playing={isPlaying}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
