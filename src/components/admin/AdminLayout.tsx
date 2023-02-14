import React, { useCallback } from 'react';

// components
import { Avatar, Button, Typography } from 'antd';
import Sidebar from '~/components/admin/Sidebar';
import MobileMenu from '~/components/admin/MobileMenu';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';

// hooks
import { useLayoutContext } from '~/store/useLayoutStore';

interface AdminLayoutProps {
  children: React.ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps) {
  const { togglePopupMenu } = useLayoutContext((state) => state);

  const onTogglePopupMenu = useCallback(() => {
    togglePopupMenu();
  }, [togglePopupMenu]);

  return (
    <div>
      <Sidebar />
      <div className="mobile-header">
        <div className="flex items-center">
          <Avatar
            shape="square"
            size={36}
            style={{ backgroundColor: '#1abc9c' }}
          >
            P
          </Avatar>
          <Typography.Title className="!mb-0 !mt-0 ml-3" level={4}>
            Admin UI
          </Typography.Title>
        </div>
        <div>
          <Button
            type="text"
            className="!flex items-center justify-center"
            htmlType="button"
            onClick={onTogglePopupMenu}
          >
            <Bars3Icon className="w-8 h-8" />
          </Button>
        </div>
      </div>
      <MobileMenu />
      <div className="sm:h-full sm:overflow-auto sm:ml-72">{children}</div>
    </div>
  );
}

export default AdminLayout;
