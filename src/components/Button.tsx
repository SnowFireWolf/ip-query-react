import type { ButtonHTMLAttributes, ReactNode } from "react";
import React from "react";

import st from '../css/tailwind.module.css'


export interface BaseButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  submit?: boolean;
}


let Button = ({
  className,
  children,
  submit = false,
  ...props
}: BaseButtonProps) => {
  return (
    <button
      className={`${st['mt-5']} ${st['w-full']} ${st['flex']} ${st['flex-row']} ${st['justify-center']} ${st['items-center']} ${st['p-3']} ${st['bg-indigo-900']} ${st['text-white']} ${st['rounded-lg']} ${st['shadow-lg']} ${st['focus:outline-none']} ${st['active:bg-indigo-800']} ${st['disabled:opacity-80']}`}
      type={submit ? "submit" : "button"}
    >
      { children }
    </button>
)
}



export default Button