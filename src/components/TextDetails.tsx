import type { ReactNode } from "react";
import React from "react";

import st from '../css/tailwind.module.css'

export interface BaseTextProps {
  className?: string;
  children: ReactNode;
}


let TextDetails = ({ className, children }: BaseTextProps) => {
  return (
    <div className={`${className || ""} ${st['text-2xl']} ${st['text-red-800']} ${st['font-bold']}`}>{children}</div>
  )
}

export default TextDetails