import React from 'react';
import st from '../css/tailwind.module.css'


let Footer = () => {
  return (
    <div className={st['mt-5']}>
      <div className={st['py-5']}>
        <div className={`${st['border-t']} ${st['border-gray-200']}`}></div>
      </div>
      <div className={`${st['py-3-safe']} ${st['text-xs']} ${st['text-gray-400']} ${st['text-center']}`}>
        <p>Kevin Zheng © 2021.</p>
      </div>
    </div>
  )
}



export default Footer