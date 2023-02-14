import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

import { useLayoutContext } from '~/store/useLayoutStore';
import { useMedia } from 'react-use';

import Profile from '~/components/admin/Profile';
import RoutesMenu from '~/components/admin/RoutesMenu';
import { Divider } from 'antd';

const MobileMenu = () => {
  const { isShowPopupMenu, closePopupMenu, openSidebar } = useLayoutContext(
    (state) => state,
  );

  const isMobile = useMedia('(max-width: 640px)', false);

  useEffect(() => {
    if (isShowPopupMenu && !isMobile) {
      closePopupMenu();
      openSidebar();
    }
  }, [isShowPopupMenu, isMobile]);

  return (
    <motion.div
      animate={isShowPopupMenu ? 'open' : 'closed'}
      initial={{ display: 'none' }}
      variants={{
        open: { display: 'block', opacity: 1, y: 0 },
        closed: {
          opacity: 0,
          y: '-10px',
          transitionEnd: { display: 'none' },
        },
      }}
      transition={{ duration: 0.15 }}
      className="mobile-menu fixed bottom-0 left-0 right-0 p-5 z-30 overflow-auto bg-white"
      style={{ top: '3.5rem' }}
    >
      <Profile />
      <Divider orientation="left">
        <span className="text-sm">메뉴</span>
      </Divider>
      <RoutesMenu />
    </motion.div>
  );
};

export default MobileMenu;
