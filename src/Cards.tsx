import React from "react";

type CardProps = {
  id: string;
  assetType: string;
  name: string;
  playableFileUrl: string;
  thumbnailUrl: string;
};

const Card: React.FC<CardProps> = ({
  id,
  assetType,
  name,
  playableFileUrl,
  thumbnailUrl,
}) => {
  return (
    <div className="border rounded-md p-2 mb-2">
      <div>ID: {id}</div>
      <div>Asset Type: {assetType}</div>
      <div>Name: {name}</div>
      <div>Playable File URL: {playableFileUrl}</div>
      <div>Thumbnail URL: {thumbnailUrl}</div>
    </div>
  );
};

export default Card;
