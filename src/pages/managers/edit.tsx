import React from 'react';
import { Breadcrumb, Button } from 'antd';
import AdminLayout from '~/components/admin/AdminLayout';
import { useRouter } from 'next/router';
import { ArrowLeftOutlined } from '@ant-design/icons';

export default function EditPage() {
  const router = useRouter();
  return (
    <div>
      <Button
        htmlType="button"
        type="text"
        size="small"
        icon={<ArrowLeftOutlined />}
      >
        Back
      </Button>
    </div>
  );
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
