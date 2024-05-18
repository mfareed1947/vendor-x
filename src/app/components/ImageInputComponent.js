import React, { useState } from "react";

const ImageInputComponent = () => {
  const [imageUrl, setImageUrl] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Enter image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
    </div>
  );
};

export default ImageInputComponent;
