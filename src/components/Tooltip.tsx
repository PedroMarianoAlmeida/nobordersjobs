import { ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
}

const Tooltip = ({ children, content }: TooltipProps) => (
  <div className="relative">
    <span className="hover-trigger">{children}</span>
    <div className="absolute hidden hover-target bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-gray-100 text-gray-900 text-sm rounded-md p-2 whitespace-nowrap">
      {content}
    </div>
  </div>
);

export default Tooltip;
