import React from 'react';
import cx from 'classnames';

// components
import { Avatar, Button, Divider, Layout, theme } from 'antd';
import ChevronLeftIcon from '@heroicons/react/24/outline/ChevronLeftIcon';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';
import Profile from '~/components/admin/Profile';
import RoutesMenu from '~/components/admin/RoutesMenu';

// hooks
import { useLayoutContext } from '~/store/useLayoutStore';

import type { UrlRoutes } from '~/ts/common';

interface SidebarProps {
  pageTransition: (url: UrlRoutes) => Promise<void>;
}

function Sidebar({ pageTransition }: SidebarProps) {
  const { isShowSidebar, toggleSidebar } = useLayoutContext((state) => ({
    isShowSidebar: state.isShowSidebar,
    toggleSidebar: state.toggleSidebar,
  }));

  const { token } = theme.useToken();

  return (
    <Layout.Sider
      className={cx('hidden sidebar overflow-y-scroll', {
        'sm:block': isShowSidebar,
        hidden: !isShowSidebar,
      })}
    >
      <div className="flex flex-col h-full">
        <div className="flex">
          <div className="shrink-0">
            <Avatar
              shape="square"
              size={46}
              style={{ backgroundColor: token.colorPrimary }}
            >
              P
            </Avatar>
          </div>
          <div className="ml-1 grow">
            <Profile />
          </div>
        </div>
        <Divider orientation="left">
          <span className="text-sm">메뉴</span>
        </Divider>
        <div className="overflow-auto grow">
          <RoutesMenu pageTransition={pageTransition} />
        </div>
        <div>
          <div className="flex justify-end absolute bottom-0 right-0 m-3">
            <Button
              type="text"
              className="!flex items-center justify-center"
              htmlType="button"
              onClick={toggleSidebar}
            >
              <ChevronLeftIcon className="w-3 h-3" />
              <Bars3Icon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </Layout.Sider>
  );
}

export default React.memo(Sidebar);
