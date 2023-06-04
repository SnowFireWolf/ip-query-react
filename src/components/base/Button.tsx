import type { ButtonHTMLAttributes, ReactNode } from "react";
import React from "react";
import styled from "@/windboxes";
import useSxSupport from "@/hooks/useSxSupport";



export interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement | HTMLElement> {
  children: ReactNode;
  submit?: boolean;
  sx?: string;
}



const baseStyle = styled('w-full flex flex-row justify-center items-center p-3 bg-indigo-900 text-white rounded-lg shadow-lg focus:outline-none active:bg-indigo-800 disabled:opacity-80');



export default function Button({
  className,
  children,
  submit = false,
  sx,
  ...props
}: BaseButtonProps) {
  const classnames = useSxSupport(baseStyle, sx);

  return (
    <button
      className={classnames}
      type={submit ? "submit" : "button"}
      {...props}
    >
      {children}
    </button>
  );
}
