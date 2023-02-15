import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import logger from '~/utils/logger';

// components
import { Avatar, Button, Spin, theme, Typography } from 'antd';
import Sidebar from '~/components/admin/Sidebar';
import MobileMenu from '~/components/admin/MobileMenu';
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon';
import Deferred from '~/components/ui/loader/Deferred';

// hooks
import { useMedia } from 'react-use';
import { useLayoutContext } from '~/store/useLayoutStore';
import { useLoading } from '~/libs/hooks/useLoading';
import { useRouter } from 'next/router';

// types
import type { UrlRoutes } from '~/ts/common';

interface AdminLayoutProps {
  children: React.ReactNode;
  pageHeader?: React.ReactNode;
}

function AdminLayout({ children, pageHeader }: AdminLayoutProps) {
  const router = useRouter();

  const { token } = theme.useToken();

  const [isLoading, startTransition] = useLoading();

  const { isShowSidebar, openSidebar, closeSidebar, togglePopupMenu } =
    useLayoutContext((state) => ({
      isShowSidebar: state.isShowSidebar,
      openSidebar: state.openSidebar,
      closeSidebar: state.closeSidebar,
      togglePopupMenu: state.togglePopupMenu,
    }));

  const isMobile = useMedia('(max-width: 640px)', false);

  const onTogglePopupMenu = useCallback(() => {
    togglePopupMenu();
  }, [togglePopupMenu]);

  const onToggleSidebar = useCallback(() => {
    if (isMobile) {
      togglePopupMenu();
      return;
    }
    openSidebar();
  }, [isMobile, openSidebar, togglePopupMenu]);

  const pageTransition = useCallback(
    async (url: UrlRoutes) => {
      try {
        await startTransition(router.push(url));
      } catch (error) {
        logger.error('[onPageTransition]', error);
      }
    },
    [router, startTransition],
  );

  useEffect(() => {
    if (isMobile) {
      closeSidebar();
    } else {
      openSidebar();
    }
  }, [isMobile]);

  return (
    <>
      <div>
        <Sidebar pageTransition={pageTransition} />
        <div className="mobile-header">
          <div className="flex items-center">
            <Avatar
              shape="square"
              size={36}
              style={{ backgroundColor: token.colorPrimary }}
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
        <MobileMenu pageTransition={pageTransition} />
        <div
          className={classNames('sm:h-full sm:overflow-auto', {
            'sm:ml-72': isShowSidebar,
          })}
        >
          {pageHeader}
          <section className="px-5 pb-5 sm:px-10">{children}</section>
          {!isShowSidebar ? (
            <div className="fixed bottom-5 left-5">
              <Button
                htmlType="button"
                type="primary"
                className="!flex items-center justify-center !shadow-none"
                icon={<Bars3Icon className="w-5 h-5" />}
                onClick={onToggleSidebar}
              />
            </div>
          ) : null}
        </div>
      </div>
      {isLoading ? (
        <Deferred>
          <Spin spinning className="page-loading" />
        </Deferred>
      ) : null}
    </>
  );
}

export default AdminLayout;
