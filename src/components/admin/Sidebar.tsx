import React from 'react';
import cx from 'classnames';

// components
import { Avatar, Button, Divider, Layout } from 'antd';
import ChevronLeftIcon from '@heroicons/react/24/outline/ChevronLeftIcon';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';
import Profile from '~/components/admin/Profile';
import RoutesMenu from '~/components/admin/RoutesMenu';

// hooks
import { useLayoutContext } from '~/store/useLayoutStore';

function Sidebar() {
  const { isShowSidebar, toggleSidebar } = useLayoutContext((state) => state);

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
              style={{ backgroundColor: '#1abc9c' }}
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
          <RoutesMenu />
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
