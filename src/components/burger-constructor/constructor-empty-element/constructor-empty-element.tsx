import React from "react";
import cl from "./constructor-empty-element.module.css";

interface EmptyBunProps {
  type: "top" | "bottom" | "middle";
}

const EmptyBun: React.FC<EmptyBunProps> = ({ type }) => {
  const borderRadius =
    type === "top"
      ? "88px 88px 40px 40px"
      : type === "bottom"
      ? "40px 40px 88px 88px"
      : "40px";

  return (
    <div className={cl.empty_bun} style={{ borderRadius }}>
      {type === "middle" ? (
        <p className="text text_type_main-small">Добавьте начинку и соус</p>
      ) : (
        <p className="text text_type_main-small">Добавьте булочку</p>
      )}
    </div>
  );
};

export default EmptyBun;
