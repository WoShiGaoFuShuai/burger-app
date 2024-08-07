import { MutableRefObject } from "react";

export const scrollTabHandler = (
  ref: MutableRefObject<HTMLDivElement | null>
) => {
  ref.current?.scrollIntoView({ behavior: "smooth" });
  return;
};
