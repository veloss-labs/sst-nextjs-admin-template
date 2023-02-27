import React, { useCallback, useMemo, useState } from 'react';
import { Breadcrumb } from 'antd';
import AdminLayout from '~/components/admin/AdminLayout';
import { useRouter } from 'next/router';
import ManagerDetailForm from '~/components/manager/ManagerDetailForm';
import ManagerEditForm from '~/components/manager/ManagerEditForm';

export default function DetailPage() {
  const router = useRouter();

  const idx = useMemo(() => {
    const _id = router.query.id;
    if (!_id) return null;
    const _num = Number(_id);
    if (Number.isNaN(_num)) return null;
    return _num;
  }, [router.query]);

  const [isUpdate, setUpdate] = useState(false);

  const data = {
    name: '홍길동',
    email: 'sst@email.com',
    company: '어딘가 회사',
    department: '개발팀',
    memo: '안녕하세요',
  };

  const onChangeUpdate = useCallback((update: boolean) => {
    setUpdate(update);
  }, []);

  if (isUpdate) {
    return (
      <ManagerEditForm
        isUpdate={isUpdate}
        data={data}
        onChangeUpdate={onChangeUpdate}
      />
    );
  }

  return <ManagerDetailForm data={data} onChangeUpdate={onChangeUpdate} />;
}

DetailPage.getLayout = function GetLayout(page: React.ReactNode) {
  return (
    <AdminLayout
      pageHeader={
        <>
          <div className="py-7 px-5 sm:px-10">
            <Breadcrumb>
              <Breadcrumb.Item>홈</Breadcrumb.Item>
              <Breadcrumb.Item>담당자 관리</Breadcrumb.Item>
              <Breadcrumb.Item>담당자 목록</Breadcrumb.Item>
              <Breadcrumb.Item>담당자 상세</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </>
      }
    >
      {page}
    </AdminLayout>
  );
};
