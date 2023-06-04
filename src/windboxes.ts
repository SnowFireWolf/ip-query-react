import windboxes, { cleanTemplate } from '@windboxes/core';
import tailwind from '@/styles/tailwind.module.css';



export default function styled(classes: string | string[], ...restClass: string[]) {
  let merged: string[];

  if(typeof classes === 'string') {
    const classArray = cleanTemplate([classes]);
    const restClassArray = cleanTemplate(restClass);
    merged = classArray.concat(restClassArray);
  } else {
    merged = classes.concat(restClass);
  }

  return windboxes(merged, tailwind);
}
