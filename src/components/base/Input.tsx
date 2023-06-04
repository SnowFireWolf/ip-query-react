import styled from "@/windboxes";
import React from "react";


export interface BaseInputProps {
  id?: string;
  name: string;
  value?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}



const inputClass = styled('mt-3 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md');



export default function Input({
  id,
  name,
  value,
  placeholder,
  onChange,
}: BaseInputProps) {
  return (
    <input
      className={inputClass}
      type="text"
      id={id}
      name={name}
      autoComplete="off"
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  )
}
