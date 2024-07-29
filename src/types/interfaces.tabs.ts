export interface TabValue {
  name: string;
  value: string;
}

export interface TabsRenderProps {
  tabs: TabValue[];
  current: string;
  setCurrent: (value: string) => void;
}
