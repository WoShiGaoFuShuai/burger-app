import { TIconTypes } from "@/components/header/types.header";

export interface HeaderItemProps {
  icon: React.ElementType<{ type: TIconTypes }>;
  iconType: TIconTypes;
  text: string;
  inactiveClass?: string;
}
