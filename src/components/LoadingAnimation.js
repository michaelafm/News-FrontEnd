import React from "react";
import { Spinner } from "grommet";

const LoadingAnimation = () => {
  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: animationData,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice"
  //   }
  // };

  return (
    <div className="LoadingAnimation">
      <Spinner
      size="xlarge"
        />
    </div>
  );
};

export default LoadingAnimation;
