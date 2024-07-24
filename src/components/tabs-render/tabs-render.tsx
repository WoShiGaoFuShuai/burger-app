import React from "react";
import cl from "./tabs-render.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { TabsRenderProps } from "@/components/tabs-render/interfaces.tabs-render";

const TabsRender: React.FC<TabsRenderProps> = ({
  tabs,
  current,
  setCurrent,
}) => {
  return (
    <div className={cl.tabs}>
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          value={tab.value}
          active={current === tab.value}
          onClick={() => setCurrent(tab.value)}
        >
          {tab.name}
        </Tab>
      ))}
    </div>
  );
};

export default TabsRender;
