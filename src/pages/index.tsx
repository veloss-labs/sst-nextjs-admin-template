import React from 'react';
import { Breadcrumb } from 'antd';
import AdminLayout from '~/components/admin/AdminLayout';

export default function Home() {
  return <>Home</>;
}

Home.getLayout = function GetLayout(page: React.ReactNode) {
  return (
    <AdminLayout
      pageHeader={
        <div className="pt-7 px-5 sm:px-10">
          <Breadcrumb>
            <Breadcrumb.Item>홈</Breadcrumb.Item>
            <Breadcrumb.Item>대시보드</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      }
    >
      {page}
    </AdminLayout>
  );
};
