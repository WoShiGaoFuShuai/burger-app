import React from "react";
import cl from "./constructor-empty-element.module.css";

interface EmptyBunProps {
  type: "top" | "bottom" | "middle";
  elementType: string;
}

const EmptyBun: React.FC<EmptyBunProps> = ({ type, elementType }) => {
  const borderRadius =
    type === "top"
      ? "88px 88px 40px 40px"
      : type === "bottom"
      ? "40px 40px 88px 88px"
      : "40px";

  // check if dragged item is a bun and EmtpyBun = top/bottom - outline
  let outline = "";
  if (elementType === "bun" && type !== "middle") {
    outline = "1px solid var(--accent)";
  }
  // if the item is not a bun && type is middle
  else if (elementType !== "bun" && elementType !== "" && type === "middle") {
    outline = "1px solid var(--accent)";
  }

  return (
    <div className={cl.empty_bun} style={{ borderRadius, outline }}>
      {type === "middle" ? (
        <p className="text text_type_main-small">Добавьте начинку и соус</p>
      ) : (
        <p className="text text_type_main-small">Добавьте булочку</p>
      )}
    </div>
  );
};

export default EmptyBun;
