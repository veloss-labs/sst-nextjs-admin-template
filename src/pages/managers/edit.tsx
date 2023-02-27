import React from 'react';
import { Breadcrumb } from 'antd';
import { useRouter } from 'next/router';
import AdminLayout from '~/components/admin/AdminLayout';
import ManagerEditForm from '~/components/manager/ManagerEditForm';

export default function EditPage() {
  const router = useRouter();
  return <ManagerEditForm />;
}

EditPage.getLayout = function GetLayout(page: React.ReactNode) {
  return (
    <AdminLayout
      pageHeader={
        <>
          <div className="py-7 px-5 sm:px-10">
            <Breadcrumb>
              <Breadcrumb.Item>홈</Breadcrumb.Item>
              <Breadcrumb.Item>담당자 관리</Breadcrumb.Item>
              <Breadcrumb.Item>담당자 목록</Breadcrumb.Item>
              <Breadcrumb.Item>담당자 등록</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </>
      }
    >
      {page}
    </AdminLayout>
  );
};
