import React from "react";
function FacebookShareButton({ url, children }) {
  const handleClick = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
  };

  return <div onClick={handleClick}>{children}</div>;
}

export default FacebookShareButton;
