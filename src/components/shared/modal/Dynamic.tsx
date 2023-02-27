import dynamic from 'next/dynamic';

export const UpdatePasswordModal = dynamic(
  () => import('./UpdatePasswordModal'),
  { ssr: false },
);
