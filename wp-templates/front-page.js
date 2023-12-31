import { useQuery, gql } from '@apollo/client';
import {  useEffect } from 'react';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import Image from 'next/image';
import {
  Header,
  Footer,
  Main,
  Container,
  NavigationMenu,
  Hero,
  SEO,
} from '../components';
import { GlobalFields } from '../components/GlobalFields';
import { HomeHeroBanner } from '../components/HomeHeroBanner';
import { ProjectScroller } from '../components/ProjectScroller';
import HomeServiceSection from '../components/HomeServicesSection/HomeSevicesSection';
import Noise from '../assets/gifs/animated-grain.gif'
import { ReviewCarouselHome } from '../components/ReviewCarousel';

export default function Component() {
  const { data } = useQuery(Component.query, {
    variables: Component.variables(),
  });

  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings;
  const primaryMenu = data?.headerMenuItems?.nodes ?? [];
  const footerMenu = data?.footerMenuItems?.nodes ?? [];

  useEffect( () => {
    (
      async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll();
      }
    )()
  }, [])

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <GlobalFields />
      <Header
        title={siteTitle}
        description={siteDescription}
        menuItems={primaryMenu}
      />

      <Main>
        <div className="animation-background" ></div>
        <div className="grain-foreground" style={{"background-image":`url('${Noise.src}')`}} ></div>
        <HomeHeroBanner />

        <ProjectScroller />

        <HomeServiceSection />
        
        <ReviewCarouselHome />

      </Main>

      <Footer title={siteTitle} menuItems={footerMenu} />
        
    </>
  );
}

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenu.fragments.entry}
  query GetPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;

Component.variables = () => {
  return {
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
  };
};
