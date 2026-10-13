import type { SVGProps } from 'react';

type IconName =
  | 'calendar'
  | 'book'
  | 'check'
  | 'plus'
  | 'trash'
  | 'clock'
  | 'flag'
  | 'grid'
  | 'edit'
  | 'search'
  | 'close'
  | 'sun'
  | 'moon'
  | 'chevron';

const paths: Record<IconName, string> = {
  edit: 'm16 3 5 5M4 16 16 4a3.5 3.5 0 0 1 5 5L9 21H3z',
  search: 'm21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  close: 'm6 6 12 12M6 18 18 6',
  sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5M17 12a5 5 0 1 1-10 0 5 5 0 0 1 10 0',
  moon: 'M21 13A9 9 0 0 1 11 3a9 9 0 1 0 10 10',
  chevron: 'm6 9 6 6 6-6',
  calendar:
    'M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2',
  book: 'M4 3h6a3 3 0 0 1 3 3v15a4 4 0 0 0-4-2H3V4a1 1 0 0 1 1-1m9 3a3 3 0 0 1 3-3h5v16h-4a4 4 0 0 0-4 2',
  check: 'm5 12 4 4L19 6',
  plus: 'M12 5v14M5 12h14',
  trash: 'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7m4-7v7',
  clock: 'M12 8v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  flag: 'M5 21V3m0 1c5-4 9 4 14 0v10c-5 4-9-4-14 0',
  grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
}

export function Icon({ name, ...props }: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
