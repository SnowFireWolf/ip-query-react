import React from "react";
import styled from "@/windboxes";
import useSxSupport from "@/hooks/useSxSupport";
import { MdError } from 'react-icons/md';



// const styles = {
//   base: styled('border bg-rose-100 rounded-xl py-5 px-5'),
//   header: styled('flex flex-row text-rose-800 items-center'),
//   icon: styled('text-xl flex'),
//   title: styled('pl-2 text-lg d-flex'),
//   message: styled('mt-2 text-lg text-rose-600')
// };
const styles = {
  base: styled('bg-red-100 rounded-xl py-5 px-5'),
  header: styled('flex flex-row text-red-700 items-center'),
  icon: styled('text-xl flex'),
  title: styled('pl-2 text-lg d-flex'),
  message: styled('mt-2 text-lg text-red-500')
};



interface BaseProps {
  message?: string;
  sx: string;
}



export default function ErrorCard({
  message,
  sx
}: BaseProps) {
  const classnames = useSxSupport(styles.base, sx);

  return (
    <div className={classnames}>
      <div className={styles.header}>
        <MdError className={styles.icon} />
        <div className={styles.title}>
          IP 資訊查詢失敗
        </div>
      </div>

      <p className={styles.message}>{message}</p>
    </div>
  );
}
