import React from 'react';
import AdminLayout from '~/components/admin/AdminLayout';

export default function Members() {
  return <>Members</>;
}

Members.getLayout = function GetLayout(page: React.ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};
