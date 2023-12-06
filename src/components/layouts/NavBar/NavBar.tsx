'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NavbarTitleMapping } from '@/constants';

import classes from './NavBar.module.scss';

function Navbar() {
  const pathname = usePathname();
  const getPageName = (path: string, mappings: typeof NavbarTitleMapping) => {
    const pageInformation = mappings.find((mapping: { pathName: string }) => mapping.pathName === path);
    if (pageInformation) {
      return pageInformation?.pageName;
    }
    return 'Event Data Hub';
  };

  return (
    <div className={classes['navbar']}>
      <div className={classes['logo-wrap']}>
        <Link href="/">
          <div className={classes['logo']}></div>
        </Link>
        <div className={classes['logo-title']}>
          <p className={classes['name']}>Assignment</p>
          <p className={classes['sub-name']}>{getPageName(pathname, NavbarTitleMapping)}</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
