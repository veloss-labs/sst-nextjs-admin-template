import React from 'react';
import AdminLayout from '~/components/admin/AdminLayout';

export default function Notices() {
  return <>Notices</>;
}

Notices.getLayout = function GetLayout(page: React.ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};
