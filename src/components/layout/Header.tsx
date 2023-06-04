import React from 'react';
import styled from '@/windboxes';
import logo from '@/assets/logo.png'



const logoClass = styled('mt-5 mx-auto');
const titleClass = styled('mt-10 text-center text-3xl font-bold');



export default function Header() {
  return (
    <>
      { /* logo */}
      <img className={logoClass} src={logo} width="150px;" alt="ip query logo" />

      <div className={titleClass}>IP 位址資訊查詢</div>
    </>
  );
}
