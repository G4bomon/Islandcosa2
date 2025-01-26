import * as React from "react";

interface TikTokEmbedProps {
  url: string;
}

const TikTokEmbed: React.FC<TikTokEmbedProps> = ({ url }) => {
  const iframeUrl = `https://www.tiktok.com/embed/${url.split("/").pop()}`;

  return (
    <iframe
      src={iframeUrl}
      frameBorder="0"
      allowFullScreen
      width="100%"
      height="500"
      scrolling="no"
    />
  );
};

export default TikTokEmbed;