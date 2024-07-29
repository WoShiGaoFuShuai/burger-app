import React from "react";
import { BallTriangle } from "react-loader-spinner";
import { createPortal } from "react-dom";
import cl from "./loader.module.css";

const rootElement = document.getElementById("root");

type textTypes = "small" | "medium" | "large" | "default";
interface LoaderProps {
  text?: string;
  textColor?: string;
  textType?: textTypes;
}
const dots = "...";

const Loader: React.FC<LoaderProps> = ({
  text,
  textColor = "white",
  textType = "medium",
}) => {
  if (!rootElement)
    throw new Error('The element with ID "root" was not found in the DOM.');

  return createPortal(
    <div className={cl.wrapper}>
      <div className={cl.content}>
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="var(--accent)"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
        {text && (
          <p
            className={`text text_type_main-${textType}`}
            style={{ color: textColor }}
          >
            {text}
            {dots}
          </p>
        )}
      </div>
    </div>,
    rootElement
  );
};

export default Loader;
