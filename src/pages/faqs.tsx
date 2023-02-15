import React from 'react';
import AdminLayout from '~/components/admin/AdminLayout';

export default function Faqs() {
  return <>Faqs</>;
}

Faqs.getLayout = function GetLayout(page: React.ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};
