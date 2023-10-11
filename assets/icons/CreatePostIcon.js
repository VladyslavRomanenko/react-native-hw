import React from "react";
import Svg, { Path, Circle, G, Rect, Defs, ClipPath } from "react-native-svg";

const CreatePostIcon = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <Path
        fill-rule="evenodd"
        d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
      ></Path>
    </Svg>
  );
};

export default CreatePostIcon;
