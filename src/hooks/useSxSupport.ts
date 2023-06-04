import styled from "@/windboxes";



function mergedSx(style: string, sx: string) {
  const processedSx = styled(sx);
  return style + ' ' + processedSx;
}

export default function useSxSupport(baseStyle: string, sx?: string) {
  return sx !== undefined ? mergedSx(baseStyle, sx) : baseStyle;
}
