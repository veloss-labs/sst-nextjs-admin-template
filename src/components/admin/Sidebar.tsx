import React from 'react';
import Link from 'next/link';
import cx from 'classnames';
import { Avatar, Layout } from 'antd';
import Profile from './Profile';

interface SidebarProps {
  isShowSidebar: boolean;
  hideSidebar: () => void;
}

function Sidebar({ isShowSidebar, hideSidebar }: SidebarProps) {
  return (
    <Layout.Sider
      className={cx('hidden sidebar', {
        'sm:block': isShowSidebar,
        hidden: !isShowSidebar,
      })}
    >
      <div className="flex flex-col h-full">
        <div className="flex">
          <div className="shrink-0">
            <Avatar shape="square" size={48}>
              P
            </Avatar>
          </div>
          <div className="ml-1 grow">
            <Profile />
          </div>
        </div>
        {/* <div className="overflow-auto grow">
          <MainMenu />
        </div> */}
        <div>
          <div className="flex justify-end">
            {/* <button
              className="flex items-center justify-center w-12 h-12 rounded enable-transition hover:bg-gray-200"
              onClick={hideSidebar}
            >
              <ChevronLeft className="w-3 h-3" />
              <MenuIcon className="w-5 h-5" />
            </button> */}
          </div>
        </div>
      </div>
    </Layout.Sider>
  );
}

export default React.memo(Sidebar);
