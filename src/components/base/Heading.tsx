import type { ReactNode } from "react";
import React from "react";
import styled from "@/windboxes";
import useSxSupport from "@/hooks/useSxSupport";



export interface BaseTextProps {
  className?: string;
  children: ReactNode;
  sx?: string;
}



const headingClasses = styled('font-bold text-green-900');



export default function Heading({ sx, ...props }: BaseTextProps) {
  const classnames = useSxSupport(headingClasses, sx);
  return <div className={classnames} {...props} />
}
