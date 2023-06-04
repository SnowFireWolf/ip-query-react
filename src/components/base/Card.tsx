import type { ReactNode } from "react";
import React from "react";
import useSxSupport from "@/hooks/useSxSupport";
import styled from "@/windboxes";



export interface BaseCardProps {
  className?: string,
  children: ReactNode;
  sx?: string;
}



const baseStyle = styled('mt-10 border bg-white rounded-xl shadow-xl');
const containerStyle = styled('px-8 py-7');



export default function Card({
  className,
  children,
  sx,
  ...props
}: BaseCardProps) {
  const classnames = useSxSupport(baseStyle, sx);

  return (
    <div className={classnames} {...props}>
      <div className={containerStyle}>
        {children}
      </div>
    </div>
  );
}
