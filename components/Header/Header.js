import {useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { Container, NavigationMenu, SkipNavigationLink } from '../../components';
import ThemeSettings from '../../constants/themeSettings';
import HeaderSettings from '../../constants/HeaderSettings';
import styles from './Header.module.scss';
import ThemeToggleBtn from './../ThemeToggleBtn/ThemeToggleBtn';

let cx = classNames.bind(styles);

export default function Header({
  title = 'Headless by WP Engine',
  description,
  menuItems, 
}) {
  const [isNavShown, setIsNavShown] = useState(false);
  const { logo, logoWidth, containerWidth } = ThemeSettings();
  const { headerPresets, headerWidth, innerHeaderWidth } = HeaderSettings();

  const gridContainer = headerWidth === 'contained' ? 'grid-container' : '';
  const innerGridContainer = innerHeaderWidth === 'contained' ? 'grid-container' : '';
  
  const hasInlineToggle = headerPresets === 'nav-float-right' || 'nav-float-left' ? 'has-inline-mobile-toggle' : '';

  return (
    <header id="masthead" className={cx(headerPresets, 'component', gridContainer, hasInlineToggle)}>
      <SkipNavigationLink />
      <div className={cx('inside-header', innerGridContainer)}>
        <div className={cx('site-logo')}>
          <Link href="/">
            <a rel="home">
              {/* {logo ? (
                <img
                  src={logo.sourceUrl}
                  alt="Logo" 
                  className={cx('logo')} 
                  style={{ maxWidth: logoWidth }}
                />
              ) : (
                <div className="site-branding">
                  <p className={`${cx('title', 'main-title')}`} itemProp="headline">{title}</p>
                  {description && 
                    <p className={`${cx('description', 'site-description')}`} itemProp="description">{description}</p>
                  }
                </div>
              )} */}
              <svg xmlns="http://www.w3.org/2000/svg" width="69" height="55" viewBox="0 0 69 55">
                <path d="M0 36.6858V2.35743C0 1.05546 1.06525 0 2.37931 0H7.67597C8.99002 0 10.0553 1.05546 10.0553 2.35743V43.5022H17.2689C18.583 43.5022 19.6482 42.4467 19.6482 41.1447V30.4918C19.6482 29.6748 20.0752 28.916 20.7767 28.4865L29.3568 23.2328V13.6577C29.3568 12.3557 30.422 11.3003 31.7361 11.3003H37.2639C38.578 11.3003 39.6432 12.3557 39.6432 13.6577V20.2827C39.6432 21.5846 40.7085 22.6401 42.0225 22.6401H46.7413C48.0554 22.6401 49.1206 23.6955 49.1206 24.9975V43.5022H56.9122C58.2262 43.5022 59.2915 42.4467 59.2915 41.1447V6.16269C59.2915 5.35195 59.7119 4.5981 60.4047 4.1667L65.3547 1.08452C66.9392 0.0978771 69 1.22627 69 3.0805V37.5628C69 38.381 68.5718 39.1407 67.8688 39.5699L60.4227 44.1155C59.7196 44.5447 59.2915 45.3043 59.2915 46.1225V52.6426C59.2915 53.9445 58.2262 55 56.9122 55H51.4999C50.1859 55 49.1206 53.9445 49.1206 52.6426V43.5022H42.0225C40.7085 43.5022 39.6432 42.4467 39.6432 41.1447V25.5902C39.6432 24.2882 38.578 23.2328 37.2639 23.2328H29.3568V36.7688C29.3568 37.5883 28.9273 38.3489 28.2225 38.7777L21.5916 42.8121C20.8868 43.2409 20.4573 44.0015 20.4573 44.821V52.6426C20.4573 53.9445 19.392 55 18.078 55H12.4346C11.1205 55 10.0553 53.9445 10.0553 52.6426V43.5022L1.24317 38.7571C0.477005 38.3445 0 37.5497 0 36.6858Z" fill="var(--wwx--color--black)"/>
              </svg>
            </a>
          </Link>
        </div>

        <ThemeToggleBtn /> 
        
        <nav className={cx( ['main-navigation', 'mobile-menu-control-wrapper', isNavShown ? 'toggled' : undefined] )} aria-label="Mobile Toggle">
          <div className={cx('menu-bar-items')}></div>		
          <button className={cx('menu-toggle')} onClick={() => setIsNavShown(!isNavShown)}>
            <span className={cx('icon-menu-bars')}>
              <span></span><span></span><span></span><span></span>
            </span>
            <span className="screen-reader-text">Menu</span>		
          </button>
        </nav>

        <nav 
          className={cx( ['site-navigation', 'main-navigation', 'has-menu-bar-items', 'sub-menu-right', isNavShown ? 'toggled' : undefined] )} 
          aria-label={`${menuItems[0]?.menu?.node?.name} menu`} 
          role="navigation" >
          <div className={cx('inside-navigation', 'grid-container')}>
            <div id="primary-menu" className={cx('main-nav')}>
              <NavigationMenu menuItems={menuItems} />
            </div>
          </div>
        </nav>       
      </div>
    </header>
  );
}

