import type { ButtonHTMLAttributes, ReactNode } from "react";
import React from "react";
import styled from "@/windboxes";



export interface BaseBoxProps {
  sx: string;
  children?: ReactNode,
}



export default function Box({
  sx,
  ...props
}: BaseBoxProps) {
  const classnames = styled(sx);

  return (
    <div
      className={classnames}
      {...props}
    />
  );
}
