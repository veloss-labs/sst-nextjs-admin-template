import React, { useCallback } from 'react';

// components
import { Menu } from 'antd';

// hooks
import { useRouteContext } from '~/store/useRouteStore';

import { getUrl } from '~/utils/utils';
import { Routes } from '~/libs/router/routes';

import type { UrlRoutes } from '~/ts/common';

interface RoutesMenuProps {
  pageTransition: (url: UrlRoutes) => Promise<void>;
}

function RoutesMenu({ pageTransition }: RoutesMenuProps) {
  const { menuRoutes, openRoutes, selectedRoute } = useRouteContext(
    (state) => state,
  );

  const onSelect = useCallback(
    (data: Record<string, any>) => {
      const pathname = Routes.getMoveToRoute(data.selectedKeys);
      if (!pathname) return;
      const nextUrl = new URL(pathname, getUrl().origin);
      pageTransition(nextUrl);
    },
    [pageTransition],
  );

  return (
    <Menu
      className="routes-menu"
      mode={'inline'}
      defaultOpenKeys={openRoutes}
      defaultSelectedKeys={selectedRoute}
      items={menuRoutes}
      onSelect={onSelect}
      onDeselect={onSelect}
    />
  );
}

export default RoutesMenu;
