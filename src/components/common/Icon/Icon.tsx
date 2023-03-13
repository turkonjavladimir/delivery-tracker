import { Fragment } from "react";

import { useIcons } from "../../../lib/hooks/useIcons";

export type IconName =
  | "arrowPathRoundedSquare"
  | "bell"
  | "bellSlash"
  | "bookmark"
  | "check"
  | "checkBadge"
  | "chatBubbleOvalLeft"
  | "chatBubbleOvalLeftEllipsis"
  | "ellipsisHorizontal"
  | "envelope"
  | "flag"
  | "heart"
  | "home"
  | "info"
  | "lockClosed"
  | "magnifyingGlass"
  | "noSymbol"
  | "pencilSquare"
  | "plusCircle"
  | "queueList"
  | "share"
  | "trash"
  | "user"
  | "xCircle"
  | "x"
  | "moonIcon";

interface IconProps {
  name: IconName;
  variant?: "outline" | "solid";
  className?: string;
}

const Icon = ({
  name,
  variant = "outline",
  className = "",
  ...props
}: IconProps) => {
  const icons = useIcons();
  const IconComponent = icons[name]?.[variant] || Fragment;

  return <IconComponent className={`${className}`} {...props} />;
};

export default Icon;
