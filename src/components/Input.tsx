import React from "react";

import st from '../css/tailwind.module.css'


export interface BaseInputProps {
  id?: string;
  name: string;
  value?: string;
  placeholder?: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
}


let Input = ({
  id,
  name,
  value,
  placeholder,
  onChange,
}: BaseInputProps) => {
  return (
    <input
    className={`${st['mt-3']} ${st['focus:ring-indigo-500']} ${st['focus:border-indigo-500']} ${st['block']} ${st['w-full']} ${st['shadow-sm']} ${st['sm:text-sm']} ${st['border-gray-300']} ${st['rounded-md']}`}
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



export default Input