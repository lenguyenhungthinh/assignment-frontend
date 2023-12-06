'use client';

import classNames from 'classnames';
import React from 'react';

import Navbar from '@/components/layouts/NavBar/NavBar';

import classes from './layout.module.scss';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={classNames(classes['layout'], classes['edh'])}>
      <div className={classes['content-wrapper-close']} id="layout-content-wrapper">
        <div id="header-page" className={classNames(classes['header'])}>
          <Navbar />
        </div>
        <div className={classes['main']}>
          <div className="flex flex-col h-full">{children}</div>
        </div>
        <div className={classes['footer']}>
          <div className={classes['footer-item']}>
            <span>Copyright</span>
            <span>Hungln Testing layout</span>
          </div>
          <div className={classes['footer-item']}>Privacy Cookie Statement</div>
          <div>Legal Terms of Use</div>
        </div>
      </div>
    </div>
  );
}
