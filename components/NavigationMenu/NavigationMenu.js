import classNames from 'classnames/bind';
import { gql } from '@apollo/client';
import { useState, useRef } from 'react';
import Link from 'next/link';
import styles from './NavigationMenu.module.scss';
import stylesFromWP from './NavigationMenuClassesFromWP.module.scss';
import { flatListToHierarchical } from '@faustwp/core';
import { motion } from 'framer-motion';
import { menuSlide, slide } from './anime.js';
import Curve from './Curve/Curve.js';
import Image from 'next/image';
import menuImage from './../../assets/images/menu-image.jpg';
import ThemeSettings from '../../constants/themeSettings';

let cx = classNames.bind(styles);
let cxFromWp = classNames.bind(stylesFromWP);

export default function NavigationMenu({ menuItems, className }) {

  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const subMenuHeight = useRef(null);

  if (!menuItems) {
    return null;
  }

  const { socialMedia } = ThemeSettings();

  // Based on https://www.wpgraphql.com/docs/menus/#hierarchical-data
  const hierarchicalMenuItems = flatListToHierarchical(menuItems);

  function dropdownIcon() {
    return <span class="dropdown-icon"><svg viewBox="0 0 330 512" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M305.913 197.085c0 2.266-1.133 4.815-2.833 6.514L171.087 335.593c-1.7 1.7-4.249 2.832-6.515 2.832s-4.815-1.133-6.515-2.832L26.064 203.599c-1.7-1.7-2.832-4.248-2.832-6.514s1.132-4.816 2.832-6.515l14.162-14.163c1.7-1.699 3.966-2.832 6.515-2.832 2.266 0 4.815 1.133 6.515 2.832l111.316 111.317 111.316-111.317c1.7-1.699 4.249-2.832 6.515-2.832s4.815 1.133 6.515 2.832l14.162 14.163c1.7 1.7 2.833 4.249 2.833 6.515z"></path></svg></span>
  }

  function renderMenu(items) {
    
    return (
      <motion.nav 
        className={cx( [ 'main-navigation' ] )} 
        aria-label={`${menuItems[0]?.menu?.node?.name} menu`} 
        role="navigation" 
        variants={menuSlide} 
        initial="initial" 
        animate="enter" 
        exit="exit" >
        <div className={cx('inside-navigation', 'container')}>

          <div className="row">

            <div className="col-md-6">
              <Image src={menuImage} alt="Menu Image" />
            </div>

            <div className="col-md-6">
              <ul id="primary-menu" className={cx('menu')}>
                {items.map((item) => {
                  const { id, path, label, children, cssClasses } = item;

                  // @TODO - Remove guard clause after ghost menu items are no longer appended to array.
                  if (!item.hasOwnProperty('__typename')) {
                    return null;
                  }

                  function toggleSubMenu(event) {
                    event.preventDefault();
                    setSubMenuOpen(!subMenuOpen);

                    if (subMenuOpen) {
                      subMenuHeight.current.style.height = '0px';
                    } else {
                      subMenuHeight.current.style.height = subMenuHeight.current.scrollHeight + 'px';
                    }
                  }


                  return (
                    <motion.li key={id} className={cxFromWp(cssClasses)} variants={slide} initial="initial" animate="enter" exit="exit">

                        <Link href={path ?? ''}>
                            {label ?? ''} 
                            { children.length ? ( 
                              <div className={cx('dropdown-menu-toggle')} 
                              onClick={ (event) => toggleSubMenu(event) } 
                              > 
                                {subMenuOpen ? '-' : '+'}
                              </div> 
                              ) : null }
                        </Link>

                        { children.length > 0 ? (
                          <ul ref={subMenuHeight} className={cx('sub-menu', subMenuOpen ? 'open' : '')} > 
                            {children.map((child) => {
                              const { id, path, label, children, cssClasses } = child;
                              return (
                                <li key={id} className={ cxFromWp(cssClasses) }>
                                  <Link href={path ?? ''}>
                                    {label ?? ''}
                                  </Link>
                                </li>
                              );
                            })}
                          </ul>
                        ) : null }

                    </motion.li>
                  );
                })}
              </ul>

              
              <button className="btn btn-primary marquee" style={{width: '200px'}}> 
                <div className="marquee__inner">
                  <span className="marquee__line">Start a project +</span>
                  <span className="marquee__line">Start a project +</span>
                </div>
              </button>

              <div className={cx('social-media')}>
                {socialMedia.map((item, index) => {
                  const { socialMediaType, socialMediaUrl } = item;
                    return (
                      <Link key={'social-'+index} href={socialMediaUrl ?? ''}>
                        {socialMediaType ?? ''}
                      </Link>
                    );
                  })}
                </div>
            </div>
          </div>

          

        </div>
        <Curve />
      </motion.nav>
    );
  }

  return (
    <>
      {renderMenu(hierarchicalMenuItems)}
    </>
  );
}

NavigationMenu.fragments = {
  entry: gql`
    fragment NavigationMenuItemFragment on MenuItem {
      id
      path
      label
      parentId
      cssClasses
      menu {
        node {
          name
        }
      }
    }
  `,
};
