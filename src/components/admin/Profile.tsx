import { Dropdown, MenuProps } from 'antd';
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon';
import UserIcon from '@heroicons/react/24/outline/UserIcon';
import LogOutIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon';
import React, { useCallback } from 'react';
import { Typography, Button } from 'antd';

const Profile = () => {
  const items: MenuProps['items'] = [
    {
      label: (
        <Button
          type="text"
          icon={<UserIcon width={16} height={16} />}
          size="small"
          className="min-w-[8rem] link-with-icon sidebar-profile"
        >
          내 프로필
        </Button>
      ),
      key: '0',
    },
    {
      label: (
        <Button
          type="text"
          icon={<LogOutIcon width={16} height={16} />}
          size="small"
          className="link-with-icon sidebar-profile"
        >
          로그아웃
        </Button>
      ),
      key: '1',
    },
  ];

  return (
    <>
      <div className="ml-1">
        <Typography.Text>Administrator</Typography.Text>
      </div>
      <Dropdown menu={{ items }} trigger={['click']}>
        <Button
          size="small"
          htmlType="button"
          className="flex items-center px-2 text-gray-600 rounded hover:bg-gray-200 enable-transition"
        >
          <span className="sm:max-w-[10rem] ellipsis-text">admin</span>
          <ChevronDownIcon className="w-5 h-5" />
        </Button>
      </Dropdown>
    </>
  );
};

export default React.memo(Profile);
