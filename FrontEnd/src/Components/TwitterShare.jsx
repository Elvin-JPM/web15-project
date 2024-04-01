import React from "react";
import Button from "./ui/Button";

function TwitterShareButton({ url, text }) {
  const handleClick = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, "_blank", "width=600,height=400");
  };

  return <Button onClick={handleClick}>Share on Twitter</Button>;
}

export default TwitterShareButton;
