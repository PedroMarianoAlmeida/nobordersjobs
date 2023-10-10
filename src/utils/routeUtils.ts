import { ReactNode } from "react";

type ChildType = React.ReactElement & {
  props: { childProp: { segment: string } };
};
export const getCurrentPath = (children: ReactNode) => {
  const child = children as ChildType;
  const currentPath = child.props.childProp.segment;
  return currentPath;
};
