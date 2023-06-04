import type { ReactNode } from "react";
import React from "react";
import styled from "@/windboxes";



export interface BaseTextProps {
  children: ReactNode;
}



const basesStyle = styled('text-2xl text-red-800 font-bold');



export default function TextDetails({ children }: BaseTextProps) {
  return (
    <div className={basesStyle}>{children}</div>
  );
}
