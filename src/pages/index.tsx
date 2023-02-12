import React from 'react';
import AdminLayout from '~/components/admin/AdminLayout';

export default function Home() {
  return <>Home</>;
}

Home.getLayout = function GetLayout(page: React.ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};
