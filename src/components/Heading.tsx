import type { ReactNode } from "react";
import React from "react";

import st from '../css/tailwind.module.css'

export interface BaseTextProps {
  className?: string;
  children: ReactNode;
}


let Heading = ({ className, children }: BaseTextProps) => {
  return (
    <div className={`${className || ""} ${st['font-bold']} ${st['text-green-900']}`}>{children}</div>
  )
}

export default Heading