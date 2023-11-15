import {useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { Container, NavigationMenu, SkipNavigationLink } from '../../components';
import ThemeSettings from '../../constants/themeSettings';
import HeaderSettings from '../../constants/HeaderSettings';
import styles from './Header.module.scss';

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
              {logo ? (
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
              )}
            </a>
          </Link>
        </div>
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

