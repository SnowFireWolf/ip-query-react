import type { ReactNode } from "react";
import React from "react";

import st from '../css/tailwind.module.css'



export interface BaseCardProps {
  className?: string,
  children: ReactNode;
}



let Card = ({ className, children }: BaseCardProps) => {
  return (
    <div className={`${st['mt-10']} ${st['p-3']} ${st['border']} ${st['bg-white']} ${st['rounded-xl']} ${st['shadow-xl']} ${
      className || ""
    }`}>
      <div className={`${st['px-4']} ${st['py-5']}`}>
        {children}
      </div>
    </div>
  )
}



export default Card