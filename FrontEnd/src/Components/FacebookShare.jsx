import React from "react";
import Button from "./ui/Button";

function FacebookShareButton({ url }) {
  const handleClick = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
  };

  return <Button onClick={handleClick}>Share on Facebook</Button>;
}

export default FacebookShareButton;
