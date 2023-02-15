import React from 'react';
import AdminLayout from '~/components/admin/AdminLayout';

export default function Inquiries() {
  return <>Inquiries</>;
}

Inquiries.getLayout = function GetLayout(page: React.ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};
